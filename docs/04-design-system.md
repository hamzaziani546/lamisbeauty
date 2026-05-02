# Design System

## Creative Direction

The store should look premium, feminine, Saudi-local, and clean. It should not look like a marketplace or generic dropshipping theme.

Visual keywords:

- Warm luxury.
- Soft clinical trust.
- Beauty ritual.
- Premium wellness.
- Arabic-first elegance.

## Colors

Primary:

- Deep rose: `#8F3F55`
- Soft blush: `#F7E8E6`
- Warm cream: `#FFF8F1`

Secondary:

- Date brown: `#6E4B3A`
- Sage green: `#7B9277`
- Champagne gold: `#C9A45C`

Neutrals:

- Ink: `#251F20`
- Soft text: `#6F6262`
- Border: `#E8DAD6`
- White: `#FFFFFF`

Use deep rose for the logo circle, primary CTAs, selected offer border, and trust icons. Use champagne gold sparingly for premium accents and star ratings.

## Typography

Frontend should use `next/font`.

Arabic:

- Primary: `IBM Plex Sans Arabic` or `Tajawal`.
- Premium headings alternative: `Noto Kufi Arabic`.

English:

- `Inter` or use the same sans stack for simplicity.

Guidance:

- Arabic headings need strong weight but generous line-height.
- Body copy must be highly readable on mobile.
- Do not use overly decorative Arabic fonts for long copy.

## Logo/Header Treatment

Create a simple text logo until a real logo is designed:

- Circular mark: deep rose background, cream letter `ل` or `L`.
- Arabic wordmark: `لاميس للجمال`.
- English subtitle: `Lamis Beauty`.

Header should be calm and premium:

- Height: 72-88px desktop, 64px mobile.
- White/cream background.
- Subtle border.
- Cart icon clearly visible.

## Layout

Use a centered container:

- Max width: `1200px`.
- Mobile padding: `16px`.
- Tablet padding: `24px`.
- Desktop padding: `32px`.

Section spacing:

- Mobile: `48px`.
- Desktop: `80px`.

Product landing pages should use alternating image/text sections:

- Section A: Arabic text on right, image on left.
- Section B: image on right, Arabic text on left.
- Mobile: stack with image and text, preserving natural reading.

## Component Style

Buttons:

- Primary: deep rose background, cream/white text, rounded full or `16px`.
- Secondary: cream background, rose border.
- Sticky CTA: bottom fixed on mobile with selected price.

Cards:

- Rounded `24px`.
- Soft border.
- Subtle shadow.
- Cream/blush backgrounds.

Offer cards:

- Three cards.
- Highlight 3-piece card with "الأكثر اختياراً".
- Show total price and per-piece savings.
- Use selected state with deep rose border and check icon.

Trust chips:

- Small rounded pills.
- Icon + short phrase.
- Use near CTA and checkout.

## Image Placeholders

Use sample placeholders now, replace later.

Recommended placeholder types:

- Hero: premium lifestyle flat lay with products, warm cream background.
- Product card: clean product packshot on blush/cream.
- Product page image 1: main product.
- Product page image 2: ingredient/routine visual.
- Product page image 3: Saudi woman lifestyle silhouette or hands, no misleading before/after.
- Product page image 4: UGC/video thumbnail placeholder.

Implementation:

- Put local placeholders in `frontend/public/images/placeholders/`.
- Name them predictably:
  - `hero-lamis-beauty.webp`
  - `collagen-main.webp`
  - `collagen-routine.webp`
  - `spray-main.webp`
  - `spray-routine.webp`
  - `gummies-main.webp`
  - `gummies-routine.webp`

If real images are not available, use styled gradient cards with product name text rather than low-quality stock photos.

## Icons

Use `lucide-react` for:

- Shopping cart.
- Star.
- Shield check.
- Truck.
- MessageCircle.
- Clock.
- CheckCircle.
- Sparkles.

## Motion

Use light motion only:

- Cart drawer slide.
- Checkout modal fade/scale.
- Upsell countdown.
- Offer card selected state.

Avoid heavy scroll animations that hurt mobile performance.

## Accessibility

- All modals must trap focus and close with Escape.
- Buttons need clear labels.
- Images need Arabic alt text.
- Maintain contrast for rose/gold combinations.
- Do not rely on color alone to show selected offers.

## Responsive Rules

Mobile is the main conversion environment.

- Header and sticky CTA must not cover content.
- Offer selector should be single column on small screens.
- Product images should load fast and not push CTA below the fold too far.
- Cart drawer should be full-width on mobile and max `420px` on desktop.
- Checkout popup should fit on small screens without hidden CTA.
