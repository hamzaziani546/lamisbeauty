# Tracking, Web Pixels, And CAPI

## Goals

Implement redundant browser + server tracking for:

- Meta Pixel + Meta Conversions API.
- TikTok Pixel + TikTok Events API.
- Snapchat Pixel + Snapchat Conversions API.

Rules:

- Web pixels are deferred for speed.
- Server-side CAPI sends hashed phone only after order submit.
- Use the same `event_id` in browser and server Purchase events for deduplication.
- Keep all tokens server-side.
- Do not send raw PII to browser pixel events.

## Event Names

Use these canonical storefront events:

- Page view.
- View content.
- Add to cart.
- Initiate checkout.
- Purchase.

Platform mapping:

| Store event | Meta | TikTok | Snapchat |
| --- | --- | --- | --- |
| Page view | `PageView` | `PageView` | `PAGE_VIEW` |
| View content | `ViewContent` | `ViewContent` | `VIEW_CONTENT` |
| Add to cart | `AddToCart` | `AddToCart` | `ADD_CART` |
| Initiate checkout | `InitiateCheckout` | `InitiateCheckout` | `START_CHECKOUT` |
| Purchase | `Purchase` | `CompletePayment` | `PURCHASE` |

## Event ID Strategy

For non-purchase events:

- Generate frontend event ID like `vc_${timestamp}_${random}`.
- Store briefly if needed.

For Purchase:

- Backend generates order number, e.g. `LB-20260501-0001`.
- Backend returns `event_id` equal to order number.
- Frontend browser pixels use that exact `event_id`.
- Backend CAPI uses that exact `event_id`.

## Phone Normalization

Input examples:

- `05xxxxxxxx`
- `5xxxxxxxx`
- `9665xxxxxxxx`
- `+9665xxxxxxxx`
- `009665xxxxxxxx`

Normalize:

- `phone_e164`: `+9665xxxxxxxx`
- `phone_digits`: `9665xxxxxxxx`

Hashing:

- SHA-256 lowercase hex.
- Hash server-side only.

Platform notes:

- Meta: `ph` should be digits with country code, no `+`, then SHA-256.
- Snapchat: `ph` should be digits with country code, no `+`, then SHA-256.
- TikTok: use E.164-style normalization for phone matching; store `+9665xxxxxxxx`, then hash the normalized value consistently. If TikTok test events reject the plus-hashed value, hash digits-only and document the result. Keep one normalization strategy across all TikTok events.

## Browser Pixel Loading

Use a `TrackingProvider` client component loaded in `app/layout.tsx`.

Requirements:

- Use Next.js `Script` with `afterInteractive`.
- Initialize only when pixel ID env exists.
- Guard against duplicate init.
- Expose helper functions:
  - `trackPageView()`
  - `trackViewContent(product, eventId)`
  - `trackAddToCart(item, eventId)`
  - `trackInitiateCheckout(cart, eventId)`
  - `trackPurchase(order, eventId)`

## Meta Pixel

Browser:

```js
fbq('track', 'Purchase', {
  value: 349,
  currency: 'SAR',
  content_ids: ['marine-collagen-latte'],
  content_type: 'product'
}, { eventID: 'LB-20260501-0001' });
```

CAPI endpoint:

```text
POST https://graph.facebook.com/v25.0/{META_PIXEL_ID}/events?access_token={META_ACCESS_TOKEN}
```

Server payload:

```json
{
  "data": [
    {
      "event_name": "Purchase",
      "event_time": 1762902353,
      "event_id": "LB-20260501-0001",
      "event_source_url": "https://lamisbeauty.site/thank-you/LB-20260501-0001",
      "action_source": "website",
      "user_data": {
        "ph": ["sha256_phone_digits"],
        "external_id": ["sha256_order_or_customer_id"],
        "fbp": "fb.1.xxx",
        "fbc": "fb.1.xxx",
        "client_ip_address": "203.0.113.10",
        "client_user_agent": "Mozilla/5.0"
      },
      "custom_data": {
        "value": 349,
        "currency": "SAR",
        "content_ids": ["marine-collagen-latte"],
        "content_type": "product",
        "contents": [
          { "id": "marine-collagen-latte", "quantity": 3, "delivery_category": "home_delivery" }
        ]
      }
    }
  ]
}
```

