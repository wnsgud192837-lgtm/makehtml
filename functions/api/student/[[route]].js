import {
  json,
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

  if (request.method === "POST" && route.length === 1 && route[0] === "pay") {
    return markPaid(request, env, session);
  }

  if (request.method === "POST" && route.length === 2 && route[0] === "governance" && route[1] === "earn") {
    return earnGovernanceToken(request, env, session);
  }

  if (request.method === "POST" && route.length === 1 && route[0] === "market") {
    return updateMarketState(request, env, session);
  }

  return json(request, env, { error: "not_found" }, 404);
}
