# Coding Rules And Acceptance Criteria

## General Rules

- Build production-ready code, not a prototype.
- Keep Arabic RTL as the default.
- Use TypeScript in frontend.
- Use typed Pydantic schemas in backend.
- Keep product/pricing config centralized and reused.
- Never trust frontend totals; backend recalculates.
- Do not hardcode secrets.
- Do not fabricate proof, certifications, ratings, or reviews.
- Leave placeholder slots for real assets.

## Frontend Rules

- Use Next.js App Router.
- Keep server components for static content where possible.
- Mark cart, checkout, and tracking components as client components.
- Use Tailwind utility classes and shared UI primitives.
- Use accessible dialogs/drawers.
- Use `next/image`.
- Use `next/font`.
- Keep all Arabic strings easy to edit.
- Make all pages responsive.
- Test mobile first.

## Backend Rules

- Validate order payload with Pydantic.
- Normalize phone on server even if frontend already did.
- Recalculate all prices from backend product config.
- Store orders before outbound webhooks.
- Make outbound integrations fault-tolerant.
- Hash PII before CAPI.
- Add clear migration files.
- Use structured errors.

## UX Acceptance

Header:

- Logo mark and Arabic/English text visible.
- Cart count updates.
- Menu works on mobile and desktop.

Homepage:

- Hero communicates premium Saudi beauty positioning.
- Three products are visible without confusion.
- Trust signals and COD are clear.
- Product cards link to PDP and have CTA.

Product pages:

- Offer selector works.
- CTA adds selected offer and opens cart.
- Sections include emotion, benefits, ingredients, proof, FAQ.
- Sticky mobile CTA works.

Cart:

- Drawer opens after add-to-cart.
- Items and totals are correct.
- Cross-sells can be added.
- Checkout CTA opens popup.

Checkout:

- Only name and phone fields are shown.
- Invalid KSA phone is rejected.
- Valid KSA phone proceeds.
- Upsell appears for 10-15 seconds.
- Accepting upsell updates total.
- Declining upsell still creates order.
- Thank-you page loads.

Backend:

- `POST /orders` creates DB order and items.
- Order appears in Google Sheet.
- CAPI attempts are logged.
- API survives Sheet/CAPI failure after saving order.

## Tracking Acceptance

- Pixel scripts are not render-blocking.
- Browser AddToCart fires with event ID.
- Browser InitiateCheckout fires with event ID.
- Purchase fires only after backend success.
- Purchase browser `event_id` equals backend CAPI `event_id`.
- Meta, TikTok, and Snap can each be disabled by missing env values without breaking checkout.

## QA Tests

Manual tests:

- Add 1-piece collagen, checkout, decline upsell.
- Add 3-piece spray, accept gummies upsell.
- Add all three products, checkout.
- Try invalid phones: `123`, `055`, `+9715...`.
- Try valid phones: `05xxxxxxxx`, `+9665xxxxxxxx`.
- Refresh with cart items; cart persists.
- Submit order while Google Sheet webhook is unavailable; order still saves.

Automated tests where practical:

- Phone normalization unit tests.
- Backend order total calculation tests.
- Product config price tests.
- API validation tests.
- Cart store reducer tests.

## Performance Acceptance

- Mobile Lighthouse performance 85+ after images are optimized.
- No large unused UI libraries.
- Pixel loading does not block first paint.
- Product page images are optimized.
- Cart/checkout interaction feels instant.

## Legal And Trust Acceptance

- Every proof/certification block must be data-driven or clearly placeholder during development.
- Supplement-like products include results-vary disclaimer.
- COD and support policies are visible before checkout.
- Privacy page mentions ad pixels, CAPI, and order processing.
- Returns/shipping pages are clear and Arabic.
