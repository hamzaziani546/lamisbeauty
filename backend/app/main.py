import logging
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from uvicorn.middleware.proxy_headers import ProxyHeadersMiddleware

from app.config import settings
from app.database import engine, _is_sqlite
from app.routers import health, orders, admin, track

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s %(levelname)s %(name)s: %(message)s",
)

app = FastAPI(
    title="Lamis Beauty API",
    description="Backend API for لاميس للجمال ecommerce store",
    version="1.0.0",
    docs_url="/docs" if settings.APP_ENV != "production" else None,
    redoc_url=None,
)

app.add_middleware(ProxyHeadersMiddleware, trusted_hosts=["*"])
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins_list,
    allow_credentials=True,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["*"],
)

if _is_sqlite:
    from app.database import Base
    import app.models  # noqa: F401 — ensure models are registered
    Base.metadata.create_all(bind=engine)

app.include_router(health.router)
app.include_router(orders.router)
app.include_router(track.router)
app.include_router(admin.router)
