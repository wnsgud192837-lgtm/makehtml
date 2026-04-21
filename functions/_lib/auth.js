const encoder = new TextEncoder();
const SESSION_COOKIE_NAME = "postech_session";
const SESSION_MAX_AGE = 60 * 60 * 24 * 7;
const ADMIN_USER_ID = "admin";
const ADMIN_PASSWORD = "admin";

function toBase64Url(bytes) {
  let binary = "";

  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });

  return btoa(binary).replaceAll("+", "-").replaceAll("/", "_").replaceAll("=", "");
}

function fromBase64Url(value) {
  const normalized = value.replaceAll("-", "+").replaceAll("_", "/");
  const padded = normalized + "=".repeat((4 - (normalized.length % 4)) % 4);
  const binary = atob(padded);
  const bytes = new Uint8Array(binary.length);

  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index);
  }

  return bytes;
}

function decodeText(value) {
  return new TextDecoder().decode(fromBase64Url(value));
}

async function importSigningKey(secret) {
  return crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"]
  );
}

async function signValue(value, secret) {
  const key = await importSigningKey(secret);
  const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(value));

  return toBase64Url(new Uint8Array(signature));
}

function parseCookies(request) {
  const raw = request.headers.get("cookie") || "";

  return Object.fromEntries(
    raw
      .split(";")
      .map((item) => item.trim())
      .filter(Boolean)
      .map((item) => {
        const separatorIndex = item.indexOf("=");
        const key = separatorIndex >= 0 ? item.slice(0, separatorIndex) : item;
        const value = separatorIndex >= 0 ? item.slice(separatorIndex + 1) : "";

        return [key, value];
      })
  );
}

function buildCookie(name, value, options = {}) {
  const segments = [`${name}=${value}`];

  if (options.maxAge !== undefined) segments.push(`Max-Age=${options.maxAge}`);
  if (options.path) segments.push(`Path=${options.path}`);
  if (options.httpOnly) segments.push("HttpOnly");
  if (options.sameSite) segments.push(`SameSite=${options.sameSite}`);
  if (options.secure) segments.push("Secure");

  return segments.join("; ");
}

function getAllowedOrigin(request, env) {
  return request.headers.get("origin") || env.ALLOWED_ORIGIN || new URL(request.url).origin;
}

export function json(request, env, data, status = 200, init = {}) {
  const headers = new Headers(init.headers || {});
  const origin = getAllowedOrigin(request, env);

  headers.set("content-type", "application/json; charset=utf-8");
  headers.set("access-control-allow-origin", origin);
  headers.set("access-control-allow-methods", "GET,POST,DELETE,OPTIONS");
  headers.set("access-control-allow-headers", "content-type");
  headers.set("access-control-allow-credentials", "true");
  headers.append("vary", "Origin");

  return new Response(JSON.stringify(data), {
    ...init,
    status,
    headers
  });
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

function normalizeUserId(userId) {
  return String(userId || "").trim().toLowerCase();
}

async function hashPassword(password, salt) {
  const digest = await crypto.subtle.digest(
    "SHA-256",
    encoder.encode(`${salt}:${password}`)
  );

  return toBase64Url(new Uint8Array(digest));
}

function createSalt() {
  const bytes = crypto.getRandomValues(new Uint8Array(16));

  return toBase64Url(bytes);
}

export function validateStudentCredentials(userId, password) {
  const normalizedUserId = normalizeUserId(userId);

  if (!/^[a-z0-9._-]{4,24}$/.test(normalizedUserId)) {
    return { ok: false, error: "invalid_user_id" };
  }

  if (normalizedUserId === ADMIN_USER_ID) {
    return { ok: false, error: "reserved_user_id" };
  }

  if (typeof password !== "string" || password.length < 6 || password.length > 72) {
    return { ok: false, error: "invalid_password" };
  }

  return { ok: true, userId: normalizedUserId };
}

async function getStudentUser(env, userId) {
  const normalizedUserId = normalizeUserId(userId);
  const raw = await upstash(env, `/get/auth:user:${normalizedUserId}`);

  return raw ? JSON.parse(raw) : null;
}

export async function createStudentUser(env, userId, password) {
  const validation = validateStudentCredentials(userId, password);
  if (!validation.ok) {
    throw new Error(validation.error);
  }

  const existingUser = await getStudentUser(env, validation.userId);
  if (existingUser) {
    throw new Error("user_exists");
  }

  const salt = createSalt();
  const passwordHash = await hashPassword(password, salt);
  const user = {
    userId: validation.userId,
    role: "student",
    salt,
    passwordHash,
    createdAt: new Date().toISOString()
  };

  await upstash(env, `/set/auth:user:${validation.userId}`, user);

  return {
    userId: user.userId,
    role: user.role
  };
}

export async function authenticateUser(env, userId, password) {
  const normalizedUserId = normalizeUserId(userId);

  if (normalizedUserId === ADMIN_USER_ID && password === ADMIN_PASSWORD) {
    return {
      userId: ADMIN_USER_ID,
      role: "admin"
    };
  }

  const user = await getStudentUser(env, normalizedUserId);
  if (!user) return null;

  const passwordHash = await hashPassword(password, user.salt);
  if (passwordHash !== user.passwordHash) {
    return null;
  }

  return {
    userId: user.userId,
    role: "student"
  };
}

export async function createSessionCookie(request, env, session) {
  const secret = env.AUTH_SESSION_SECRET;

  if (!secret) {
    throw new Error("missing_auth_session_secret");
  }

  const payload = toBase64Url(
    encoder.encode(
      JSON.stringify({
        userId: session.userId,
        role: session.role,
        exp: Date.now() + SESSION_MAX_AGE * 1000
      })
    )
  );
  const signature = await signValue(payload, secret);

  return buildCookie(SESSION_COOKIE_NAME, `${payload}.${signature}`, {
    maxAge: SESSION_MAX_AGE,
    path: "/",
    httpOnly: true,
    sameSite: "Lax",
    secure: new URL(request.url).protocol === "https:"
  });
}

export function clearSessionCookie(request) {
  return buildCookie(SESSION_COOKIE_NAME, "", {
    maxAge: 0,
    path: "/",
    httpOnly: true,
    sameSite: "Lax",
    secure: new URL(request.url).protocol === "https:"
  });
}

export async function getSession(request, env) {
  const secret = env.AUTH_SESSION_SECRET;
  if (!secret) return null;

  const cookies = parseCookies(request);
  const raw = cookies[SESSION_COOKIE_NAME];
  if (!raw) return null;

  const [payload, signature] = raw.split(".");
  if (!payload || !signature) return null;

  const expectedSignature = await signValue(payload, secret);
  if (signature !== expectedSignature) return null;

  try {
    const parsed = JSON.parse(decodeText(payload));

    if (
      typeof parsed?.userId !== "string" ||
      (parsed?.role !== "admin" && parsed?.role !== "student") ||
      !Number.isFinite(parsed?.exp) ||
      parsed.exp < Date.now()
    ) {
      return null;
    }

    return {
      userId: parsed.userId,
      role: parsed.role
    };
  } catch {
    return null;
  }
}

export async function requireSession(request, env) {
  return getSession(request, env);
}
