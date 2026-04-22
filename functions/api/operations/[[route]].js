import { json, requireSession } from "../../_lib/auth.js";

const OPERATIONS_STORAGE_KEY = "operations:summary";
const DEFAULT_OPERATIONS_TITLE = "25-1 예산 집행 현황";
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

function normalizeOperationsTitle(title) {
  return typeof title === "string" && title.trim() ? title.trim() : DEFAULT_OPERATIONS_TITLE;
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

function normalizeOperationsPayload(raw) {
  if (Array.isArray(raw)) {
    const legacyTitle = raw.find((item) => typeof item?.title === "string" && item.title.trim())?.title;
    return {
      title: normalizeOperationsTitle(legacyTitle),
      items: normalizeOperationsItems(raw)
    };
  }

  return {
    title: normalizeOperationsTitle(raw?.title),
    items: normalizeOperationsItems(raw?.items)
  };
}

async function getOperationsSummary(env) {
  const raw = await upstash(env, `/get/${OPERATIONS_STORAGE_KEY}`);
  if (!raw) {
    return {
      title: DEFAULT_OPERATIONS_TITLE,
      items: cloneDefaultOperationsItems()
    };
  }

  try {
    return normalizeOperationsPayload(JSON.parse(raw));
  } catch {
    return {
      title: DEFAULT_OPERATIONS_TITLE,
      items: cloneDefaultOperationsItems()
    };
  }
}

async function setOperationsSummary(env, payload) {
  const normalized = normalizeOperationsPayload(payload);
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
      const summary = await getOperationsSummary(env);
      return json(request, env, summary, 200);
    }

    if (request.method === "POST") {
      if (session.role !== "admin") {
        return json(request, env, { error: "forbidden" }, 403);
      }

      const body = await request.json();
      const summary = await setOperationsSummary(env, body);
      return json(request, env, { ok: true, ...summary }, 200);
    }

    return json(request, env, { error: "not_found" }, 404);
  } catch (error) {
    return json(request, env, { error: error.message || "internal_error" }, 500);
  }
}
