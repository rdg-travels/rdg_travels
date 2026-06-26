const DUFFEL_BASE = "https://api.duffel.com";

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: JSON.stringify({ error: "Method not allowed" }) };
  }

  let body;
  try {
    body = JSON.parse(event.body);
  } catch {
    return { statusCode: 400, body: JSON.stringify({ error: "Invalid JSON" }) };
  }

  const { offerId } = body;
  if (!offerId) {
    return { statusCode: 400, body: JSON.stringify({ error: "offerId is required" }) };
  }

  try {
    const res = await fetch(`${DUFFEL_BASE}/air/offers/${offerId}`, {
      headers: {
        Authorization: `Bearer ${process.env.DUFFEL_API_KEY}`,
        "Duffel-Version": process.env.DUFFEL_API_VERSION || "v2",
        Accept: "application/json",
      },
    });

    const data = await res.json();

    if (!res.ok) {
      const msg = data?.errors?.[0]?.message || "Failed to retrieve offer";
      return { statusCode: res.status, body: JSON.stringify({ error: msg }) };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ offer: data.data }),
    };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: "Select request failed" }) };
  }
};
