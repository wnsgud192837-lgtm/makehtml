import {
  json,
  requireSession,
  updateStudentAppState
} from "../../_lib/auth.js";

const SECONDARY_MARKET_MULTIPLIER = 1.55;

function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}.${month}.${day}`;
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

function createEventId() {
  return `event_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

function toSafeInteger(value, fallback = 0) {
  return Number.isFinite(value) ? Math.max(0, Math.floor(value)) : fallback;
}

function getInitialAmmPointReserve(totalQuantity, unitPrice) {
  return Math.max(
    1,
    Math.round(totalQuantity * unitPrice * SECONDARY_MARKET_MULTIPLIER)
  );
}

function getCurrentMarketPrice(event) {
  if (!Number.isFinite(event.ammTokenReserve) || event.ammTokenReserve <= 0) {
    return 0;
  }

  return Math.ceil(event.ammPointReserve / event.ammTokenReserve);
}

function getDisplayedMarketBasePrice(event) {
  return Math.max(
    1,
    Math.round(Number(event?.unitPrice || 0) * Number(event?.marketMultiplier || SECONDARY_MARKET_MULTIPLIER))
  );
}

function getEventHoldingQuantity(tokenMarket, eventId) {
  if (!Array.isArray(tokenMarket?.eventPurchases)) {
    return 0;
  }

  return Math.max(
    0,
    tokenMarket.eventPurchases.reduce((sum, item) => {
      if (!item || item.eventId !== eventId || !Number.isFinite(item.quantity)) {
        return sum;
      }

      return sum + Math.floor(item.quantity);
    }, 0)
  );
}

function getBuyQuote(event, quantity) {
  const normalizedQuantity = Math.max(1, Math.floor(quantity));
  if (normalizedQuantity !== 1 || event.ammTokenReserve <= 2) {
    return null;
  }

  const cost = Math.ceil(event.ammPointReserve / (event.ammTokenReserve - 2));
  const nextTokenReserve = event.ammTokenReserve - normalizedQuantity;
  const nextPointReserve = event.ammPointReserve + cost;

  if (cost <= 0) {
    return null;
  }

  return {
    cost,
    nextPointReserve,
    nextTokenReserve,
    nextInvariant: nextPointReserve * nextTokenReserve
  };
}

function getSellQuote(event, quantity) {
  const normalizedQuantity = Math.max(1, Math.floor(quantity));
  if (normalizedQuantity !== 1) {
    return null;
  }

  const payout = Math.floor(event.ammPointReserve / (event.ammTokenReserve + 2));
  if (payout <= 0 || payout > event.ammPointReserve) {
    return null;
  }

  const nextTokenReserve = event.ammTokenReserve + normalizedQuantity;
  const nextPointReserve = event.ammPointReserve - payout;

  if (payout <= 0 || nextPointReserve < 1) {
    return null;
  }

  return {
    payout,
    nextPointReserve,
    nextTokenReserve,
    nextInvariant: nextPointReserve * nextTokenReserve
  };
}

function normalizeEvent(event) {
  const parsed = event && typeof event === "object" ? event : {};
  const totalQuantity = toSafeInteger(parsed.totalQuantity);
  const unitPrice =
    Number.isFinite(parsed.unitPrice) && parsed.unitPrice > 0
      ? Math.floor(parsed.unitPrice)
      : 0;
  const fallbackPrimaryRemainingQuantity = toSafeInteger(
    parsed.remainingQuantity,
    totalQuantity
  );
  const primaryRemainingQuantity = toSafeInteger(
    parsed.primaryRemainingQuantity,
    fallbackPrimaryRemainingQuantity
  );
  const ammTokenReserve = toSafeInteger(parsed.ammTokenReserve, totalQuantity);
  const fallbackPointReserve =
    unitPrice > 0 && ammTokenReserve > 0
      ? getInitialAmmPointReserve(ammTokenReserve, unitPrice)
      : 0;
  const ammPointReserve = toSafeInteger(parsed.ammPointReserve, fallbackPointReserve);
  const maxPurchasePerStudent = toSafeInteger(parsed.maxPurchasePerStudent, totalQuantity);

  return {
    id: typeof parsed.id === "string" ? parsed.id : createEventId(),
    title: typeof parsed.title === "string" ? parsed.title : "",
    description: typeof parsed.description === "string" ? parsed.description : "",
    totalQuantity,
    maxPurchasePerStudent,
    primaryRemainingQuantity,
    remainingQuantity: primaryRemainingQuantity,
    unitPrice,
    marketMultiplier:
      Number.isFinite(parsed.marketMultiplier) && parsed.marketMultiplier > 0
        ? parsed.marketMultiplier
        : SECONDARY_MARKET_MULTIPLIER,
    ammPointReserve,
    ammTokenReserve,
    ammInvariant:
      Number.isFinite(parsed.ammInvariant) && parsed.ammInvariant > 0
        ? Math.floor(parsed.ammInvariant)
        : ammPointReserve * ammTokenReserve,
    currentMarketPrice: getCurrentMarketPrice({
      ammPointReserve,
      ammTokenReserve
    }),
    createdAt: typeof parsed.createdAt === "string" ? parsed.createdAt : new Date().toISOString()
  };
}

