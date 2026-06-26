# RDG Travels — Flight Booking Site Brief

## Context

Static HTML travel site at rdgtravels.com. Adding real flight search and booking powered by the Duffel API, with Paystack for payments. Deployable on Netlify with serverless functions as the API proxy layer. Marketing edits site content (hero text, taglines, promotional banners) through Tina CMS — no developer involvement needed.

## Tech stack

- Frontend: vanilla HTML/CSS/JS (no framework)
- Backend: Netlify Functions (Node.js)
- Flight API: Duffel (sandbox credentials via env vars)
- Payments: Paystack
- CMS: Tina CMS (cloud-hosted editing UI, Git-backed)

## Existing file structure

This is the current repo — do not reorganise or rename anything here:

```
rdgtravels/
└── public/
    ├── assets/
    ├── css/
    │   └── style.css        ← global stylesheet, do not modify
    ├── images/
    ├── js/
    ├── about-us.html
    ├── all-hotels.html
    ├── contact-us.html
    ├── destination-detail1.html
    ├── destination-detail2.html
    ├── destination-detail3.html
    ├── destinations.html
    ├── flight.html           ← existing page, this becomes the booking widget host
    ├── hotel-detail1.html
    ├── hotel-detail2.html
    ├── hotel-service.html
    ├── index.html            ← homepage, keep intact
    └── study-abroad.html
```

## Target file structure after build

Add only the following — do not move or rename existing files:

```
rdgtravels/
├── public/
│   ├── flight.html           ← replace form with booking widget + wire to search.html
│   ├── search.html           ← new: flight results page
│   ├── booking.html          ← new: passenger details + payment
│   └── confirmation.html     ← new: booking confirmed
├── tina/
│   └── config.ts             ← Tina schema + cloud config
├── content/
│   └── site-settings.json    ← editable content file Tina writes to
├── netlify/
│   └── functions/
│       ├── search.js
│       ├── select.js
│       ├── book.js
│       └── pay.js
├── test/
│   └── test-search.js        ← Duffel sandbox smoke test
├── package.json
└── netlify.toml
```

## Environment variables

```
DUFFEL_API_KEY
DUFFEL_API_VERSION=v2
PAYSTACK_SECRET_KEY
TINA_PUBLIC_CLIENT_ID
TINA_TOKEN
```

Never hardcode credentials. All functions must read from `process.env`.

---

## Task 1 — Netlify Functions

Create four serverless functions in `netlify/functions/`. Each accepts POST requests and proxies to the relevant API.

### `search.js`

Input:
```json
{
  "origin": "LOS",
  "destination": "LHR",
  "departureDate": "2026-08-01",
  "returnDate": "2026-08-15",
  "adults": 1,
  "children": 0,
  "infants": 0,
  "cabinClass": "economy",
  "tripType": "return"
}
```

Action: Call Duffel `POST /air/offer_requests` with `return_offers: true`.

Output: Array of flight offers.

---

### `select.js`

Input:
```json
{ "offerId": "off_123" }
```

Action: Call Duffel `GET /air/offers/{offerId}` to confirm price is still live.

Output: Confirmed offer object.

---

### `book.js`

Input:
```json
{
  "offerId": "off_123",
  "passengers": [
    {
      "title": "mr",
      "firstName": "Taiwo",
      "lastName": "Ayanleye",
      "dateOfBirth": "1990-01-01",
      "email": "taiwo@example.com",
      "phone": "+2348000000000",
      "documentType": "passport",
      "documentNumber": "A12345678",
      "documentExpiry": "2030-01-01",
      "nationality": "NG"
    }
  ]
}
```

Action: Call Duffel `POST /air/orders`.

Output:
```json
{
  "orderId": "ord_123",
  "bookingReference": "ABC123",
  "totalAmount": "450.00",
  "currency": "NGN"
}
```

---

### `pay.js`

Input:
```json
{
  "email": "taiwo@example.com",
  "amount": 45000,
  "currency": "NGN",
  "orderId": "ord_123",
  "bookingReference": "ABC123"
}
```

Action: Call Paystack `POST /transaction/initialize` to create a transaction.

- Amount must be in kobo (multiply NGN amount by 100 before sending to Paystack)
- Pass `orderId` and `bookingReference` in the `metadata` field
- Set `callback_url` to `https://rdgtravels.com/confirmation.html`

Output:
```json
{
  "authorizationUrl": "https://checkout.paystack.com/xxx",
  "reference": "pay_ref_xxx"
}
```

---

### Paystack webhook (add as `netlify/functions/paystack-webhook.js`)

Paystack will POST to this endpoint to confirm payment. This function must:

1. Verify the request signature using `PAYSTACK_SECRET_KEY` and the `x-paystack-signature` header (HMAC SHA512)
2. Check `event === 'charge.success'`
3. Extract `orderId` from `data.metadata`
4. Return `200` — Paystack requires a fast 200 response

This is the source of truth for payment confirmation — do not fulfil a booking without a verified webhook event.

---

## Task 2 — Frontend pages

### `public/flight.html` — Booking widget (modify existing)

This page already exists. Replace the existing form content with the flight booking widget. Preserve:
- The existing `<head>` (meta tags, stylesheet links to `css/style.css`)
- The existing nav and footer
- Any existing page wrapper/container classes so the widget inherits the site's layout

The booking widget must support:
- Return / One-way / Multi-city tabs
- Origin and destination fields with swap button
- Departure and return date pickers
- Passenger selector (adults, children, infants) with cabin class (Economy / Business / First)
- On submit: serialize all fields and redirect to `search.html` via URL query string

