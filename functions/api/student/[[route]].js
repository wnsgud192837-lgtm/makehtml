import {
  addStudentAuditLog,
  json,
  listStudentAuditLogs,
  listStudentUserIds,
  getStudentAppState,
  requireSession,
  updateStudentAppState
} from "../../_lib/auth.js";

const BASE_POINTS = 31000;
const INITIAL_TOKEN_MARKET_STATE = {
  pointReserve: 24000,
  eventTokenReserve: 12,
  userEventTokens: 0,
  pointDelta: 0,
  purchaseHistory: []
};

function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}.${month}.${day}`;
}

function normalizeUserId(userId) {
  return String(userId || "").trim().toLowerCase();
}

async function upstash(env, command, body) {
  if (!env.UPSTASH_REDIS_REST_URL || !env.UPSTASH_REDIS_REST_TOKEN) {
    throw new Error("missing_upstash_env");
  }

  const response = await fetch(`${env.UPSTASH_REDIS_REST_URL}${command}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.UPSTASH_REDIS_REST_TOKEN}`,
      "content-type": "application/json"
    },
    body: body ? JSON.stringify(body) : undefined
  });

  const data = await response.json();
  if (!response.ok || data.error) {
    throw new Error(data.error || `upstash_${response.status}`);
  }

  return data.result;
}

function getStudentPoints(state) {
  return (state.studentPaid ? BASE_POINTS : 0) + state.tokenMarket.pointDelta;
}

function createStudentResponse(state) {
  return {
    state,
    derived: {
      points: getStudentPoints(state)
    }
  };
}

async function getStudentUserRecord(env, userId) {
  const raw = await upstash(env, `/get/auth:user:${normalizeUserId(userId)}`);
  return raw ? JSON.parse(raw) : null;
}

async function getJson(env, key, fallback) {
  const raw = await upstash(env, `/get/${key}`);
  return raw ? JSON.parse(raw) : fallback;
}

async function setJson(env, key, value) {
  return upstash(env, `/set/${key}`, value);
}

async function deleteKey(env, key) {
  return upstash(env, `/del/${key}`);
}

function getTokenBuyQuote(tokenMarket, quantity) {
  const normalizedQuantity = Math.max(1, Math.floor(quantity));
  const { pointReserve, eventTokenReserve } = tokenMarket;

  if (normalizedQuantity >= eventTokenReserve) {
    return null;
  }

  const invariant = pointReserve * eventTokenReserve;
  const nextEventTokenReserve = eventTokenReserve - normalizedQuantity;
  const exactNextPointReserve = invariant / nextEventTokenReserve;
  const cost = Math.ceil(exactNextPointReserve - pointReserve);

  return {
    cost,
    nextPointReserve: pointReserve + cost,
    nextEventTokenReserve
  };
}

function getTokenSellQuote(tokenMarket, quantity) {
  const normalizedQuantity = Math.max(1, Math.floor(quantity));
  const { pointReserve, eventTokenReserve, userEventTokens } = tokenMarket;

  if (normalizedQuantity > userEventTokens) {
    return null;
  }

  const invariant = pointReserve * eventTokenReserve;
  const nextEventTokenReserve = eventTokenReserve + normalizedQuantity;
  const exactNextPointReserve = invariant / nextEventTokenReserve;
  const payout = Math.floor(pointReserve - exactNextPointReserve);

  if (payout <= 0) {
    return null;
  }

  return {
    payout,
    nextPointReserve: pointReserve - payout,
    nextEventTokenReserve
  };
}

async function getStudentStateResponse(request, env, session) {
  if (session.role !== "student") {
    return json(request, env, { error: "forbidden" }, 403);
  }

  const state = await getStudentAppState(env, session.userId);

  return json(request, env, createStudentResponse(state), 200);
}

async function getAdminStatsResponse(request, env, session) {
  if (session.role !== "admin") {
    return json(request, env, { error: "forbidden" }, 403);
  }

  const userIds = await listStudentUserIds(env);
  const states = await Promise.all(userIds.map((userId) => getStudentAppState(env, userId)));

  const totalPaidStudents = states.filter((state) => state.studentPaid).length;
  const totalGrantedPoints = states.reduce(
    (sum, state) => sum + (state.studentPaid ? BASE_POINTS : 0),
    0
  );

  return json(
    request,
    env,
    {
      stats: {
        totalStudents: userIds.length,
        totalPaidStudents,
        totalGrantedPoints
      }
    },
    200
  );
}

async function getAdminLogsResponse(request, env, session) {
  if (session.role !== "admin") {
    return json(request, env, { error: "forbidden" }, 403);
  }

  const logs = await listStudentAuditLogs(env);
  return json(request, env, { logs }, 200);
}

async function markPaid(request, env, session) {
  if (session.role !== "student") {
    return json(request, env, { error: "forbidden" }, 403);
  }

  const state = await updateStudentAppState(env, session.userId, async (currentState) => ({
    ...currentState,
    studentPaid: true,
    paidAt: currentState.paidAt || formatDate(new Date())
  }));

  return json(request, env, createStudentResponse(state), 200);
}

async function earnGovernanceToken(request, env, session) {
  if (session.role !== "student") {
    return json(request, env, { error: "forbidden" }, 403);
  }

  const state = await updateStudentAppState(env, session.userId, async (currentState) => ({
    ...currentState,
    governanceTokens: currentState.governanceTokens + 1
  }));

  return json(request, env, createStudentResponse(state), 200);
}

async function updateMarketState(request, env, session) {
  if (session.role !== "student") {
    return json(request, env, { error: "forbidden" }, 403);
  }

  const body = await request.json();
  const action = String(body?.action || "").trim();
  const quantity = Math.max(1, Math.floor(Number(body?.quantity || 1)));

  try {
    const state = await updateStudentAppState(env, session.userId, async (currentState) => {
      if (action === "reset") {
        return {
          ...currentState,
          tokenMarket: {
            pointReserve: INITIAL_TOKEN_MARKET_STATE.pointReserve,
            eventTokenReserve: INITIAL_TOKEN_MARKET_STATE.eventTokenReserve,
            userEventTokens: INITIAL_TOKEN_MARKET_STATE.userEventTokens,
            pointDelta: INITIAL_TOKEN_MARKET_STATE.pointDelta,
            purchaseHistory: []
          }
        };
      }

      if (action === "buy") {
        const quote = getTokenBuyQuote(currentState.tokenMarket, quantity);
        if (!quote) {
          throw new Error("insufficient_event_token_supply");
        }
        if (getStudentPoints(currentState) < quote.cost) {
          throw new Error("not_enough_points");
        }

        return {
          ...currentState,
          tokenMarket: {
            ...currentState.tokenMarket,
            pointReserve: quote.nextPointReserve,
            eventTokenReserve: quote.nextEventTokenReserve,
            userEventTokens: currentState.tokenMarket.userEventTokens + quantity,
            pointDelta: currentState.tokenMarket.pointDelta - quote.cost,
            purchaseHistory: [
              {
                title: `해맞이 한마당 토큰 ${quantity}개 구매`,
                date: formatDate(new Date()),
                amount: -quote.cost,
                type: "use"
              },
              ...currentState.tokenMarket.purchaseHistory
            ]
          }
        };
      }

      if (action === "sell") {
        const quote = getTokenSellQuote(currentState.tokenMarket, quantity);
        if (!quote) {
          throw new Error("cannot_sell_event_token");
        }

        return {
          ...currentState,
          tokenMarket: {
            ...currentState.tokenMarket,
            pointReserve: quote.nextPointReserve,
            eventTokenReserve: quote.nextEventTokenReserve,
            userEventTokens: currentState.tokenMarket.userEventTokens - quantity,
            pointDelta: currentState.tokenMarket.pointDelta + quote.payout,
            purchaseHistory: [
              {
                title: `해맞이 한마당 토큰 ${quantity}개 판매`,
                date: formatDate(new Date()),
                amount: quote.payout,
                type: "earn"
              },
              ...currentState.tokenMarket.purchaseHistory
            ]
          }
        };
      }

      throw new Error("invalid_market_action");
    });

    return json(request, env, createStudentResponse(state), 200);
  } catch (error) {
    return json(request, env, { error: error.message || "market_update_failed" }, 400);
  }
}

async function deleteStudentAccount(request, env, session) {
  if (session.role !== "admin") {
    return json(request, env, { error: "forbidden" }, 403);
  }

  const body = await request.json();
  const userId = normalizeUserId(body?.userId);

  if (!userId || userId === "admin") {
    return json(request, env, { error: "invalid_user_id" }, 400);
  }

  const userRecord = await getStudentUserRecord(env, userId);
  if (!userRecord) {
    return json(request, env, { error: "user_not_found" }, 404);
  }

  const state = await getStudentAppState(env, userId);
  const eventPurchases = Array.isArray(state.tokenMarket?.eventPurchases)
    ? state.tokenMarket.eventPurchases
    : [];

  const aggregatedPurchases = new Map();
  eventPurchases.forEach((purchase) => {
    const current = aggregatedPurchases.get(purchase.eventId) || 0;
    aggregatedPurchases.set(purchase.eventId, current + purchase.quantity);
  });

  for (const [eventId, quantity] of aggregatedPurchases.entries()) {
    const rawEvent = await upstash(env, `/get/events:item:${eventId}`);
    if (!rawEvent) continue;

    const event = JSON.parse(rawEvent);
    const nextEvent = {
      ...event,
      remainingQuantity: Math.min(
        Number(event.totalQuantity) || 0,
        (Number(event.remainingQuantity) || 0) + quantity
      )
    };
    await upstash(env, `/set/events:item:${eventId}`, nextEvent);
  }

  const userVotes = await getJson(env, `governance:user:student:${userId}:votes`, {});
  for (const [pollId, optionIndex] of Object.entries(userVotes)) {
    const results = await getJson(env, `governance:results:${pollId}`, []);
    if (Array.isArray(results) && Number.isInteger(optionIndex) && optionIndex >= 0 && optionIndex < results.length) {
      results[optionIndex] = Math.max(0, (results[optionIndex] || 0) - 1);
      await setJson(env, `governance:results:${pollId}`, results);
    }
    await upstash(env, `/srem/governance:poll:${pollId}:voters/student:${userId}`);
  }

  await deleteKey(env, `governance:user:student:${userId}:votes`);
  await deleteKey(env, `auth:user:${userId}`);
  await deleteKey(env, `auth:state:${userId}`);
  await upstash(env, `/srem/auth:students/${userId}`);
  await addStudentAuditLog(env, {
    action: "delete",
    userId,
    actorUserId: session.userId,
    actorRole: session.role
  });

  return json(request, env, { ok: true, userId }, 200);
}

export async function onRequest(context) {
  const { request, env, params } = context;
  const route = Array.isArray(params.route)
    ? params.route
    : typeof params.route === "string" && params.route.length > 0
      ? [params.route]
      : [];

  if (request.method === "OPTIONS") {
    return json(request, env, { ok: true }, 200);
  }

  const session = await requireSession(request, env);
  if (!session) {
    return json(request, env, { error: "unauthorized" }, 401);
  }

  if (request.method === "GET" && route.length === 1 && route[0] === "state") {
    return getStudentStateResponse(request, env, session);
  }

  if (request.method === "GET" && route.length === 1 && route[0] === "stats") {
    return getAdminStatsResponse(request, env, session);
  }

  if (request.method === "GET" && route.length === 1 && route[0] === "logs") {
    return getAdminLogsResponse(request, env, session);
  }

  if (request.method === "POST" && route.length === 1 && route[0] === "pay") {
    return markPaid(request, env, session);
  }

  if (request.method === "POST" && route.length === 2 && route[0] === "governance" && route[1] === "earn") {
    return earnGovernanceToken(request, env, session);
  }

  if (request.method === "POST" && route.length === 1 && route[0] === "market") {
    return updateMarketState(request, env, session);
  }

  if (request.method === "DELETE" && route.length === 1 && route[0] === "account") {
    return deleteStudentAccount(request, env, session);
  }

  return json(request, env, { error: "not_found" }, 404);
}
