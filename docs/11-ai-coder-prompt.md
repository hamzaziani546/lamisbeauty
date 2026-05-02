# Prompt For AI Coder

Copy this prompt into the AI coding agent that will implement the project.

```text
You are building a production-ready Arabic-first DTC ecommerce store for Saudi Arabia called "لاميس للجمال / Lamis Beauty".

Read every file in the docs folder before coding:

- docs/README.md
- docs/01-brand-positioning-icp.md
- docs/02-site-architecture-cro.md
- docs/03-products-offers-copy.md
- docs/04-design-system.md
- docs/05-frontend-architecture.md
- docs/06-backend-architecture.md
- docs/07-checkout-aov-order-flow.md
- docs/08-tracking-pixels-capi.md
- docs/09-deployment-env-docker.md
- docs/10-coding-rules-acceptance.md

Deliver this repository structure:

/frontend
/backend
/scripts/google-apps-script-webhook.js
/templates/orders-sheet-columns.csv
/templates/orders-sheet-template.csv
/templates/tracking-events.csv

Frontend requirements:

- Use Next.js App Router, TypeScript, Tailwind CSS, Arabic RTL, and next/font.
- Build routes: /, /collections, /products/[slug], /about, /contact, /thank-you/[orderId], /privacy, /returns, /shipping, /terms.
- Use the brand name "لاميس للجمال" and English subtitle "Lamis Beauty".
- Header logo: circle brand mark with "ل" or "L", Arabic logo text, English subtitle, menu, cart.
- Build homepage, collection page, about, contact, legal/support pages, and full landing-style product pages.
- Products:
  1. marine-collagen-latte: لاتيه الكولاجين البحري لدعم نضارة البشرة ومظهر الخطوط
  2. rosemary-biotin-spray: بخاخ الإكليل والبيوتين لدعم مظهر الشعر وتقوية الروتين
  3. chlorophyll-gummies: علكات الكلوروفيل بدون سكر لانتعاش يومي من الداخل
- Offers for every product: 199 SAR for 1 piece, 279 SAR for 2 pieces, 349 SAR for 3 pieces.
- Every product CTA must add the selected offer to cart and open a cart drawer.
- Cart drawer must show order items, total, cross-sells, trust chips, and checkout CTA.
- Checkout modal must collect only name and KSA phone number.
- Validate KSA mobile numbers and normalize them.
- After valid checkout form click, show a 10-15 second upsell modal with one relevant product at 99 SAR. This is the only place 99 SAR appears.
- Submit final order to backend, then redirect to thank-you page.
- Add deferred Meta, TikTok, and Snapchat browser pixels. Purchase browser event must use backend returned event_id.
- Make everything responsive and mobile-first.
- Use sample placeholder images now and keep paths easy to replace later.

Backend requirements:

- Use Python FastAPI, PostgreSQL, SQLAlchemy, Alembic, Pydantic settings, HTTPX.
- Create /health and /orders endpoints.
- Database name is lamisbeauty.
- Use DATABASE_URL env. EasyPanel internal DB looks like:
  postgres://lamisbeauty:lamisbeauty@lamisbeauty_database:5432/lamisbeauty?sslmode=disable
- Create startup migration flow with Alembic.
- Store orders, order items, and tracking event logs.
- Server must recalculate totals from trusted product config. Never trust frontend prices.
- Validate and normalize phone server-side.
- Generate order_number like LB-YYYYMMDD-0001 and use it as Purchase event_id.
- Save order first, then send Google Sheet webhook, then send CAPI events.
- If Sheet or CAPI fails, keep order saved and log failure.
- Send Meta CAPI, TikTok Events API, and Snapchat CAPI only when env variables are present.
- Hash phone with SHA-256 server-side for CAPI. Do not hash IP/user-agent/cookie IDs.
- Add CORS only for https://lamisbeauty.site in production.

DevOps requirements:

- Add Dockerfile for frontend and backend.
- Add .env.example for frontend and backend with all required variables.
- Add clear README with local run, Docker run, and EasyPanel deployment steps.
- Add scripts/google-apps-script-webhook.js for Google Sheets order capture.
- Add CSV templates in /templates.

Quality requirements:

- Do not fabricate certifications, lab tests, SFDA approvals, doctor endorsements, or fake reviews.
- Use placeholders for proof/reviews/images until real assets are provided.
- Include Arabic COD, shipping, return, privacy, and support copy.
- Include supplement/results-vary disclaimers where needed.
- Add unit tests for phone normalization and backend total calculation if test setup is practical.
- Run lint/build/tests and fix issues before finishing.
```