Meta dedup:

- Browser `eventID` must match server `event_id`.
- Event name must match.
- Meta recommends event ID deduplication within 48 hours.

## TikTok Pixel And Events API

Browser purchase example:

```js
ttq.track('CompletePayment', {
  contents: [{ content_id: 'marine-collagen-latte', quantity: 3, price: 349 }],
  content_type: 'product',
  value: 349,
  currency: 'SAR'
}, { event_id: 'LB-20260501-0001' });
```

Events API endpoint:

```text
POST https://business-api.tiktok.com/open_api/v1.3/event/track/
```

Headers:

```text
Access-Token: {TIKTOK_ACCESS_TOKEN}
Content-Type: application/json
```

Server payload:

```json
{
  "event_source": "web",
  "event_source_id": "TIKTOK_PIXEL_ID",
  "data": [
    {
      "event": "CompletePayment",
      "event_time": 1762902353,
      "event_id": "LB-20260501-0001",
      "user": {
        "phone": "sha256_phone",
        "external_id": "sha256_order_or_customer_id",
        "ttp": "_ttp_cookie_value",
        "ttclid": "ttclid_value",
        "ip": "203.0.113.10",
        "user_agent": "Mozilla/5.0"
      },
      "page": {
        "url": "https://lamisbeauty.site/thank-you/LB-20260501-0001"
      },
      "properties": {
        "contents": [
          { "content_id": "marine-collagen-latte", "quantity": 3, "price": 349 }
        ],
        "content_type": "product",
        "value": 349,
        "currency": "SAR"
      }
    }
  ]
}
```

TikTok dedup:

- `event_id` must be shared between Pixel and Events API.
- TikTok deduplicates overlapping events with identical event and event ID within its deduplication window.
- Test with TikTok Events Manager.

## Snapchat Pixel And Conversions API

Browser purchase example:

```js
snaptr('track', 'PURCHASE', {
  price: 349,
  currency: 'SAR',
  item_ids: ['marine-collagen-latte'],
  number_items: 3,
  transaction_id: 'LB-20260501-0001',
  client_dedup_id: 'LB-20260501-0001'
});
```

CAPI endpoint:

```text
POST https://tr.snapchat.com/v3/{SNAP_PIXEL_ID}/events?access_token={SNAP_ACCESS_TOKEN}
```

Server payload:

```json
{
  "data": [
    {
      "event_name": "PURCHASE",
      "event_time": 1762902353,
      "event_id": "LB-20260501-0001",
      "action_source": "web",
      "event_source_url": "https://lamisbeauty.site/thank-you/LB-20260501-0001",
      "user_data": {
        "ph": ["sha256_phone_digits"],
        "client_ip_address": "203.0.113.10",
        "client_user_agent": "Mozilla/5.0"
      },
      "custom_data": {
        "value": "349",
        "currency": "SAR",
        "item_ids": ["marine-collagen-latte"],
        "number_items": 3
      }
    }
  ]
}
```

Snap dedup:

- Send `event_id` server-side.
- For Snap Pixel, use matching `client_dedup_id` and/or transaction ID for purchase.
- Keep timestamps accurate.

## Attribution Capture

Frontend should store these in cookies/localStorage on first visit:

- `utm_source`
- `utm_medium`
- `utm_campaign`
- `utm_content`
- `utm_term`
- `fbclid`
- `ttclid`
- `ScCid` or Snapchat click ID if available
- `_fbp`
- `_fbc`
- `_ttp`

Send them with the order payload.

## QA Checklist

- Meta Pixel Helper sees browser events.
- Meta Test Events sees CAPI Purchase.
- Meta dedup status shows matching event ID.
- TikTok Events Manager sees Pixel and Events API.
- TikTok test confirms `CompletePayment` value/currency and dedup.
- Snap Events Manager sees Pixel and CAPI.
- Purchase value is numeric and currency is `SAR`.
- Browser Purchase fires only after backend order success.
- Server CAPI does not fail the customer order if ad platform is down.
