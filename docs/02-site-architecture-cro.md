# Site Architecture And CRO

## Routes

Frontend routes:

- `/`: homepage.
- `/collections`: all products and bundles.
- `/products/marine-collagen-latte`: collagen product landing page.
- `/products/rosemary-biotin-spray`: hair spray product landing page.
- `/products/chlorophyll-gummies`: chlorophyll gummies product landing page.
- `/about`: about us.
- `/contact`: contact and WhatsApp support.
- `/thank-you/[orderId]`: order confirmation.
- `/privacy`, `/returns`, `/shipping`, `/terms`: legal/support pages.

Backend routes:

- `GET /health`
- `POST /orders`
- `GET /orders/{order_id}` for thank-you page lookup if needed.
- `POST /tracking/capi/{platform}` optional internal endpoint if frontend needs to fire server events separately.

## Header

Desktop and mobile header:

- Right side: circle mark with Arabic/Latin `L` or `ل` inside brand color.
- Next to it: Arabic logo text `لاميس للجمال`, below it small `Lamis Beauty`.
- Menu: الرئيسية، المنتجات، من نحن، تواصل معنا.
- Cart icon with item count.
- Sticky on mobile after scroll.

Suggested mark:

```text
[ circle: ل ] لاميس للجمال
             Lamis Beauty
```

## Homepage Structure

1. Hero:
   - Right: Arabic headline, subheadline, trust row, CTA.
   - Left: premium sample product/lifestyle image.
   - CTA: "تسوقي روتين لاميس".
   - Trust chips: الدفع عند الاستلام، شحن داخل السعودية، دعم واتساب.

2. Authority strip:
   - "روتينات مختارة بعناية"
   - "مكونات واضحة"
   - "تجربة شراء سعودية"
   - "تقييمات موثقة"

3. Problem-to-routine block:
   - Skin glow/fine lines.
   - Hair fall/thinning.
   - Freshness/body odor confidence.

4. Product collection cards:
   - Each card has image placeholder, premium benefit headline, short subheading, stars, offer teaser, CTA.

5. Brand story:
   - Why Lamis curates beauty routines for Saudi women.
   - Premium, warm, local, clear support.

6. Social proof:
   - Review cards with Arabic names, city, product, and verified badge.
   - Placeholder until real reviews exist.

7. Ingredient education:
   - Collagen, rosemary, biotin, chlorophyll.
   - Simple explanations, not medical claims.

8. UGC/video section:
   - 3-6 short video placeholders for TikTok/Snap style content.

9. Offer section:
   - Bundle logic: one piece, two pieces, three pieces.
   - Position as "وفري أكثر مع روتين الشهر".

10. FAQ:
   - COD, delivery, usage, results variation, safety, support.

11. Final CTA:
   - "اختاري روتينك اليوم".

## Collection Page

Purpose: help a visitor choose quickly.

Layout:

- Top intro: "اختاري المنتج الأقرب لاحتياجك اليوم".
- Filter chips: البشرة، الشعر، الانتعاش، الأكثر طلباً.
- Three product cards.
- Comparison table-like cards, not a dense table on mobile.
- Bundle prompt: "كل منتج له عروض 1/2/3 قطع".
- Social proof strip.

## Product Landing Page Structure

Each product page must be a full landing page, not a simple PDP.

1. Above the fold:
   - Product image placeholder.
   - Headline tied to pain and desired identity.
   - Rating summary.
   - 3 benefit bullets.
   - Offer selector: 1, 2, 3 pieces.
   - CTA: add selected offer to cart and open cart.
   - Trust chips and COD note.

2. Emotional problem section:
   - Show the daily moment the customer wants to avoid.

3. Product mechanism:
   - Explain how the ingredients support the desired outcome.

4. Routine section:
   - When to use, how often, what to expect.

5. Proof section:
   - Ingredient references in simple language.
   - Real certificates/files when available.
   - Review/UGC placeholders until real proof exists.

6. Alternating content sections:
   - Desktop: text right/image left, then image right/text left.
   - Mobile: image first only when it helps comprehension, otherwise text first.

7. Offer stack:
   - 1 piece: 199 SAR.
   - 2 pieces: 279 SAR.
   - 3 pieces: 349 SAR.
   - Highlight 3 pieces as best value.

8. FAQ and objections:
   - Delivery, COD, use, results, suitability, returns.

9. Sticky mobile CTA:
   - Shows selected offer price and add-to-cart.

## Cart Drawer

Cart drawer opens after every product CTA.

Must include:

- Order items and selected offers.
- Progress bar: "أضيفي منتج واحد واحصلي على عرض خاص في الخطوة التالية".
- Cross-sells from other two products.
- Cross-sell cards with mini CTA "أضيفيه للسلة".
- Trust row: COD, KSA delivery, WhatsApp.
- Checkout CTA: "إتمام الطلب والدفع عند الاستلام".

## Checkout Popup

Triggered from cart CTA.

Step 1 fields:

- Full name.
- KSA mobile number.

No address at launch unless needed operationally. If shipping needs address later, add it as optional second phase. The user's requested scope is two fields only.

Step 1 validation:

- Name minimum 2 Arabic/English words or at least 3 characters.
- Phone accepts KSA mobile formats only.
- Normalize to E.164 before submit.

Step 2 upsell:

- Show for 10-15 seconds after valid submit click.
- Offer one relevant product at 99 SAR.
- Buttons: "أضيفي العرض بـ 99 ريال" and "لا شكراً، كملي طلبي".
- Countdown creates urgency without blocking order completion.

Step 3 submit:

- Create order in backend.
- Fire Purchase browser pixel with backend returned `event_id`.
- Backend sends CAPI Purchase and Google Sheet webhook.
- Redirect to thank-you page.

## Thank You Page

Must reinforce COD confirmation:

- "تم استلام طلبك".
- Order number.
- Summary and total.
- "سيتواصل معك فريق التأكيد قبل الشحن".
- WhatsApp support link.
- Cross-sell soft prompt only if operationally useful; do not distract from confirmation.

## CRO Rules

- Put trust signals close to price and CTA.
- Use sticky CTA on mobile.
- Use specific Saudi proof, not generic "customers love us".
- Repeat COD and local delivery where anxiety appears.
- Keep checkout short.
- Use price anchoring: make 1 piece feel normal, 3 pieces feel smart.
- Use product routines and identity language to justify premium pricing.
- Never hide delivery or return information.