async function getEventIds(env) {
  return (await upstash(env, "/smembers/events:catalog")) || [];
}

async function getEvent(env, eventId) {
  const raw = await upstash(env, `/get/events:item:${eventId}`);
  return raw ? normalizeEvent(JSON.parse(raw)) : null;
}

async function setEvent(env, event) {
  const normalized = normalizeEvent(event);
  await upstash(env, `/set/events:item:${normalized.id}`, normalized);
  await upstash(env, `/sadd/events:catalog/${normalized.id}`);
  return normalized;
}

async function deleteEvent(env, eventId) {
  await upstash(env, `/del/events:item:${eventId}`);
  await upstash(env, `/srem/events:catalog/${eventId}`);
}

async function listEvents(env) {
  const eventIds = await getEventIds(env);
  const events = await Promise.all(eventIds.map((eventId) => getEvent(env, eventId)));

  return events
    .filter(Boolean)
    .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
}

async function listEventsResponse(request, env) {
  const events = await listEvents(env);
  return json(request, env, { events }, 200);
}

async function createEventResponse(request, env, session) {
  if (session.role !== "admin") {
    return json(request, env, { error: "forbidden" }, 403);
  }

  const body = await request.json();
  const title = String(body?.title || "").trim();
  const description = String(body?.description || "").trim();
  const totalQuantity = Math.max(0, Math.floor(Number(body?.totalQuantity || 0)));
  const unitPrice = Math.max(0, Math.floor(Number(body?.unitPrice || 0)));
  const maxPurchasePerStudent = Math.max(
    1,
    Math.floor(Number(body?.maxPurchasePerStudent || totalQuantity || 1))
  );

  if (!title || totalQuantity < 1 || unitPrice < 1 || maxPurchasePerStudent < 1) {
    return json(request, env, { error: "invalid_event_payload" }, 400);
  }

  const event = await setEvent(env, {
    id: createEventId(),
    title,
    description,
    totalQuantity,
    maxPurchasePerStudent,
    primaryRemainingQuantity: totalQuantity,
    unitPrice,
    marketMultiplier: SECONDARY_MARKET_MULTIPLIER,
    ammPointReserve: getInitialAmmPointReserve(totalQuantity, unitPrice),
    ammTokenReserve: totalQuantity,
    ammInvariant: getInitialAmmPointReserve(totalQuantity, unitPrice) * totalQuantity,
    createdAt: new Date().toISOString()
  });

  return json(request, env, { ok: true, event }, 201);
}

async function deleteEventResponse(request, env, session, eventId) {
  if (session.role !== "admin") {
    return json(request, env, { error: "forbidden" }, 403);
  }

  const event = await getEvent(env, eventId);
  if (!event) {
    return json(request, env, { error: "event_not_found" }, 404);
  }

  await deleteEvent(env, eventId);
  return json(request, env, { ok: true }, 200);
}

