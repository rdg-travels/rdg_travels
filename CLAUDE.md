# RDG Travels — Claude Code context

## What this project is

Static HTML travel site at rdgtravels.com with real flight search and booking
powered by the Duffel API, Paystack for payments, and Tina CMS so the marketing
team can edit content without developer involvement.

## How to run locally

```bash
npm install
npm run dev                  # starts Tina + Netlify dev server together
npm run build                # builds Tina admin + Netlify build
node test/test-search.js     # smoke test Duffel API connection
```

Requires a `.env` file at the repo root (never commit this):
```
DUFFEL_API_KEY=
DUFFEL_API_VERSION=v2
PAYSTACK_SECRET_KEY=
TINA_PUBLIC_CLIENT_ID=
TINA_TOKEN=
```

## Stack

| Layer | Tool |
|---|---|
| Frontend | Vanilla HTML/CSS/JS — no frameworks |
| Styling | `public/css/style.css` — single global stylesheet |
| Functions | Netlify Functions, Node 18, in `netlify/functions/` |
| Flight API | Duffel v2 |
| Payments | Paystack |
| CMS | Tina CMS — schema in `tina/config.ts` |
| Deploy | Netlify |

## Project structure

```
rdgtravels/
├── public/
│   ├── assets/
│   ├── css/
│   │   └── style.css         ← global styles, never modify
│   ├── images/
│   ├── js/
│   ├── flight.html           ← booking widget lives here
│   ├── search.html           ← flight results
│   ├── booking.html          ← passenger details + payment
│   ├── confirmation.html     ← booking confirmed
│   └── index.html            ← homepage with CMS-injected content
├── tina/
│   └── config.ts             ← Tina CMS schema
├── content/
│   └── site-settings.json    ← editable content (Tina writes here)
├── netlify/
│   └── functions/
│       ├── search.js              ← Duffel offer_requests proxy
│       ├── select.js              ← Duffel offer confirmation proxy
│       ├── book.js                ← Duffel order creation proxy
│       ├── pay.js                 ← Paystack transaction initialize
│       └── paystack-webhook.js   ← Paystack payment confirmation
├── test/
│   └── test-search.js        ← Duffel sandbox smoke test
├── BRIEF.md                  ← original build specification
├── CLAUDE.md                 ← this file
├── netlify.toml
└── package.json
```

## Booking flow

```
flight.html  →  search.html  →  booking.html  →  Paystack  →  confirmation.html
(widget)        (results)        (pax details)    (payment)     (reference)
     ↓               ↓                ↓                               ↑
  URL params      /functions/      /functions/              Paystack callback_url
  to search       search.js        book.js + pay.js
```

- Search params passed between pages via URL query string
- Flight summary stored in `sessionStorage` on `booking.html` before Paystack redirect,
  retrieved on `confirmation.html`
- Paystack appends `?reference=` to the callback URL on success

## File rules — read before touching anything

- **Never modify `public/css/style.css`** — new styles go in a `<style>` block
  inside the relevant page or a new page-specific CSS file
- **Never rename or move existing HTML files** in `public/`
- **Never hardcode API keys** — always `process.env.VARIABLE_NAME`
- **New pages must inherit** the existing `<head>`, nav, and footer from `index.html`
- **Do not add frameworks** — no React, Vue, or build tools for the frontend;
  vanilla JS only
- **Do not modify nav or footer markup** in any existing page

## Netlify Functions conventions

- All functions export a standard Netlify handler: `exports.handler = async (event) => {}`
- Parse request body with `JSON.parse(event.body)`
- Always return `{ statusCode, body: JSON.stringify(...) }`
- Return meaningful error messages — never expose raw API error objects to the client
- Duffel base URL: `https://api.duffel.com`
- Duffel auth header: `Authorization: Bearer ${process.env.DUFFEL_API_KEY}`
- Duffel version header: `Duffel-Version: ${process.env.DUFFEL_API_VERSION}`
- Paystack base URL: `https://api.paystack.co`
- Paystack auth header: `Authorization: Bearer ${process.env.PAYSTACK_SECRET_KEY}`

## Paystack integration notes

- Amount must always be sent to Paystack in **kobo** (NGN × 100)
- Pass `orderId` and `bookingReference` in the Paystack `metadata` field
- Set `callback_url` to `https://rdgtravels.com/confirmation.html`
- `paystack-webhook.js` must verify the `x-paystack-signature` header using
  HMAC SHA512 before processing any event
- Only fulfil a booking after a verified `charge.success` webhook event —
  never rely on the frontend redirect alone as payment confirmation

## Content management

Marketing edits content at `/admin` (Tina CMS). No developer needed for:
- Hero headline and subtext on the homepage
- Promotional banner (show/hide, copy, CTA, link)

Editable values live in `content/site-settings.json`. Tina writes to this file
on save and triggers a Netlify redeploy.

Do not hardcode hero text or banner copy directly in HTML — always inject from
`site-settings.json` via the fetch script in `index.html`.

CMS injection targets in `index.html`:
- `#hero-headline`
- `#hero-subtext`
- `#promo-banner` (only rendered when `promo_banner_active: true`)

## Known decisions

- **Paystack over Stripe** — chosen for African market fit; higher card success
  rates on Nigerian-issued cards, native NGN billing, local bank transfer and
  USSD support. Revisit Stripe only if billing international travelers in
  GBP/USD at scale becomes a requirement.
- **Tina CMS over Netlify CMS** — better editing UX, no dependency on
  Netlify Identity
- **Duffel over Amadeus** — simpler auth (single API key vs OAuth2), cleaner
  REST API, faster to integrate; revisit if inventory gaps appear on African routes
- **No frontend framework** — site is static HTML; adding a framework would
  require a build pipeline that breaks the existing page structure
- **URL query string for state** — search params passed between pages via URL,
  not localStorage, so bookmarks and back-navigation work correctly
- **sessionStorage for flight summary** — stored on `booking.html` before the
  Paystack redirect so `confirmation.html` can display trip details without
  a backend lookup

## Build spec

See `BRIEF.md` for the full original specification including all task details,
input/output shapes for each function, and the definition of done checklist.
