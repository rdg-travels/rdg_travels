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

  const { offerId, passengers } = body;
  if (!offerId || !Array.isArray(passengers) || passengers.length === 0) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "offerId and passengers are required" }),
    };
  }

  const duffelHeaders = {
    Authorization: `Bearer ${process.env.DUFFEL_API_KEY}`,
    "Duffel-Version": process.env.DUFFEL_API_VERSION || "v2",
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  // Fetch the offer to get Duffel passenger IDs
  let offer;
  try {
    const offerRes = await fetch(`${DUFFEL_BASE}/air/offers/${offerId}`, {
      headers: duffelHeaders,
    });
    const offerData = await offerRes.json();
    if (!offerRes.ok) {
      const msg = offerData?.errors?.[0]?.message || "Failed to retrieve offer";
      return { statusCode: offerRes.status, body: JSON.stringify({ error: msg }) };
    }
    offer = offerData.data;
  } catch {
    return { statusCode: 500, body: JSON.stringify({ error: "Failed to retrieve offer" }) };
  }

  // Map submitted passengers to Duffel passenger IDs in order
  const duffelPassengers = passengers.map((pax, i) => {
    const duffelPax = offer.passengers[i];
    const mapped = {
      id: duffelPax.id,
      title: pax.title,
      gender: pax.gender,
      given_name: pax.firstName,
      family_name: pax.lastName,
      born_on: pax.dateOfBirth,
      identity_documents: [
        {
          type: pax.documentType || "passport",
          unique_identifier: pax.documentNumber,
          expires_on: pax.documentExpiry,
          issuing_country_code: pax.nationality,
        },
      ],
    };
    if (pax.email) mapped.email = pax.email;
    if (pax.phone) mapped.phone_number = pax.phone;
    return mapped;
  });

  const orderPayload = {
    data: {
      type: "instant",
      selected_offers: [offerId],
      passengers: duffelPassengers,
      payments: [
        {
          type: "balance",
          amount: offer.total_amount,
          currency: offer.total_currency,
        },
      ],
    },
  };

  try {
    const orderRes = await fetch(`${DUFFEL_BASE}/air/orders`, {
      method: "POST",
      headers: duffelHeaders,
      body: JSON.stringify(orderPayload),
    });

    const orderData = await orderRes.json();

    if (!orderRes.ok) {
      const msg = orderData?.errors?.[0]?.message || "Booking failed";
      return { statusCode: orderRes.status, body: JSON.stringify({ error: msg }) };
    }

    const order = orderData.data;
    return {
      statusCode: 200,
      body: JSON.stringify({
        orderId: order.id,
        bookingReference: order.booking_reference,
        totalAmount: order.total_amount,
        currency: order.total_currency,
      }),
    };
  } catch {
    return { statusCode: 500, body: JSON.stringify({ error: "Booking request failed" }) };
  }
};