---

### `public/search.html` — Flight results (new)

- Inherit the site's nav, footer, and stylesheet (`css/style.css`)
- On load, read search params from URL query string
- Call `/.netlify/functions/search`
- Display results as cards showing:
  - Airline logo (`marketing_carrier.logo_symbol_url` from Duffel)
  - Departure and arrival times
  - Flight duration
  - Number of stops
  - Total price
  - "Select" button → passes `offerId` to `booking.html` via URL param
- Loading skeleton while fetching
- Clear error state if search fails

---

### `public/booking.html` — Passenger details + payment (new)

- Inherit the site's nav, footer, and stylesheet
- Render one passenger form per passenger based on pax count from URL params
- Fields per passenger: title, first name, last name, date of birth
- Lead passenger only: email, phone
- All passengers: passport number, passport expiry, nationality
- Progress indicator: Search → Passenger details → Payment → Confirmed
- On submit:
  1. Call `/.netlify/functions/book` to create the Duffel order
  2. Call `/.netlify/functions/pay` to initialize a Paystack transaction
  3. Redirect the user to `authorizationUrl` returned by Paystack
  4. Paystack handles the payment UI and redirects back to `confirmation.html`

---

### `public/confirmation.html` — Booking confirmed (new)

- Inherit the site's nav, footer, and stylesheet
- On load, read `reference` from URL query string (Paystack appends this on redirect)
- Display booking reference
- Display flight summary (route, dates, passengers) — store summary in sessionStorage on `booking.html` before redirecting to Paystack, retrieve it here
- "Download itinerary" button (triggers browser print-to-PDF)

---

## Task 3 — Tina CMS

Install and configure Tina CMS for Git-backed visual content editing. Marketing logs in at `/admin` — no developer involvement needed for content changes.

### Install

```bash
npm install tinacms @tinacms/cli
```

### `tina/config.ts`

```ts
import { defineConfig } from "tinacms";

export default defineConfig({
  branch: "main",
  clientId: process.env.TINA_PUBLIC_CLIENT_ID,
  token: process.env.TINA_TOKEN,
  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "uploads",
      publicFolder: "public",
    },
  },
  schema: {
    collections: [
      {
        name: "siteSettings",
        label: "Site settings",
        path: "content",
        format: "json",
        ui: {
          allowedActions: { create: false, delete: false },
        },
        fields: [
          { type: "string", name: "hero_headline", label: "Hero headline" },
          {
            type: "string",
            name: "hero_subtext",
            label: "Hero subtext",
            ui: { component: "textarea" },
          },
          {
            type: "boolean",
            name: "promo_banner_active",
            label: "Show promo banner",
          },
          { type: "string", name: "promo_banner_text", label: "Banner copy" },
          {
            type: "string",
            name: "promo_banner_cta",
            label: "Banner button label",
          },
          {
            type: "string",
            name: "promo_banner_url",
            label: "Banner button link",
          },
        ],
      },
    ],
  },
});
```

### `content/site-settings.json`

```json
{
  "hero_headline": "Where are you flying next?",
  "hero_subtext": "Search hundreds of airlines. Book in minutes.",
  "promo_banner_active": false,
  "promo_banner_text": "Summer sale — 20% off selected routes",
  "promo_banner_cta": "View deals",
  "promo_banner_url": "/deals"
}
```

### `package.json` scripts

```json
{
  "scripts": {
    "dev": "tinacms dev -c \"netlify dev\"",
    "build": "tinacms build && netlify build",
    "admin": "tinacms dev"
  }
}
```

### CMS content injection in `public/index.html`

Fetch `content/site-settings.json` on page load and inject into the DOM:

- `#hero-headline` — hero title text
- `#hero-subtext` — supporting text below headline
- `#promo-banner` — only render if `promo_banner_active` is `true`; populate with `promo_banner_text`, `promo_banner_cta`, and `promo_banner_url`

Do not modify any other part of `index.html`.

---

## Task 4 — Netlify config

### `netlify.toml`

```toml
[build]
  command = "npm run build"
  publish = "public"
  functions = "netlify/functions"

[build.environment]
  NODE_VERSION = "18"

[[redirects]]
  from = "/admin/*"
  to = "/admin/index.html"
  status = 200
```

---

## Task 5 — Duffel sandbox smoke test

Create `test/test-search.js` — plain Node.js, no test framework.

- Call the local search function directly with a Lagos (LOS) → London (LHR) search
- Log the first three offers returned
- Exit cleanly

Run with:
```bash
node test/test-search.js
```

---

## What to preserve

- Do not modify `css/style.css`
- Do not rename or move any existing HTML files
- Do not modify nav or footer markup in any existing page
- The only edits to existing files are:
  - `public/flight.html` — replace the form body with the booking widget
  - `public/index.html` — add three CMS injection targets (`#hero-headline`, `#hero-subtext`, `#promo-banner`) and the fetch script

---

## Definition of done

- [ ] `npm run dev` starts both Tina and Netlify dev server together with no errors
- [ ] `/admin` loads Tina's visual editor (local mode works without cloud credentials)
- [ ] Marketing can change hero headline in Tina, save, and see it update on `index.html`
- [ ] `node test/test-search.js` returns real Duffel sandbox results for LOS → LHR
- [ ] Booking widget on `flight.html` submits and lands on `search.html` with correct URL params
- [ ] Full booking flow completes end-to-end in Duffel sandbox + Paystack test mode
- [ ] Paystack webhook verifies signature correctly and returns 200
- [ ] `confirmation.html` displays booking reference and flight summary
