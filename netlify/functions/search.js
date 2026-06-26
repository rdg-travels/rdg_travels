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

  const {
    origin,
    destination,
    departureDate,
    returnDate,
    adults = 1,
    children = 0,
    infants = 0,
    cabinClass = "economy",
    tripType = "return",
  } = body;

  if (!origin || !destination || !departureDate) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "origin, destination, and departureDate are required" }),
    };
  }

  const slices = [{ origin, destination, departure_date: departureDate }];
  if (tripType === "return" && returnDate) {
    slices.push({ origin: destination, destination: origin, departure_date: returnDate });
  }

  const passengers = [
    ...Array(adults).fill({ type: "adult" }),
    ...Array(children).fill({ type: "child" }),
    ...Array(infants).fill({ type: "infant_without_seat" }),
  ];

  const payload = {
    data: {
      slices,
      passengers,
      cabin_class: cabinClass,
    },
  };

  try {
    const res = await fetch(`${DUFFEL_BASE}/air/offer_requests?return_offers=true`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.DUFFEL_API_KEY}`,
        "Duffel-Version": process.env.DUFFEL_API_VERSION || "v2",
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (!res.ok) {
      const msg = data?.errors?.[0]?.message || "Duffel search failed";
      return { statusCode: res.status, body: JSON.stringify({ error: msg }) };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ offers: data.data.offers }),
    };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: "Search request failed" }) };
  }
};
