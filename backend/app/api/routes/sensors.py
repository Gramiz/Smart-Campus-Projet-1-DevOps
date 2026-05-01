from datetime import datetime

from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session

from app.api.deps import get_current_user, require_staff
from app.core.database import get_db
from app.models.sensor import Sensor, SensorType
from app.schemas.sensor import (
    SensorCreate,
    SensorDataBulkIn,
    SensorDataIn,
    SensorDataOut,
    SensorOut,
    SensorUpdate,
)
from app.services import sensor_service

router = APIRouter()


@router.get("", response_model=list[SensorOut])
def list_sensors(
    room_id: int | None = None,
    sensor_type: SensorType | None = None,
    db: Session = Depends(get_db),
    _=Depends(get_current_user),
) -> list[Sensor]:
    return sensor_service.list_sensors(db, room_id=room_id, sensor_type=sensor_type)


@router.post(
    "",
    response_model=SensorOut,
    status_code=status.HTTP_201_CREATED,
    dependencies=[Depends(require_staff)],
)
def create_sensor(payload: SensorCreate, db: Session = Depends(get_db)) -> Sensor:
    return sensor_service.create_sensor(db, payload)


@router.get("/{sensor_id}", response_model=SensorOut)
def get_sensor(
    sensor_id: int, db: Session = Depends(get_db), _=Depends(get_current_user)
) -> Sensor:
    sensor = sensor_service.get_sensor(db, sensor_id)
    if not sensor:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="sensor not found")
    return sensor


@router.patch(
    "/{sensor_id}", response_model=SensorOut, dependencies=[Depends(require_staff)]
)
def update_sensor(
    sensor_id: int, payload: SensorUpdate, db: Session = Depends(get_db)
) -> Sensor:
    sensor = sensor_service.get_sensor(db, sensor_id)
    if not sensor:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="sensor not found")
    return sensor_service.update_sensor(db, sensor, payload)


@router.delete(
    "/{sensor_id}",
    status_code=status.HTTP_204_NO_CONTENT,
    dependencies=[Depends(require_staff)],
)
def delete_sensor(sensor_id: int, db: Session = Depends(get_db)) -> None:
    sensor = sensor_service.get_sensor(db, sensor_id)
    if not sensor:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="sensor not found")
    sensor_service.delete_sensor(db, sensor)


@router.get("/{sensor_id}/data", response_model=list[SensorDataOut])
def get_sensor_data(
    sensor_id: int,
    start: datetime | None = None,
    end: datetime | None = None,
    limit: int = Query(default=1000, ge=1, le=10_000),
    db: Session = Depends(get_db),
    _=Depends(get_current_user),
):
    if not sensor_service.get_sensor(db, sensor_id):
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="sensor not found")
    return sensor_service.list_readings(db, sensor_id, start=start, end=end, limit=limit)


@router.post(
    "/{sensor_id}/data",
    response_model=SensorDataOut,
    status_code=status.HTTP_201_CREATED,
    dependencies=[Depends(require_staff)],
)
def post_sensor_reading(
    sensor_id: int, payload: SensorDataIn, db: Session = Depends(get_db)
) -> SensorDataOut:
    if not sensor_service.get_sensor(db, sensor_id):
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="sensor not found")
    return sensor_service.add_reading(db, sensor_id, payload)


@router.post(
    "/{sensor_id}/data/bulk",
    response_model=list[SensorDataOut],
    status_code=status.HTTP_201_CREATED,
    dependencies=[Depends(require_staff)],
)
def post_sensor_readings_bulk(
    sensor_id: int, payload: SensorDataBulkIn, db: Session = Depends(get_db)
):
    if not sensor_service.get_sensor(db, sensor_id):
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="sensor not found")
    return sensor_service.add_readings_bulk(db, sensor_id, payload.readings)
