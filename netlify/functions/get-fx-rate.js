// In-memory cache survives across warm Lambda invocations (cleared on cold start)
const cache = {};
const TTL = 60 * 60 * 1000; // 1 hour

exports.handler = async (event) => {
  if (event.httpMethod !== "GET") {
    return { statusCode: 405, body: JSON.stringify({ error: "Method not allowed" }) };
  }

  const { from = "GBP", to = "NGN" } = event.queryStringParameters || {};
  const key = `${from.toUpperCase()}_${to.toUpperCase()}`;

  // Serve from cache if fresh
  const now = Date.now();
  if (cache[key] && now - cache[key].fetchedAt < TTL) {
    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json", "X-Cache": "HIT" },
      body: JSON.stringify({ rate: cache[key].rate, from, to }),
    };
  }

  try {
    const res = await fetch(`https://open.er-api.com/v6/latest/${from.toUpperCase()}`);
    const data = await res.json();

    if (!res.ok || data.result !== "success") {
      throw new Error(data.error || "Bad response from exchange rate API");
    }

    const rate = data.rates[to.toUpperCase()];
    if (!rate) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: `No rate found for ${to}` }),
      };
    }

    cache[key] = { rate, fetchedAt: now };

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json", "X-Cache": "MISS" },
      body: JSON.stringify({ rate, from, to }),
    };
  } catch (err) {
    // Return stale cache rather than failing hard
    if (cache[key]) {
      return {
        statusCode: 200,
        headers: { "Content-Type": "application/json", "X-Cache": "STALE" },
        body: JSON.stringify({ rate: cache[key].rate, from, to }),
      };
    }
    return {
      statusCode: 503,
      body: JSON.stringify({ error: "Exchange rate unavailable" }),
    };
  }
};
