# Frontend Architecture

## Stack

Use:

- Next.js App Router with TypeScript.
- React Server Components where useful, client components for cart/checkout.
- Tailwind CSS for styling.
- `next/font` for Arabic/English fonts.
- `react-hook-form` + `zod` for checkout validation.
- `zustand` for cart state.
- `@tanstack/react-query` for API mutations.
- `lucide-react` for icons.
- Radix UI primitives for dialog/drawer accessibility, or `shadcn/ui` if the project adopts it cleanly.

Do not add a heavy UI theme that fights the custom design.

## Folder Structure

```text
frontend/
  app/
    layout.tsx
    page.tsx
    collections/page.tsx
    products/[slug]/page.tsx
    about/page.tsx
    contact/page.tsx
    thank-you/[orderId]/page.tsx
    privacy/page.tsx
    returns/page.tsx
    shipping/page.tsx
    terms/page.tsx
  components/
    layout/
    product/
    cart/
    checkout/
    tracking/
    ui/
  config/
    products.ts
    brand.ts
    site.ts
  lib/
    api.ts
    phone.ts
    money.ts
    tracking/
  store/
    cart-store.ts
  public/
    images/placeholders/
  Dockerfile
  docker-compose.yml
  .env.example
```

## Product Config

Keep product data in `config/products.ts` so homepage, collection, cart, upsell, and PDPs share one source.

Each product:

- `id`
- `slug`
- `nameAr`
- `shortNameAr`
- `heroHeadline`
- `subheadline`
- `benefits`
- `ingredients`
- `usage`
- `warnings`
- `images`
- `offers`
- `crossSellPriority`

Offer shape:

```ts
type ProductOffer = {
  id: "one" | "two" | "three";
  quantity: 1 | 2 | 3;
  labelAr: string;
  priceSar: 199 | 279 | 349;
  badgeAr?: string;
};
```

## Cart State

Cart item shape:

```ts
type CartItem = {
  productId: string;
  offerId: "one" | "two" | "three" | "upsell";
  quantity: number;
  unitCount: number;
  titleAr: string;
  priceSar: number;
  source: "pdp" | "cart_cross_sell" | "checkout_upsell";
};
```

Rules:

- Adding the same product/offer should update that item, not duplicate confusing rows.
- Adding an upsell should use `offerId: "upsell"` and price `99`.
- Persist cart in `localStorage` to survive refresh.
- Clear cart only after successful order creation.

## CTA Behavior

On every product page:

1. User selects offer.
2. Clicks CTA.
3. Item is added to cart.
4. Cart drawer opens immediately.
5. Cart drawer shows cross-sells.

CTA should never navigate away from the product page before the cart opens.

## Checkout Flow

Checkout is a modal launched from the cart drawer.

Step 1:

- Show order summary.
- Show trust row and scarcity message.
- Collect name and phone.
- Validate client-side with Zod.

Step 2:

- If valid, show 10-15 second upsell.
- Do not create the order before the user accepts or declines the upsell.
- If timer ends, allow "كملي طلبي" clearly.

Step 3:

- Submit final cart to backend `POST /orders`.
- Backend returns `order_id`, `event_id`, `total_sar`.
- Fire browser Purchase pixels with the same `event_id`.
- Redirect to `/thank-you/{order_id}`.

## KSA Phone Validation

Accepted input examples:

- `05xxxxxxxx`
- `5xxxxxxxx`
- `9665xxxxxxxx`
- `+9665xxxxxxxx`
- `009665xxxxxxxx`

Normalize to:

- E.164 for storage/display: `+9665xxxxxxxx`
- Digits for Meta/Snap hashing server-side: `9665xxxxxxxx`

Reject:

- Landline numbers.
- Non-KSA country codes.
- Too short/long numbers.
- Mobile numbers not starting with `5` after country code.

## Tracking Loading Strategy

Web pixels must be deferred:

- Use Next.js `Script` with `strategy="afterInteractive"` or lazy load after consent/interaction if adding consent later.
- Do not block rendering with pixel scripts.
- Keep all pixel IDs in env variables.
- Generate event IDs in frontend for pre-purchase events.
- For Purchase, backend order creation returns canonical `event_id`.

Suggested browser events:

- `PageView`
- `ViewContent`
- `AddToCart`
- `InitiateCheckout`
- `Purchase`

Use matching `event_id` for any event also sent server-side.

## SEO And Metadata

Arabic metadata:

- Homepage title: `لاميس للجمال | Lamis Beauty`
- Description: premium Arabic beauty and wellness routines for Saudi women.
- Product pages: include product name and primary benefit.
- Add Open Graph images using placeholders.

Use JSON-LD:

- Organization.
- Product.
- Breadcrumb.

Only include aggregate ratings if real review data exists.

## Performance

- Use `next/image`.
- Prefer `.webp` images.
- Keep first-party JS small.
- Dynamically import cart/checkout if needed.
- Avoid rendering all product page heavy sections before critical content if performance suffers.
- Lighthouse mobile target: performance 85+, accessibility 90+, SEO 90+.

## Frontend Env Example

Create `frontend/.env.example`:

```env
NEXT_PUBLIC_SITE_URL=https://lamisbeauty.site
NEXT_PUBLIC_API_URL=https://api.lamisbeauty.site

NEXT_PUBLIC_META_PIXEL_ID=
NEXT_PUBLIC_TIKTOK_PIXEL_ID=
NEXT_PUBLIC_SNAP_PIXEL_ID=

NEXT_PUBLIC_WHATSAPP_NUMBER=
NEXT_PUBLIC_SUPPORT_EMAIL=
```
