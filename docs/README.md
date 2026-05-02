# Lamis Beauty Store Docs

This documentation pack is the source of truth for building `lamisbeauty.site`, a premium Arabic-first DTC beauty and wellness store for Saudi women.

The build must produce:

- `frontend/`: Next.js storefront, RTL Arabic-first UI, deferred web pixels, cart drawer, checkout popup, upsell, thank-you page.
- `backend/`: FastAPI API, PostgreSQL persistence, startup migrations, order webhook relay, CAPI integrations, Docker deployment.
- `scripts/google-apps-script-webhook.js`: Google Sheet Apps Script endpoint to receive finalized orders.
- CSV templates for the Google Sheet and implementation QA.

## Recommended Reading Order

1. `01-brand-positioning-icp.md`
2. `02-site-architecture-cro.md`
3. `03-products-offers-copy.md`
4. `04-design-system.md`
5. `05-frontend-architecture.md`
6. `06-backend-architecture.md`
7. `07-checkout-aov-order-flow.md`
8. `08-tracking-pixels-capi.md`
9. `09-deployment-env-docker.md`
10. `10-coding-rules-acceptance.md`
11. `11-ai-coder-prompt.md`
12. `12-google-sheets-webhook.md`

## Non-Negotiables

- Arabic is the primary language. Direction is RTL across all storefront pages.
- Market is Saudi Arabia. Phone validation must normalize KSA mobile numbers.
- Payment method is cash on delivery only at launch.
- Premium pricing is supported by brand authority, product education, proof, visual polish, and offer architecture.
- Do not fabricate certifications, lab tests, approvals, doctor endorsements, or reviews. Use placeholders and admin data fields until real proof is provided.
- Web pixels must be deferred for speed. CAPI events must hash PII server-side.
- Browser and server events must share the same `event_id` for deduplication.
- Every product page CTA adds the selected offer to cart and opens the cart drawer.
- Cart drawer must show cross-sells and a checkout CTA.
- Checkout popup collects only name and phone, then shows a timed 10-15 second upsell before final submission.
- Final order must be saved in Postgres and sent to Google Sheets via webhook.

## Brand Defaults

- Arabic brand: `لاميس للجمال`
- English brand: `Lamis Beauty`
- Domain: `https://lamisbeauty.site`
- API domain: `https://api.lamisbeauty.site`
- Database name: `lamisbeauty`
- Internal database URL:

```text
postgres://lamisbeauty:lamisbeauty@lamisbeauty_database:5432/lamisbeauty?sslmode=disable
```

Use environment variables instead of hardcoding credentials.
