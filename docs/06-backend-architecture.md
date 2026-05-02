# Backend Architecture

## Stack

Use:

- Python 3.12+
- FastAPI
- Uvicorn/Gunicorn
- SQLAlchemy 2.x async or sync, but keep it consistent.
- Alembic for migrations.
- PostgreSQL.
- Pydantic settings for env.
- HTTPX for outbound webhooks and CAPI calls.

## Folder Structure

```text
backend/
  app/
    main.py
    config.py
    database.py
    models.py
    schemas.py
    migrations.py
    routers/
      health.py
      orders.py
    services/
      orders.py
      sheets.py
      tracking/
        meta.py
        tiktok.py
        snapchat.py
      hashing.py
      phone.py
    utils/
  alembic/
  alembic.ini
  requirements.txt
  Dockerfile
  docker-compose.yml
  .env.example
```

## Database

Database name: `lamisbeauty`.

Internal EasyPanel database URL example:

```text
postgres://lamisbeauty:lamisbeauty@lamisbeauty_database:5432/lamisbeauty?sslmode=disable
```

Use env variable:

```env
DATABASE_URL=postgresql+psycopg://lamisbeauty:lamisbeauty@lamisbeauty_database:5432/lamisbeauty
```

If using async SQLAlchemy:

```env
DATABASE_URL=postgresql+asyncpg://lamisbeauty:lamisbeauty@lamisbeauty_database:5432/lamisbeauty
```

## Startup Migrations

Backend must run migrations on container start before serving traffic.

Recommended:

- Docker command: `alembic upgrade head && gunicorn ...`
- Or application startup hook calls a migration runner.

Prefer Docker command because failed migrations should fail deployment visibly.

## Data Model

Tables:

### orders

- `id` UUID primary key.
- `order_number` human-readable unique string, e.g. `LB-20260501-0001`.
- `customer_name`.
- `phone_e164`.
- `phone_digits`.
- `status`: `new`, `sent_to_sheet`, `sheet_failed`, `confirmed`, `cancelled`.
- `subtotal_sar`.
- `discount_sar`.
- `total_sar`.
- `currency`: default `SAR`.
- `payment_method`: default `cod`.
- `event_id`.
- `landing_page`.
- `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term`.
- `fbp`, `fbc`, `ttp`, `ttclid`, `sc_click_id` if available.
- `client_ip`.
- `user_agent`.
- `sheet_response`.
- `tracking_response`.
- `created_at`, `updated_at`.

### order_items

- `id` UUID primary key.
- `order_id` FK.
- `product_id`.
- `product_name_ar`.
- `offer_id`.
- `quantity`.
- `unit_count`.
- `source`: `pdp`, `cart_cross_sell`, `checkout_upsell`.
- `price_sar`.
- `created_at`.

### tracking_events

- `id` UUID primary key.
- `order_id` nullable FK.
- `platform`: `meta`, `tiktok`, `snapchat`.
- `event_name`.
- `event_id`.
- `payload_json`.
- `response_json`.
- `status_code`.
- `success`.
- `created_at`.

## API Contracts

### POST /orders

Request:

```json
{
  "customer": {
    "name": "سارة محمد",
    "phone": "+9665xxxxxxxx"
  },
  "items": [
    {
      "product_id": "marine-collagen-latte",
      "product_name_ar": "لاتيه الكولاجين البحري",
      "offer_id": "three",
      "quantity": 1,
      "unit_count": 3,
      "price_sar": 349,
      "source": "pdp"
    }
  ],
  "attribution": {
    "landing_page": "https://lamisbeauty.site/products/marine-collagen-latte",
    "utm_source": "tiktok",
    "utm_medium": "paid",
    "utm_campaign": "collagen_ksa",
    "fbp": "",
    "fbc": "",
    "ttp": "",
    "ttclid": "",
    "sc_click_id": ""
  }
}
```

Response:

```json
{
  "order_id": "uuid",
  "order_number": "LB-20260501-0001",
  "event_id": "LB-20260501-0001",
  "total_sar": 349,
  "currency": "SAR"
}
```

Rules:

- Server recalculates totals from trusted product config, not frontend totals.
- Reject unknown product IDs or invalid prices.
- Normalize and validate phone server-side again.
- Generate `order_number` and use it as `event_id` for Purchase.
- Save order first, then send Google Sheet webhook, then CAPI events.
- If Sheets/CAPI fail, order still remains saved with failure status for retry.

## Google Sheet Webhook

Backend sends finalized order to `GOOGLE_SHEETS_WEBHOOK_URL`.

Use HTTP POST JSON. Include all order fields, items, totals, attribution, and tracking IDs.

Retry:

- 2 attempts with short timeout.
- Log failure in `orders.sheet_response`.
- Do not block customer thank-you page if the sheet fails after order save.

## CAPI Events

Backend sends Purchase events to enabled platforms only if env variables exist.

PII hashing:

- Normalize phone first.
- Hash with SHA-256 lowercase hex.
- Never send unhashed phone to CAPI.
- Do not hash IP, user agent, cookie IDs, click IDs.

## Backend Env Example

Create `backend/.env.example`:

```env
APP_ENV=production
APP_HOST=0.0.0.0
APP_PORT=8000
PUBLIC_SITE_URL=https://lamisbeauty.site
PUBLIC_API_URL=https://api.lamisbeauty.site

DATABASE_URL=postgresql+psycopg://lamisbeauty:lamisbeauty@lamisbeauty_database:5432/lamisbeauty

GOOGLE_SHEETS_WEBHOOK_URL=
GOOGLE_SHEETS_WEBHOOK_SECRET=

META_PIXEL_ID=
META_ACCESS_TOKEN=
META_TEST_EVENT_CODE=

TIKTOK_PIXEL_ID=
TIKTOK_ACCESS_TOKEN=
TIKTOK_TEST_EVENT_CODE=

SNAP_PIXEL_ID=
SNAP_ACCESS_TOKEN=

CORS_ORIGINS=https://lamisbeauty.site
```

## Security

- Restrict CORS to frontend domain.
- Do not expose CAPI tokens to frontend.
- Rate limit `POST /orders` by IP/phone.
- Store raw customer phone only for order operations; hash only for ad platforms.
- Validate and sanitize all text fields.
- Add structured logs without leaking tokens.
