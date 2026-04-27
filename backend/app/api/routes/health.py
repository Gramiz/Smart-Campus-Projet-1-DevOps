from fastapi import APIRouter, Depends
from sqlalchemy import text
from sqlalchemy.orm import Session

from app.core.database import get_db

router = APIRouter()


@router.get("/health", summary="Liveness probe")
def health() -> dict:
    return {"status": "ok"}


@router.get("/ready", summary="Readiness probe (DB check)")
def ready(db: Session = Depends(get_db)) -> dict:
    try:
        db.execute(text("SELECT 1"))
        return {"status": "ready", "db": "up"}
    except Exception as exc:  # pragma: no cover
        return {"status": "degraded", "db": "down", "error": str(exc)}
