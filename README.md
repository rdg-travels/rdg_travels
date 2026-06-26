# RDG Travels

A travel booking platform offering flight search and booking, hotel services, study abroad programs, and destination guides.

Live site: [rdgtravels.com](https://rdgtravels.com)

---

## Features

- **Flight booking** — real-time flight search powered by the Duffel API, with full booking and Paystack payment flow
- **Hotel services** — hotel listings and detail pages
- **Study abroad** — information on study abroad programs
- **Destinations** — destination guides and detail pages
- **Marketing CMS** — marketing team can edit homepage content (hero, banners) via Tina CMS at `/admin` without touching code

---

## Tech stack

| Layer | Tool |
|---|---|
| Frontend | Vanilla HTML/CSS/JS |
| Backend | Netlify Functions (Node.js 18) |
| Flight API | Duffel v2 |
| Payments | Paystack |
| CMS | Tina CMS |
| Hosting | Netlify |

---

## Project structure

```
rdgtravels/
├── public/
│   ├── assets/               # Icons and static assets
│   ├── css/
│   │   └── style.css         # Global stylesheet
│   ├── images/               # Image files
│   ├── js/                   # Frontend scripts
│   ├── index.html            # Homepage
│   ├── flight.html           # Flight search and booking widget
│   ├── search.html           # Flight results page
│   ├── booking.html          # Passenger details and payment
│   ├── confirmation.html     # Booking confirmation
│   ├── all-hotels.html       # Hotel listings
│   ├── hotel-detail1.html
│   ├── hotel-detail2.html
│   ├── hotel-service.html
│   ├── destinations.html     # Destination listings
│   ├── destination-detail1.html
│   ├── destination-detail2.html
│   ├── destination-detail3.html
│   ├── study-abroad.html
│   ├── about-us.html
│   └── contact-us.html
├── netlify/
│   └── functions/
│       ├── search.js              # Duffel flight search proxy
│       ├── select.js              # Duffel offer confirmation proxy
│       ├── book.js                # Duffel order creation proxy
│       ├── pay.js                 # Paystack transaction initializer
│       └── paystack-webhook.js   # Paystack payment confirmation
├── tina/
│   └── config.ts             # Tina CMS schema
├── content/
│   └── site-settings.json    # CMS-editable content
├── test/
│   └── test-search.js        # Duffel sandbox smoke test
├── BRIEF.md                  # Build specification
├── CLAUDE.md                 # Claude Code project context
├── netlify.toml              # Netlify build and redirect config
└── package.json
```

---

## Getting started

### Prerequisites

- Node.js 18+
- Netlify CLI (`npm install -g netlify-cli`)
- A [Duffel](https://duffel.com) account (sandbox key for development)
- A [Paystack](https://paystack.com) account (test key for development)
- A [Tina CMS](https://tina.io) account and project

### Environment variables

Create a `.env` file in the repo root (never commit this):

```
DUFFEL_API_KEY=
DUFFEL_API_VERSION=v2
PAYSTACK_SECRET_KEY=
TINA_PUBLIC_CLIENT_ID=
TINA_TOKEN=
```

### Running locally

```bash
npm install
npm run dev        # starts Tina CMS + Netlify dev server together
```

The site runs at `http://localhost:8888`. The Tina CMS admin is at `http://localhost:8888/admin`.

### Testing the Duffel connection

```bash
node test/test-search.js
```

Logs the first three flight offers for a Lagos (LOS) → London (LHR) search against the Duffel sandbox.

---

## Booking flow

```
flight.html  →  search.html  →  booking.html  →  Paystack  →  confirmation.html
(search form)   (results)       (pax + pay)       (payment)     (reference number)
```

- Search parameters are passed between pages via URL query string
- Flight summary is stored in `sessionStorage` before the Paystack redirect and retrieved on `confirmation.html`
- Paystack appends `?reference=` to the callback URL on successful payment

---

## Content management

The marketing team can edit the following without developer involvement:

- Homepage hero headline and subtext
- Promotional banner (show/hide, copy, CTA link)

Log in at `/admin` using your Tina CMS credentials. Changes commit to the repo and trigger an automatic Netlify redeploy.

---

## Deployment

The site deploys automatically to Netlify on every push to `main`.

Build command: `npm run build`
Publish directory: `public`
Functions directory: `netlify/functions`

---

## Contributing

See `BRIEF.md` for the full build specification and `CLAUDE.md` for project conventions when working with Claude Code.
