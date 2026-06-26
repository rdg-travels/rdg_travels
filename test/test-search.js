require("dotenv").config();

const DUFFEL_BASE = "https://api.duffel.com";

async function main() {
  const payload = {
    data: {
      slices: [
        { origin: "LOS", destination: "LHR", departure_date: "2026-08-01" },
        { origin: "LHR", destination: "LOS", departure_date: "2026-08-15" },
      ],
      passengers: [{ type: "adult" }],
      cabin_class: "economy",
    },
  };

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
    console.error("Duffel error:", data?.errors?.[0]?.message || data);
    process.exit(1);
  }

  const offers = data.data.offers;
  console.log(`Total offers returned: ${offers.length}\n`);

  offers.slice(0, 3).forEach((offer, i) => {
    const slice = offer.slices[0];
    const seg = slice.segments[0];
    console.log(`--- Offer ${i + 1} ---`);
    console.log(`  ID:        ${offer.id}`);
    console.log(`  Price:     ${offer.total_amount} ${offer.total_currency}`);
    console.log(`  Airline:   ${seg.marketing_carrier.name}`);
    console.log(`  Departs:   ${seg.departing_at}`);
    console.log(`  Arrives:   ${seg.arriving_at}`);
    console.log(`  Stops:     ${slice.segments.length - 1}`);
    console.log();
  });
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
