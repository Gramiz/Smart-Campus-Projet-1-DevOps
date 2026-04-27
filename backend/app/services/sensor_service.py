from datetime import datetime

from sqlalchemy.orm import Session

from app.models.sensor import Sensor, SensorType
from app.models.sensor_data import SensorData
from app.schemas.sensor import SensorCreate, SensorDataIn, SensorUpdate


def list_sensors(
    db: Session,
    room_id: int | None = None,
    sensor_type: SensorType | None = None,
) -> list[Sensor]:
    q = db.query(Sensor)
    if room_id is not None:
        q = q.filter(Sensor.room_id == room_id)
    if sensor_type is not None:
        q = q.filter(Sensor.sensor_type == sensor_type)
    return q.order_by(Sensor.id).all()


def get_sensor(db: Session, sensor_id: int) -> Sensor | None:
    return db.get(Sensor, sensor_id)


def create_sensor(db: Session, payload: SensorCreate) -> Sensor:
    sensor = Sensor(**payload.model_dump())
    db.add(sensor)
    db.commit()
    db.refresh(sensor)
    return sensor


def update_sensor(db: Session, sensor: Sensor, payload: SensorUpdate) -> Sensor:
    for k, v in payload.model_dump(exclude_unset=True).items():
        setattr(sensor, k, v)
    db.commit()
    db.refresh(sensor)
    return sensor


def delete_sensor(db: Session, sensor: Sensor) -> None:
    db.delete(sensor)
    db.commit()


def add_reading(db: Session, sensor_id: int, payload: SensorDataIn) -> SensorData:
    reading = SensorData(
        sensor_id=sensor_id,
        value=payload.value,
        **({"timestamp": payload.timestamp} if payload.timestamp else {}),
    )
    db.add(reading)
    db.commit()
    db.refresh(reading)
    return reading


def add_readings_bulk(
    db: Session, sensor_id: int, readings: list[SensorDataIn]
) -> list[SensorData]:
    objs = [
        SensorData(
            sensor_id=sensor_id,
            value=r.value,
            **({"timestamp": r.timestamp} if r.timestamp else {}),
        )
        for r in readings
    ]
    db.add_all(objs)
    db.commit()
    for o in objs:
        db.refresh(o)
    return objs


def list_readings(
    db: Session,
    sensor_id: int,
    start: datetime | None = None,
    end: datetime | None = None,
    limit: int = 1000,
) -> list[SensorData]:
    q = db.query(SensorData).filter(SensorData.sensor_id == sensor_id)
    if start is not None:
        q = q.filter(SensorData.timestamp >= start)
    if end is not None:
        q = q.filter(SensorData.timestamp <= end)
    return q.order_by(SensorData.timestamp.desc()).limit(limit).all()
