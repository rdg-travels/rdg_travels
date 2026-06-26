const crypto = require("crypto");

const RESEND_BASE = "https://api.resend.com";

function formatDate(dateStr) {
  if (!dateStr) return "";
  const [y, mo, d] = dateStr.split("T")[0].split("-").map(Number);
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  return `${d} ${months[mo - 1]} ${y}`;
}

function paxLine(adults, children, infants) {
  const parts = [];
  const a = parseInt(adults)   || 0;
  const c = parseInt(children) || 0;
  const n = parseInt(infants)  || 0;
  if (a) parts.push(a + " adult"  + (a > 1 ? "s" : ""));
  if (c) parts.push(c + " child"  + (c > 1 ? "ren" : ""));
  if (n) parts.push(n + " infant" + (n > 1 ? "s" : ""));
  return parts.join(", ") || "1 adult";
}

function cabinLabel(c) {
  return { economy: "Economy", premium_economy: "Premium Economy",
           business: "Business", first: "First Class" }[c] || "Economy";
}

function fmtNGN(n) {
  return "₦" + Number(Math.round(n)).toLocaleString("en-NG");
}

async function sendConfirmationEmail(data, customerEmail) {
  const {
    bookingReference, passengerName,
    origin, destination, departureDate, returnDate, tripType,
    airline, cabinClass, adults, children, infants, totalAmountNGN,
  } = data;

  const isReturn = tripType === "return" && returnDate;

  const routeSection = `
    <tr>
      <td style="padding:8px 0;color:#6b7280;font-size:14px;">Route</td>
      <td style="padding:8px 0;font-weight:600;text-align:right;">${origin} → ${destination}</td>
    </tr>
    <tr>
      <td style="padding:8px 0;color:#6b7280;font-size:14px;">Departure</td>
      <td style="padding:8px 0;font-weight:600;text-align:right;">${formatDate(departureDate)}</td>
    </tr>
    ${isReturn ? `
    <tr>
      <td style="padding:8px 0;color:#6b7280;font-size:14px;">Return</td>
      <td style="padding:8px 0;font-weight:600;text-align:right;">${formatDate(returnDate)}</td>
    </tr>` : ""}`;

  const html = `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f9fafb;font-family:Arial,Helvetica,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f9fafb;padding:32px 16px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

        <!-- Header -->
        <tr>
          <td style="background:#093ba8;border-radius:12px 12px 0 0;padding:24px 32px;text-align:center;">
            <h1 style="margin:0;color:#fff;font-size:22px;letter-spacing:-0.5px;">RDG Travels</h1>
            <p style="margin:4px 0 0;color:rgba(255,255,255,0.7);font-size:13px;">Your booking is confirmed</p>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="background:#fff;border:1px solid #e5e7eb;border-top:none;border-radius:0 0 12px 12px;padding:32px;">

            <!-- Checkmark -->
            <div style="text-align:center;margin-bottom:24px;">
              <div style="display:inline-block;background:#dcfce7;border-radius:50%;width:64px;height:64px;line-height:64px;font-size:28px;">✓</div>
            </div>

            <h2 style="margin:0 0 8px;color:#111827;font-size:20px;text-align:center;">Booking Confirmed!</h2>
            <p style="margin:0 0 24px;color:#6b7280;text-align:center;font-size:14px;">
              Hi ${passengerName ? `<strong>${passengerName}</strong>` : "there"},
              your flight has been booked and payment received.
            </p>

            <!-- Reference pill -->
            <div style="background:#f3f4f6;border-radius:8px;padding:16px 24px;text-align:center;margin-bottom:24px;">
              <p style="margin:0 0 4px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:#9ca3af;">Booking Reference</p>
              <p style="margin:0;font-size:22px;font-weight:800;color:#111827;font-family:monospace;letter-spacing:1px;">${bookingReference}</p>
            </div>

            <!-- Flight details table -->
            <table width="100%" cellpadding="0" cellspacing="0"
                   style="border:1px solid #e5e7eb;border-radius:8px;overflow:hidden;margin-bottom:24px;">
              <tr>
                <td colspan="2" style="background:#093ba8;padding:12px 20px;font-size:12px;font-weight:700;
                    text-transform:uppercase;letter-spacing:0.5px;color:#fff;">
                  Flight Details
                </td>
              </tr>
              <tr><td colspan="2" style="padding:0 20px;">
                <table width="100%" cellpadding="0" cellspacing="0">
                  ${routeSection}
                  <tr>
                    <td style="padding:8px 0;color:#6b7280;font-size:14px;">Airline</td>
                    <td style="padding:8px 0;font-weight:600;text-align:right;">${airline || "—"}</td>
                  </tr>
                  <tr>
                    <td style="padding:8px 0;color:#6b7280;font-size:14px;">Cabin</td>
                    <td style="padding:8px 0;font-weight:600;text-align:right;">${cabinLabel(cabinClass)}</td>
                  </tr>
                  <tr>
                    <td style="padding:8px 0;color:#6b7280;font-size:14px;">Passengers</td>
                    <td style="padding:8px 0;font-weight:600;text-align:right;">${paxLine(adults, children, infants)}</td>
                  </tr>
                  <tr style="border-top:1px solid #f3f4f6;">
                    <td style="padding:12px 0 8px;font-weight:700;color:#111827;">Total Paid</td>
                    <td style="padding:12px 0 8px;font-weight:800;color:#059669;font-size:18px;text-align:right;">
                      ${totalAmountNGN ? fmtNGN(totalAmountNGN) : "—"}
                    </td>
                  </tr>
                </table>
              </td></tr>
            </table>

            <!-- Note -->
            <p style="font-size:13px;color:#6b7280;line-height:1.6;margin:0 0 24px;">
              Please keep your booking reference safe. You'll need it to manage your booking,
              check in, or contact us.
            </p>

            <!-- CTA -->
            <div style="text-align:center;margin-bottom:24px;">
              <a href="https://rdgtravels.com/confirmation.html"
                 style="display:inline-block;background:#093ba8;color:#fff;padding:12px 28px;
                        border-radius:8px;font-size:14px;font-weight:700;text-decoration:none;">
                View Booking
              </a>
            </div>

            <!-- Divider -->
            <hr style="border:none;border-top:1px solid #f3f4f6;margin:0 0 20px;">

            <!-- Help -->
            <p style="font-size:13px;color:#9ca3af;text-align:center;margin:0;line-height:1.8;">
              Need help?
              <a href="mailto:info@rdgtravels.com" style="color:#093ba8;text-decoration:none;">info@rdgtravels.com</a>
              &nbsp;·&nbsp;
              <a href="https://wa.me/+2348034099082" style="color:#093ba8;text-decoration:none;">WhatsApp +2348034099082</a>
            </p>

          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="padding:20px;text-align:center;font-size:12px;color:#9ca3af;">
            © ${new Date().getFullYear()} RDG Consults. All rights reserved.<br>
            <a href="https://rdgtravels.com" style="color:#9ca3af;">rdgtravels.com</a>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;

  const emailRes = await fetch(`${RESEND_BASE}/emails`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "RDG Travels <bookings@rdgtravels.com>",
      to: [customerEmail],
      subject: `Booking Confirmed — ${bookingReference}`,
      html,
    }),
  });

  if (!emailRes.ok) {
    const err = await emailRes.text();
    console.error("Resend error:", err);
  } else {
    console.log("Confirmation email sent to", customerEmail);
  }
}

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: JSON.stringify({ error: "Method not allowed" }) };
  }

  const signature = event.headers["x-paystack-signature"];
  if (!signature) {
    return { statusCode: 400, body: JSON.stringify({ error: "Missing signature" }) };
  }

  const expected = crypto
    .createHmac("sha512", process.env.PAYSTACK_SECRET_KEY)
    .update(event.body)
    .digest("hex");

  if (signature !== expected) {
    return { statusCode: 401, body: JSON.stringify({ error: "Invalid signature" }) };
  }

  let payload;
  try {
    payload = JSON.parse(event.body);
  } catch {
    return { statusCode: 400, body: JSON.stringify({ error: "Invalid JSON" }) };
  }

  if (payload.event === "charge.success") {
    const { metadata } = payload.data || {};
    const customerEmail = payload.data?.customer?.email;

    console.log("charge.success — orderId:", metadata?.orderId,
                "ref:", metadata?.bookingReference);

    if (customerEmail && metadata?.bookingReference) {
      try {
        await sendConfirmationEmail(metadata, customerEmail);
      } catch (err) {
        // Log but don't fail the webhook response — Paystack would retry endlessly
        console.error("Failed to send confirmation email:", err.message);
      }
    }
  }

  return { statusCode: 200, body: JSON.stringify({ received: true }) };
};