async function purchaseEventResponse(request, env, session) {
  if (session.role !== "student") {
    return json(request, env, { error: "forbidden" }, 403);
  }

  const body = await request.json();
  const eventId = String(body?.eventId || "").trim();
  const quantity = Math.max(1, Math.floor(Number(body?.quantity || 1)));

  const event = await getEvent(env, eventId);
  if (!event) {
    return json(request, env, { error: "event_not_found" }, 404);
  }

  if (event.primaryRemainingQuantity < quantity) {
    return json(request, env, { error: "insufficient_event_inventory" }, 400);
  }

  const totalPrice = event.unitPrice * quantity;
  const nextEvent = {
    ...event,
    primaryRemainingQuantity: event.primaryRemainingQuantity - quantity,
    remainingQuantity: event.primaryRemainingQuantity - quantity
  };

  await setEvent(env, nextEvent);

  try {
    const state = await updateStudentAppState(env, session.userId, async (currentState) => {
      if (!currentState.studentPaid) {
        throw new Error("paid_membership_required");
      }

      const currentHoldingQuantity = getEventHoldingQuantity(currentState.tokenMarket, event.id);
      if (currentHoldingQuantity + quantity > event.maxPurchasePerStudent) {
        throw new Error("event_purchase_limit_exceeded");
      }

      const currentPoints = (currentState.studentPaid ? 31000 : 0) + currentState.tokenMarket.pointDelta;
      if (currentPoints < totalPrice) {
        throw new Error("not_enough_points");
      }

      return {
        ...currentState,
        governanceTokens: currentState.governanceTokens + quantity,
        tokenMarket: {
          ...currentState.tokenMarket,
          pointDelta: currentState.tokenMarket.pointDelta - totalPrice,
          purchaseHistory: [
            {
              title: `${event.title} 토큰 ${quantity}개 구매`,
              date: formatDate(new Date()),
              amount: -totalPrice,
              type: "use"
            },
            ...currentState.tokenMarket.purchaseHistory
          ],
          eventPurchases: [
            {
              eventId: event.id,
              title: event.title,
              quantity,
              unitPrice: event.unitPrice,
              totalPrice,
              purchasedAt: new Date().toISOString()
            },
            ...(Array.isArray(currentState.tokenMarket.eventPurchases)
              ? currentState.tokenMarket.eventPurchases
              : [])
          ]
        }
      };
    });

    return json(
      request,
      env,
      {
        ok: true,
        event: nextEvent,
        state
      },
      200
    );
  } catch (error) {
    await setEvent(env, event);
    return json(request, env, { error: error.message || "purchase_failed" }, 400);
  }
}

async function sellEventResponse(request, env, session) {
  if (session.role !== "student") {
    return json(request, env, { error: "forbidden" }, 403);
  }

  const body = await request.json();
  const eventId = String(body?.eventId || "").trim();
  const quantity = 1;

  const event = await getEvent(env, eventId);
  if (!event) {
    return json(request, env, { error: "event_not_found" }, 404);
  }

  const stateUpdate = await updateStudentAppState(env, session.userId, async (currentState) => {
    const holdingQuantity = getEventHoldingQuantity(currentState.tokenMarket, event.id);
    if (holdingQuantity < quantity) {
      throw new Error("insufficient_event_holdings");
    }

    const quote = getSellQuote(event, quantity);
    if (!quote) {
      throw new Error("cannot_sell_event_token");
    }

    const nextEvent = {
      ...event,
      ammPointReserve: quote.nextPointReserve,
      ammTokenReserve: quote.nextTokenReserve,
      ammInvariant: quote.nextInvariant,
      currentMarketPrice: getCurrentMarketPrice({
        ammPointReserve: quote.nextPointReserve,
        ammTokenReserve: quote.nextTokenReserve
      })
    };

    await setEvent(env, nextEvent);

    return {
      ...currentState,
      tokenMarket: {
        ...currentState.tokenMarket,
        pointDelta: currentState.tokenMarket.pointDelta + quote.payout,
        purchaseHistory: [
          {
            title: `${event.title} ${quantity}토큰 매도`,
            date: formatDate(new Date()),
            amount: quote.payout,
            type: "earn"
          },
          ...currentState.tokenMarket.purchaseHistory
        ],
        eventPurchases: [
          {
            eventId: event.id,
            title: event.title,
            quantity: -quantity,
            unitPrice: Math.floor(quote.payout / quantity),
            totalPrice: -quote.payout,
            purchasedAt: new Date().toISOString()
          },
          ...(Array.isArray(currentState.tokenMarket.eventPurchases)
            ? currentState.tokenMarket.eventPurchases
            : [])
        ]
      }
    };
  });

  const nextEvent = await getEvent(env, eventId);
  return json(
    request,
    env,
    {
      ok: true,
      event: nextEvent,
      state: stateUpdate
    },
    200
  );
}

