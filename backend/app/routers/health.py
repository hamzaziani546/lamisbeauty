from fastapi import APIRouter

router = APIRouter()


@router.get("/")
def root():
    return {"status": "ok", "service": "Lamis Beauty API"}


@router.get("/health")
def health_check():
    return {"status": "ok"}
