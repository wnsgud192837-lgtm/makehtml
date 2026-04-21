const json = (data, status = 200, origin = "*") =>
  new Response(JSON.stringify(data), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "access-control-allow-origin": origin,
      "access-control-allow-methods": "GET,POST,DELETE,OPTIONS",
      "access-control-allow-headers": "content-type"
    }
  });

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
    throw new Error(data.error || `Upstash request failed: ${response.status}`);
  }

  return data.result;
}

async function getPollIds(env) {
  return (await upstash(env, "/smembers/governance:polls")) || [];
}

async function getPoll(env, pollId) {
  const raw = await upstash(env, `/get/governance:poll:${pollId}`);
  return raw ? JSON.parse(raw) : null;
}

async function getResults(env, pollId) {
  const raw = await upstash(env, `/get/governance:results:${pollId}`);
  return raw ? JSON.parse(raw) : [];
}

async function getUserVotes(env, userKey) {
  const raw = await upstash(env, `/get/governance:user:${userKey}:votes`);
  return raw ? JSON.parse(raw) : {};
}

async function setJson(env, key, value) {
  return upstash(env, `/set/${key}`, value);
}

async function deleteKey(env, key) {
  return upstash(env, `/del/${key}`);
}

async function listPolls(env, userKey) {
  const pollIds = await getPollIds(env);
  const userVotes = userKey ? await getUserVotes(env, userKey) : {};
  const polls = await Promise.all(
    pollIds.map(async (pollId) => {
      const poll = await getPoll(env, pollId);
      if (!poll) return null;

      const optionCounts = await getResults(env, pollId);
      return {
        ...poll,
        voteCount: optionCounts.reduce((sum, count) => sum + count, 0),
        optionCounts,
        selectedOption: Object.hasOwn(userVotes, pollId) ? userVotes[pollId] : null
      };
    })
  );

  return polls.filter(Boolean).sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
}

async function createPoll(request, env, origin) {
  const body = await request.json();
  const { id, title, description, options } = body;

  if (!id || !title || !Array.isArray(options) || options.length < 2) {
    return json({ error: "invalid_poll_payload" }, 400, origin);
  }

  const poll = {
    id,
    title,
    description: description || "",
    options,
    createdAt: new Date().toISOString()
  };

  await setJson(env, `governance:poll:${id}`, poll);
  await setJson(env, `governance:results:${id}`, options.map(() => 0));
  await upstash(env, `/sadd/governance:polls/${id}`);

  return json({ ok: true, poll }, 201, origin);
}

async function removePoll(pollId, env, origin) {
  await deleteKey(env, `governance:poll:${pollId}`);
  await deleteKey(env, `governance:results:${pollId}`);
  await upstash(env, `/srem/governance:polls/${pollId}`);

  const voterKeys = (await upstash(env, `/smembers/governance:poll:${pollId}:voters`)) || [];
  await Promise.all(
    voterKeys.map(async (userKey) => {
      const votes = await getUserVotes(env, userKey);
      delete votes[pollId];
      await setJson(env, `governance:user:${userKey}:votes`, votes);
    })
  );
  await deleteKey(env, `governance:poll:${pollId}:voters`);

  return json({ ok: true }, 200, origin);
}

async function vote(request, env, origin) {
  const body = await request.json();
  const { pollId, userKey, optionIndex, currentTokens } = body;

  if (!pollId || !userKey || !Number.isInteger(optionIndex)) {
    return json({ error: "invalid_vote_payload" }, 400, origin);
  }

  const poll = await getPoll(env, pollId);
  if (!poll) return json({ error: "poll_not_found" }, 404, origin);
  if (optionIndex < 0 || optionIndex >= poll.options.length) {
    return json({ error: "invalid_option" }, 400, origin);
  }
  if (!Number.isInteger(currentTokens) || currentTokens < 1) {
    return json({ error: "not_enough_tokens" }, 400, origin);
  }

  const userVotes = await getUserVotes(env, userKey);
  if (Object.hasOwn(userVotes, pollId)) {
    return json({ error: "already_voted" }, 409, origin);
  }

  const results = await getResults(env, pollId);
  results[optionIndex] = (results[optionIndex] || 0) + 1;
  userVotes[pollId] = optionIndex;

  await setJson(env, `governance:results:${pollId}`, results);
  await setJson(env, `governance:user:${userKey}:votes`, userVotes);
  await upstash(env, `/sadd/governance:poll:${pollId}:voters/${userKey}`);

  return json(
    {
      ok: true,
      pollId,
      optionIndex,
      optionCounts: results,
      voteCount: results.reduce((sum, count) => sum + count, 0)
    },
    200,
    origin
  );
}

export async function onRequest(context) {
  const { request, env, params } = context;
  const origin = request.headers.get("origin") || env.ALLOWED_ORIGIN || "*";
  const route = Array.isArray(params.route)
    ? params.route
    : typeof params.route === "string" && params.route.length > 0
      ? [params.route]
      : [];

  if (request.method === "OPTIONS") {
    return json({ ok: true }, 200, origin);
  }

  try {
    if (request.method === "GET" && route.length === 1 && route[0] === "polls") {
      const url = new URL(request.url);
      const userKey = url.searchParams.get("userKey") || "";
      const polls = await listPolls(env, userKey);
      return json({ polls }, 200, origin);
    }

    if (request.method === "POST" && route.length === 1 && route[0] === "polls") {
      return createPoll(request, env, origin);
    }

    if (request.method === "DELETE" && route.length === 2 && route[0] === "polls") {
      return removePoll(decodeURIComponent(route[1]), env, origin);
    }

    if (request.method === "POST" && route.length === 1 && route[0] === "vote") {
      return vote(request, env, origin);
    }

    return json({ error: "not_found" }, 404, origin);
  } catch (error) {
    return json({ error: error.message || "internal_error" }, 500, origin);
  }
}
