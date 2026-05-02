# Deployment, Env, And Docker

## Target Deployment

Use EasyPanel with two services:

- Frontend: `lamisbeauty.site`
- Backend: `api.lamisbeauty.site`

PostgreSQL is already installed in EasyPanel:

```text
postgres://lamisbeauty:lamisbeauty@lamisbeauty_database:5432/lamisbeauty?sslmode=disable
```

Do not commit real credentials. Use `.env.example` only.

## Repository Structure

```text
/
  frontend/
  backend/
  scripts/
    google-apps-script-webhook.js
  docs/
  templates/
    orders-sheet-columns.csv
    orders-sheet-template.csv
    tracking-events.csv
  README.md
```

## Frontend Dockerfile

Expected behavior:

- Install dependencies.
- Build Next.js.
- Run production server on port `3000`.

Suggested Dockerfile:

```dockerfile
FROM node:22-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

FROM node:22-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
EXPOSE 3000
CMD ["npm", "start"]
```

## Backend Dockerfile

Expected behavior:

- Install Python dependencies.
- Run Alembic migrations.
- Start API on port `8000`.

Suggested Dockerfile:

```dockerfile
FROM python:3.12-slim

WORKDIR /app
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 8000
CMD ["sh", "-c", "alembic upgrade head && gunicorn app.main:app -k uvicorn.workers.UvicornWorker -b 0.0.0.0:8000"]
```

## Frontend Env

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

## Backend Env

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

## EasyPanel Notes

Frontend:

- Build from `frontend/`.
- Expose `3000`.
- Domain: `lamisbeauty.site`.
- Add env values from `frontend/.env.example`.

Backend:

- Build from `backend/`.
- Expose `8000`.
- Domain: `api.lamisbeauty.site`.
- Add env values from `backend/.env.example`.
- Ensure backend container can resolve `lamisbeauty_database`.

## CORS

Backend must allow:

- `https://lamisbeauty.site`
- Optional preview domains only during testing.

Do not allow `*` in production.

## Health Check

Backend:

```text
GET /health
```

Response:

```json
{ "status": "ok" }
```

Frontend:

- Use homepage or Next.js health endpoint if added.

## Logging

Backend logs should include:

- `order_id`
- `order_number`
- webhook status
- CAPI platform status
- error message without secrets

Do not log:

- Access tokens.
- Full raw phone number unless necessary for operations.

## Launch Checklist

- DNS points `lamisbeauty.site` and `api.lamisbeauty.site`.
- SSL active.
- Frontend can reach backend.
- Backend can reach Postgres.
- Migrations run on start.
- Google Sheet webhook responds successfully.
- Test order appears in database and sheet.
- Pixel browser events fire.
- CAPI test events arrive.
- Thank-you page loads after order.
