# Checkout, AOV, And Order Flow

## Pricing Strategy

Every main product has identical quantity offers:

- 1 piece: `199 SAR`
- 2 pieces: `279 SAR`
- 3 pieces: `349 SAR`

Positioning:

- 1 piece is the entry.
- 2 pieces is continuity.
- 3 pieces is the premium recommended plan.

Do not call the 3-piece offer "cheap". Use smart, premium language:

```text
الأكثر اختياراً لروتين الشهر
أفضل قيمة للاستمرار
```

## Offer Selector

Each PDP offer selector must show:

- Quantity.
- Price.
- Badge.
- Short reason.
- Selected state.

Example:

```text
قطعة واحدة
199 ريال
ابدئي التجربة

قطعتين
279 ريال
استمرار أو مشاركة

3 قطع
349 ريال
الأكثر اختياراً
```

## Cart Cross-Sells

Cart drawer must actively raise AOV:

- Show 1-2 relevant products not already in cart.
- Use mini product cards.
- Include star rating placeholder only if tied to real reviews later.
- CTA: "أضيفيه للسلة".
- Price shown at normal offer price, not 99 SAR.

Recommended copy:

```text
كمّلي روتين لاميس
عميلات كثير يضيفون منتج ثاني عشان يكون الروتين متكامل: بشرة، شعر، وانتعاش.
```

## Checkout Modal Step 1

Title:

```text
ثبتي طلبك والدفع عند الاستلام
```

Content:

- Order summary.
- Total.
- Trust chips.
- Scarcity line.
- Fields: name and phone.

Fields:

- `name`
- `phone`

CTA:

```text
ثبتي طلبي الآن
```

Validation messages:

```text
اكتبي اسمك عشان نقدر نأكد الطلب.
اكتبي رقم جوال سعودي صحيح يبدأ بـ 05.
```

## Upsell Modal Step

Show immediately after valid checkout form CTA, before final order submit.

Duration:

- 10-15 seconds.
- Use visible countdown.
- User can accept or skip immediately.

Upsell headline:

```text
عرض خاص يظهر لك مرة واحدة
```

Body:

```text
بما أنك ثبتي طلبك، تقدري تضيفي هذا المنتج لروتينك اليوم بسعر 99 ريال.
```

Buttons:

- Accept: `أضيفيه لطلبي بـ 99 ريال`
- Decline: `لا شكراً، كملي طلبي`

Rules:

- Only one upsell item can be added.
- If customer accepts, add it to cart with `source: checkout_upsell`.
- Then submit order.
- If customer declines or countdown ends, submit without upsell.

## Order Creation Flow

Sequence:

1. User selects offer on PDP.
2. Frontend adds item to cart.
3. Cart drawer opens.
4. User optionally adds cross-sells.
5. User clicks checkout.
6. Checkout validates name/phone.
7. Upsell appears.
8. User accepts/declines.
9. Frontend sends final payload to backend.
10. Backend validates, recalculates, stores order.
11. Backend sends Google Sheet webhook.
12. Backend sends CAPI Purchase events.
13. Frontend fires browser Purchase pixels with returned `event_id`.
14. Frontend clears cart and redirects to thank-you page.

## Confirmation And Delivery Quality

Since COD can produce low confirmation/delivery rates, capture operational data:

- UTM source/campaign.
- Product and offer.
- Phone format.
- Time of order.
- User agent/device.
- Landing page.
- Upsell accepted/declined.

Add order status fields for future CRM:

- `new`
- `confirmed`
- `no_answer`
- `cancelled`
- `shipped`
- `delivered`
- `returned`

The frontend only needs to create orders. Operations can update statuses later through the sheet or a simple admin in a future phase.

## Anti-Fraud And Lead Quality

Basic protections:

- Server-side phone validation.
- Rate limit by IP and phone.
- Reject duplicate order from same phone with same cart within 10 minutes unless explicitly allowed.
- Store attribution to evaluate bad traffic sources.
- Optional hidden honeypot field in checkout form.

## AOV Targets

Implementation should make it natural to reach:

- Minimum order: `199 SAR`.
- Good order: `349 SAR`.
- High order: `349 SAR + 99 SAR upsell = 448 SAR`.
- Very high order: multiple product bundles through cart cross-sell.

## Microcopy Around Price

Use:

```text
روتين يستاهل، مو تجربة عشوائية.
```

```text
اختاري العرض اللي يناسب استخدامك، وكل الطلبات بالدفع عند الاستلام.
```

```text
الأفضل لو تبغين تعطي الروتين فرصة كافية.
```

Avoid:

- "الأرخص"
- "خصم مجنون"
- "نتائج مضمونة"
- "آخر فرصة" unless true.
