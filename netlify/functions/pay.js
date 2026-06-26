const PAYSTACK_BASE = "https://api.paystack.co";

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
    email, amount, currency, orderId, bookingReference,
    passengerName, origin, destination, departureDate, returnDate,
    tripType, adults, children, infants, airline, cabinClass, totalAmountNGN,
  } = body;

  if (!email || !amount || !orderId || !bookingReference) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "email, amount, orderId, and bookingReference are required" }),
    };
  }

  const payload = {
    email,
    amount: Math.round(amount * 100), // kobo
    currency: currency || "NGN",
    callback_url: "https://rdgtravels.com/confirmation.html",
    metadata: {
      orderId, bookingReference,
      passengerName, origin, destination, departureDate, returnDate,
      tripType, adults, children, infants, airline, cabinClass, totalAmountNGN,
    },
  };

  try {
    const res = await fetch(`${PAYSTACK_BASE}/transaction/initialize`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (!res.ok || !data.status) {
      const msg = data?.message || "Paystack initialization failed";
      return { statusCode: res.status || 500, body: JSON.stringify({ error: msg }) };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        authorizationUrl: data.data.authorization_url,
        reference: data.data.reference,
      }),
    };
  } catch {
    return { statusCode: 500, body: JSON.stringify({ error: "Payment initialization failed" }) };
  }
};
