import {
  json,
  requireSession,
  updateStudentAppState
} from "../../_lib/auth.js";

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

function normalizeEvent(event) {
  const parsed = event && typeof event === "object" ? event : {};

  return {
    id: typeof parsed.id === "string" ? parsed.id : createEventId(),
    title: typeof parsed.title === "string" ? parsed.title : "",
    description: typeof parsed.description === "string" ? parsed.description : "",
    totalQuantity:
      Number.isFinite(parsed.totalQuantity) && parsed.totalQuantity >= 0
        ? Math.floor(parsed.totalQuantity)
        : 0,
    remainingQuantity:
      Number.isFinite(parsed.remainingQuantity) && parsed.remainingQuantity >= 0
        ? Math.floor(parsed.remainingQuantity)
        : 0,
    unitPrice:
      Number.isFinite(parsed.unitPrice) && parsed.unitPrice > 0
        ? Math.floor(parsed.unitPrice)
        : 0,
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

  if (!title || totalQuantity < 1 || unitPrice < 1) {
    return json(request, env, { error: "invalid_event_payload" }, 400);
  }

  const event = await setEvent(env, {
    id: createEventId(),
    title,
    description,
    totalQuantity,
    remainingQuantity: totalQuantity,
    unitPrice,
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

  if (event.remainingQuantity < quantity) {
    return json(request, env, { error: "insufficient_event_inventory" }, 400);
  }

  const totalPrice = event.unitPrice * quantity;
  const nextEvent = {
    ...event,
    remainingQuantity: event.remainingQuantity - quantity
  };

  await setEvent(env, nextEvent);

  try {
    const state = await updateStudentAppState(env, session.userId, async (currentState) => {
      const currentPoints = (currentState.studentPaid ? 31000 : 0) + currentState.tokenMarket.pointDelta;
      if (currentPoints < totalPrice) {
        throw new Error("not_enough_points");
      }

      return {
        ...currentState,
        tokenMarket: {
          ...currentState.tokenMarket,
          pointDelta: currentState.tokenMarket.pointDelta - totalPrice,
          purchaseHistory: [
            {
              title: `${event.title} 참여권 ${quantity}개 구매`,
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

  return json(request, env, { error: "not_found" }, 404);
}
