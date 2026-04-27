from datetime import datetime, timedelta

from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session

from app.api.deps import require_staff
from app.core.database import get_db
from app.schemas.analytics import (
    ForecastPointOut,
    GhostRoomOut,
    PeakHourOut,
    RoomOccupancyOut,
    SensorAnomalyOut,
)
from app.services import analytics_service

router = APIRouter(dependencies=[Depends(require_staff)])


def _default_window(days: int = 7) -> tuple[datetime, datetime]:
    end = datetime.utcnow()
    return end - timedelta(days=days), end


@router.get("/occupancy", response_model=list[RoomOccupancyOut])
def occupancy(
    start: datetime | None = None,
    end: datetime | None = None,
    db: Session = Depends(get_db),
):
    if start is None or end is None:
        start, end = _default_window()
    return analytics_service.room_occupancy(db, start, end)


@router.get("/peak-hours", response_model=list[PeakHourOut])
def peak_hours(
    start: datetime | None = None,
    end: datetime | None = None,
    db: Session = Depends(get_db),
):
    if start is None or end is None:
        start, end = _default_window(30)
    return analytics_service.peak_hours(db, start, end)


@router.get("/ghost-rooms", response_model=list[GhostRoomOut])
def ghost_rooms(
    start: datetime | None = None,
    end: datetime | None = None,
    occupancy_threshold: float = Query(default=0.2, ge=0.0, le=1.0),
    db: Session = Depends(get_db),
):
    if start is None or end is None:
        start, end = _default_window(30)
    return analytics_service.ghost_rooms(
        db, start, end, occupancy_threshold=occupancy_threshold
    )


@router.get("/anomalies", response_model=list[SensorAnomalyOut])
def anomalies(
    start: datetime | None = None,
    end: datetime | None = None,
    z_threshold: float = Query(default=3.0, ge=1.0, le=10.0),
    db: Session = Depends(get_db),
):
    if start is None or end is None:
        start, end = _default_window(7)
    return analytics_service.sensor_anomalies(db, start, end, z_threshold=z_threshold)


@router.get("/forecast", response_model=list[ForecastPointOut])
def forecast(
    lookback_days: int = Query(default=14, ge=1, le=365), db: Session = Depends(get_db)
):
    return analytics_service.hourly_forecast(db, lookback_days=lookback_days)
