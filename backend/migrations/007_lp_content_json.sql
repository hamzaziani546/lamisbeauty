-- Landing page visual builder content (Puck JSON)
--   psql "$DATABASE_URL" -f backend/migrations/007_lp_content_json.sql

ALTER TABLE landing_pages ADD COLUMN IF NOT EXISTS content_json TEXT NOT NULL DEFAULT '';