async function marketPurchaseEventResponse(request, env, session) {
  if (session.role !== "student") {
    return json(request, env, { error: "forbidden" }, 403);
  }

  const body = await request.json();
  const eventId = String(body?.eventId || "").trim();
  const quantity = 1;

  const event = await getEvent(env, eventId);
  if (!event) {
    return json(request, env, { error: "event_not_found" }, 404);
  }

  const quote = getBuyQuote(event, quantity);
  if (!quote) {
    return json(request, env, { error: "insufficient_event_inventory" }, 400);
  }

  const nextEvent = {
    ...event,
    ammPointReserve: quote.nextPointReserve,
    ammTokenReserve: quote.nextTokenReserve,
    ammInvariant: quote.nextInvariant,
    currentMarketPrice: getCurrentMarketPrice({
      ammPointReserve: quote.nextPointReserve,
      ammTokenReserve: quote.nextTokenReserve
    })
  };

  await setEvent(env, nextEvent);

  try {
    const state = await updateStudentAppState(env, session.userId, async (currentState) => {
      const currentHoldingQuantity = getEventHoldingQuantity(currentState.tokenMarket, event.id);
      if (currentHoldingQuantity + quantity > event.maxPurchasePerStudent) {
        throw new Error("event_purchase_limit_exceeded");
      }

      const currentPoints = (currentState.studentPaid ? 31000 : 0) + currentState.tokenMarket.pointDelta;
      if (currentPoints < quote.cost) {
        throw new Error("not_enough_points");
      }

      return {
        ...currentState,
        governanceTokens: currentState.governanceTokens + quantity,
        tokenMarket: {
          ...currentState.tokenMarket,
          pointDelta: currentState.tokenMarket.pointDelta - quote.cost,
          purchaseHistory: [
            {
              title: `${event.title} 토큰 ${quantity}개 매수`,
              date: formatDate(new Date()),
              amount: -quote.cost,
              type: "use"
            },
            ...currentState.tokenMarket.purchaseHistory
          ],
          eventPurchases: [
            {
              eventId: event.id,
              title: event.title,
              quantity,
              unitPrice: Math.ceil(quote.cost / quantity),
              totalPrice: quote.cost,
              purchasedAt: new Date().toISOString()
            },
            ...(Array.isArray(currentState.tokenMarket.eventPurchases)
              ? currentState.tokenMarket.eventPurchases
              : [])
          ]
        }
      };
    });

    return json(request, env, { ok: true, event: nextEvent, state }, 200);
  } catch (error) {
    await setEvent(env, event);
    return json(request, env, { error: error.message || "market_purchase_failed" }, 400);
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

  if (request.method === "GET" && route.length === 0) {
    return listEventsResponse(request, env);
  }

  if (request.method === "POST" && route.length === 0) {
    return createEventResponse(request, env, session);
  }

  if (request.method === "DELETE" && route.length === 1) {
    return deleteEventResponse(request, env, session, decodeURIComponent(route[0]));
  }

  if (request.method === "POST" && route.length === 1 && route[0] === "purchase") {
    return purchaseEventResponse(request, env, session);
  }

  if (request.method === "POST" && route.length === 1 && route[0] === "sell") {
    return sellEventResponse(request, env, session);
  }

  if (request.method === "POST" && route.length === 2 && route[0] === "market" && route[1] === "purchase") {
    return marketPurchaseEventResponse(request, env, session);
  }

  if (request.method === "POST" && route.length === 2 && route[0] === "market" && route[1] === "sell") {
    return sellEventResponse(request, env, session);
  }

  return json(request, env, { error: "not_found" }, 404);
}
