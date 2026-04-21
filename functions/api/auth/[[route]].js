import {
  authenticateUser,
  createStudentUser,
  clearSessionCookie,
  createSessionCookie,
  getSession,
  json
} from "../../_lib/auth.js";

export async function onRequest(context) {
  const { request, env, params } = context;
  const route = Array.isArray(params.route)
    ? params.route
    : typeof params.route === "string" && params.route.length > 0
      ? [params.route]
      : [];

  if (request.method === "OPTIONS") {
    return json(request, env, { ok: true });
  }

  if (request.method === "GET" && route.length === 1 && route[0] === "session") {
    const session = await getSession(request, env);

    return json(request, env, {
      authenticated: Boolean(session),
      user: session
    });
  }

  if (request.method === "POST" && route.length === 1 && route[0] === "login") {
    const body = await request.json();
    const userId = String(body?.userId || "").trim();
    const password = String(body?.password || "").trim();

    const user = await authenticateUser(env, userId, password);
    if (!user) {
      return json(request, env, { error: "invalid_credentials" }, 401);
    }

    const sessionCookie = await createSessionCookie(request, env, user);

    return json(
      request,
      env,
      {
        ok: true,
        user: {
          userId: user.userId,
          role: user.role
        }
      },
      200,
      {
        headers: {
          "set-cookie": sessionCookie
        }
      }
    );
  }

  if (request.method === "POST" && route.length === 1 && route[0] === "register") {
    const body = await request.json();
    const userId = String(body?.userId || "").trim();
    const password = String(body?.password || "").trim();
    const confirmPassword = String(body?.confirmPassword || "").trim();

    if (password !== confirmPassword) {
      return json(request, env, { error: "password_mismatch" }, 400);
    }

    try {
      const user = await createStudentUser(env, userId, password);

      return json(request, env, {
        ok: true,
        user
      });
    } catch (error) {
      return json(request, env, { error: error.message || "register_failed" }, 400);
    }
  }

  if (request.method === "POST" && route.length === 1 && route[0] === "logout") {
    return json(
      request,
      env,
      { ok: true },
      200,
      {
        headers: {
          "set-cookie": clearSessionCookie(request)
        }
      }
    );
  }

  return json(request, env, { error: "not_found" }, 404);
}
