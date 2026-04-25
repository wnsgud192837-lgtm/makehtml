import { json, requireSession } from "../../_lib/auth.js";

const CALENDAR_CATALOG_KEY = "calendar:items";

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

function createCalendarItemId() {
  return `calendar_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

function isValidDateKey(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;

  const [year, month, day] = value.split("-").map(Number);
  const date = new Date(year, month - 1, day);

  return (
    date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day
  );
}

function normalizeCalendarItem(item) {
  const parsed = item && typeof item === "object" ? item : {};
  const scope = parsed.scope === "private" ? "private" : "global";

  return {
    id: typeof parsed.id === "string" ? parsed.id : createCalendarItemId(),
    date: typeof parsed.date === "string" && isValidDateKey(parsed.date) ? parsed.date : "",
    title: typeof parsed.title === "string" ? parsed.title : "",
    description: typeof parsed.description === "string" ? parsed.description : "",
    scope,
    ownerUserId: typeof parsed.ownerUserId === "string" ? parsed.ownerUserId : "",
    createdAt: typeof parsed.createdAt === "string" ? parsed.createdAt : new Date().toISOString()
  };
}

function getPrivateCalendarCatalogKey(userId) {
  return `calendar:user:${userId}:items`;
}

function getCalendarItemCatalogKey(item) {
  return item?.scope === "private"
    ? getPrivateCalendarCatalogKey(item.ownerUserId)
    : CALENDAR_CATALOG_KEY;
}

async function getCalendarItemIds(env, catalogKey) {
  return (await upstash(env, `/smembers/${catalogKey}`)) || [];
}

async function getCalendarItem(env, itemId) {
  const raw = await upstash(env, `/get/calendar:item:${itemId}`);
  return raw ? normalizeCalendarItem(JSON.parse(raw)) : null;
}

async function setCalendarItem(env, item) {
  const normalized = normalizeCalendarItem(item);
  await upstash(env, `/set/calendar:item:${normalized.id}`, normalized);
  await upstash(env, `/sadd/${getCalendarItemCatalogKey(normalized)}/${normalized.id}`);
  return normalized;
}

async function deleteCalendarItem(env, itemId, item) {
  await upstash(env, `/del/calendar:item:${itemId}`);
  await upstash(env, `/srem/${getCalendarItemCatalogKey(item)}/${itemId}`);
}

async function listCatalogItems(env, catalogKey) {
  const itemIds = await getCalendarItemIds(env, catalogKey);
  const items = await Promise.all(itemIds.map((itemId) => getCalendarItem(env, itemId)));

  return items.filter((item) => item && item.date && item.title);
}

async function listCalendarItems(env, session) {
  const globalItems = await listCatalogItems(env, CALENDAR_CATALOG_KEY);
  const privateItems =
    session.role === "student"
      ? await listCatalogItems(env, getPrivateCalendarCatalogKey(session.userId))
      : [];

  return [...globalItems, ...privateItems]
    .sort((a, b) => {
      if (a.date !== b.date) return a.date < b.date ? -1 : 1;
      return a.createdAt < b.createdAt ? -1 : 1;
    });
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

  try {
    const session = await requireSession(request, env);
    if (!session) {
      return json(request, env, { error: "unauthorized" }, 401);
    }

    if (request.method === "GET" && route.length === 0) {
      const items = await listCalendarItems(env, session);
      return json(request, env, { items }, 200);
    }

    if (request.method === "POST" && route.length === 0) {
      const body = await request.json();
      const date = String(body?.date || "").trim();
      const title = String(body?.title || "").trim();
      const description = String(body?.description || "").trim();

      if (!isValidDateKey(date) || !title) {
        return json(request, env, { error: "invalid_calendar_payload" }, 400);
      }

      const item = await setCalendarItem(env, {
        id: createCalendarItemId(),
        date,
        title,
        description,
        scope: session.role === "admin" ? "global" : "private",
        ownerUserId: session.role === "student" ? session.userId : "",
        createdAt: new Date().toISOString()
      });

      return json(request, env, { ok: true, item }, 201);
    }

    if (request.method === "DELETE" && route.length === 1) {
      const item = await getCalendarItem(env, route[0]);
      if (!item) {
        return json(request, env, { error: "calendar_item_not_found" }, 404);
      }

      const canDelete =
        session.role === "admin"
          ? item.scope === "global"
          : item.scope === "private" && item.ownerUserId === session.userId;

      if (!canDelete) {
        return json(request, env, { error: "forbidden" }, 403);
      }

      await deleteCalendarItem(env, route[0], item);
      return json(request, env, { ok: true }, 200);
    }

    return json(request, env, { error: "not_found" }, 404);
  } catch (error) {
    return json(request, env, { error: error.message || "internal_error" }, 500);
  }
}
