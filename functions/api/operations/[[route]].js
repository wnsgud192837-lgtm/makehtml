import { json, requireSession } from "../../_lib/auth.js";

const OPERATIONS_STORAGE_KEY = "operations:summary";
const DEFAULT_OPERATIONS_ITEMS = [
  { label: "비조천 행사비", value: 72, tone: "magenta" },
  { label: "교복제 행사비", value: 50, tone: "amber" },
  { label: "운영비", value: 31, tone: "gray" }
];

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

function cloneDefaultOperationsItems() {
  return DEFAULT_OPERATIONS_ITEMS.map((item) => ({ ...item }));
}

function normalizeOperationsItems(items) {
  if (!Array.isArray(items) || items.length === 0) {
    return cloneDefaultOperationsItems();
  }

  return DEFAULT_OPERATIONS_ITEMS.map((fallback, index) => {
    const item = items[index];
    const label =
      item && typeof item.label === "string" && item.label.trim()
        ? item.label.trim()
        : fallback.label;
    const parsedValue = Number(item?.value);
    const value = Number.isFinite(parsedValue)
      ? Math.max(0, Math.min(100, Math.round(parsedValue)))
      : fallback.value;

    return {
      label,
      value,
      tone: fallback.tone
    };
  });
}

async function getOperationsItems(env) {
  const raw = await upstash(env, `/get/${OPERATIONS_STORAGE_KEY}`);
  if (!raw) {
    return cloneDefaultOperationsItems();
  }

  try {
    return normalizeOperationsItems(JSON.parse(raw));
  } catch {
    return cloneDefaultOperationsItems();
  }
}

async function setOperationsItems(env, items) {
  const normalized = normalizeOperationsItems(items);
  await upstash(env, `/set/${OPERATIONS_STORAGE_KEY}`, normalized);
  return normalized;
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

    if (route.length > 0) {
      return json(request, env, { error: "not_found" }, 404);
    }

    if (request.method === "GET") {
      const items = await getOperationsItems(env);
      return json(request, env, { items }, 200);
    }

    if (request.method === "POST") {
      if (session.role !== "admin") {
        return json(request, env, { error: "forbidden" }, 403);
      }

      const body = await request.json();
      const items = await setOperationsItems(env, body?.items);
      return json(request, env, { ok: true, items }, 200);
    }

    return json(request, env, { error: "not_found" }, 404);
  } catch (error) {
    return json(request, env, { error: error.message || "internal_error" }, 500);
  }
}
