# لاميس للجمال — Lamis Beauty

Production-ready Arabic-first DTC ecommerce store for Saudi women.

- **Frontend**: Next.js 15, TypeScript, Tailwind CSS, RTL Arabic UI
- **Backend**: FastAPI, PostgreSQL, SQLAlchemy, Alembic, HTTPX
- **Tracking**: Meta/TikTok/Snap web pixels + server-side CAPI with SHA-256 hashed phone
- **Checkout**: COD-only, KSA phone validation, cart cross-sells, timed upsell at 99 SAR
- **Integrations**: Google Sheets webhook for order operations

---

## Repository Structure

```
/
  frontend/         Next.js storefront
  backend/          FastAPI API
  scripts/
    google-apps-script-webhook.js
  templates/
    orders-sheet-columns.csv
    orders-sheet-template.csv
    tracking-events.csv
  docs/             Full specification docs
```

---

## Local Development

### Prerequisites

- Node.js 22+
- Python 3.12+
- PostgreSQL (or Docker)

### Frontend

```bash
cd frontend
cp .env.example .env.local
# Edit .env.local with your values
npm install
npm run dev
```

Open `http://localhost:3000`

### Backend

```bash
cd backend
cp .env.example .env
# Edit .env with your DATABASE_URL and other values
python -m venv .venv
source .venv/bin/activate   # Windows: .venv\Scripts\activate
pip install -r requirements.txt
alembic upgrade head
uvicorn app.main:app --reload --port 8000
```

API available at `http://localhost:8000`

### Backend Tests

```bash
cd backend
pip install pytest
pytest tests/ -v
```

---

## Docker

### Frontend

```bash
cd frontend
docker build -t lamis-frontend .
docker run -p 3000:3000 --env-file .env.local lamis-frontend
```

### Backend

```bash
cd backend
docker build -t lamis-backend .
docker run -p 8000:8000 --env-file .env lamis-backend
```

---

## EasyPanel Deployment

### Frontend service

- Build from: `frontend/`
- Expose port: `3000`
- Domain: `lamisbeauty.site`
- Env vars: copy from `frontend/.env.example`

### Backend service

- Build from: `backend/`
- Expose port: `8000`
- Domain: `api.lamisbeauty.site`
- Env vars: copy from `backend/.env.example`
- Ensure the container can resolve `lamisbeauty_database` (EasyPanel internal DNS)

### Database

EasyPanel PostgreSQL internal URL:
```
postgres://lamisbeauty:lamisbeauty@lamisbeauty_database:5432/lamisbeauty?sslmode=disable
```

Set in backend env:
```
DATABASE_URL=postgresql+psycopg://lamisbeauty:lamisbeauty@lamisbeauty_database:5432/lamisbeauty
```

Migrations run automatically on container start via `alembic upgrade head`.

---

## Google Sheets Webhook

1. Create a Google Sheet, name first tab `Orders`
2. Add columns from `templates/orders-sheet-columns.csv`
3. Extensions → Apps Script → paste `scripts/google-apps-script-webhook.js`
4. Script Properties: set `WEBHOOK_SECRET` to match backend `GOOGLE_SHEETS_WEBHOOK_SECRET`
5. Deploy as Web App (Execute as: Me, Access: Anyone with link)
6. Copy Web App URL to backend env: `GOOGLE_SHEETS_WEBHOOK_URL`

---

## Pixel & CAPI Setup

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_META_PIXEL_ID` | Meta Pixel ID |
| `META_ACCESS_TOKEN` | Meta Conversions API token |
| `NEXT_PUBLIC_TIKTOK_PIXEL_ID` | TikTok Pixel ID |
| `TIKTOK_ACCESS_TOKEN` | TikTok Events API token |
| `NEXT_PUBLIC_SNAP_PIXEL_ID` | Snapchat Pixel ID |
| `SNAP_ACCESS_TOKEN` | Snapchat CAPI token |

All platforms are optional. The checkout flow works without any pixels configured.

**Deduplication**: Browser and server events share the same `event_id` (= order number).
**PII hashing**: Phone numbers are SHA-256 hashed server-side before sending to CAPI.

---

## Products

| ID | Arabic Name | Offers |
|---|---|---|
| `marine-collagen-latte` | لاتيه الكولاجين البحري | 199 / 279 / 349 SAR |
| `rosemary-biotin-spray` | بخاخ الإكليل والبيوتين | 199 / 279 / 349 SAR |
| `chlorophyll-gummies` | علكات الكلوروفيل | 199 / 279 / 349 SAR |

Upsell price (checkout only): **99 SAR**

---

## Launch Checklist

- [ ] DNS: `lamisbeauty.site` and `api.lamisbeauty.site` pointed to EasyPanel
- [ ] SSL active on both domains
- [ ] Frontend reaches backend API
- [ ] Backend reaches PostgreSQL
- [ ] Migrations run successfully on deploy
- [ ] Test order created, appears in DB and Google Sheet
- [ ] Browser pixels fire (Meta Pixel Helper, TikTok Events, Snap Events Manager)
- [ ] CAPI test events arrive on all platforms
- [ ] Thank-you page loads after order
- [ ] Mobile Lighthouse score 85+
- [ ] Replace sample placeholder reviews with real customer reviews
- [ ] Replace placeholder images with real product photos
- [ ] Verify SFDA/import compliance before selling ingestible products in KSA
- [ ] Set real WhatsApp number in env

---

## Compliance Notes

- No medical claims, certifications, or guaranteed results are shown on the store.
- Supplement-like products include a disclaimer that results vary and the product does not replace professional advice.
- Placeholder copy is clearly marked and must be replaced with real content before launch.
- Privacy page discloses ad pixel usage and server-side CAPI.
