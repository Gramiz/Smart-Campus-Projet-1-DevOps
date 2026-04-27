"""Analytics for the Data team.

Three required analyses provided here:
- Room occupancy (theoretical via bookings + actual via sensors)
- Peak hours of bookings
- Ghost rooms detection (booked but empty per sensors)
- Plus: anomaly detection on sensor data (z-score)
- Plus: simple forecasting (next-day hourly average) for predictive frequentation
"""
from datetime import datetime, timedelta
from statistics import mean, stdev

from sqlalchemy import func, literal_column
from sqlalchemy.orm import Session

from app.models.booking import Booking, BookingStatus
from app.models.room import Room
from app.models.sensor import Sensor, SensorType
from app.models.sensor_data import SensorData


def _occupancy_avg_for_room(
    db: Session, room_id: int, start: datetime, end: datetime
) -> float | None:
    avg = (
        db.query(func.avg(SensorData.value))
        .join(Sensor, Sensor.id == SensorData.sensor_id)
        .filter(
            Sensor.room_id == room_id,
            Sensor.sensor_type == SensorType.occupancy,
            SensorData.timestamp >= start,
            SensorData.timestamp <= end,
        )
        .scalar()
    )
    return float(avg) if avg is not None else None


def room_occupancy(
    db: Session, start: datetime, end: datetime
) -> list[dict]:
    minute_diff = func.timestampdiff(
        literal_column("MINUTE"), Booking.start_time, Booking.end_time
    )
    rows = (
        db.query(
            Room.id,
            Room.room_number,
            Room.capacity,
            func.count(Booking.id).label("bookings_count"),
            func.coalesce(func.sum(minute_diff), 0).label("booked_minutes"),
        )
        .outerjoin(
            Booking,
            (Booking.room_id == Room.id)
            & (Booking.status != BookingStatus.cancelled)
            & (Booking.start_time >= start)
            & (Booking.end_time <= end),
        )
        .group_by(Room.id, Room.room_number, Room.capacity)
        .all()
    )
    out = []
    for r in rows:
        out.append(
            {
                "room_id": r.id,
                "room_number": r.room_number,
                "capacity": r.capacity,
                "bookings_count": int(r.bookings_count),
                "booked_minutes": int(r.booked_minutes or 0),
                "avg_occupancy_pct": _occupancy_avg_for_room(db, r.id, start, end),
            }
        )
    return out


def peak_hours(db: Session, start: datetime, end: datetime) -> list[dict]:
    rows = (
        db.query(
            func.hour(Booking.start_time).label("hour"),
            func.count(Booking.id).label("bookings_count"),
        )
        .filter(
            Booking.status != BookingStatus.cancelled,
            Booking.start_time >= start,
            Booking.start_time <= end,
        )
        .group_by(func.hour(Booking.start_time))
        .order_by(func.hour(Booking.start_time))
        .all()
    )
    return [{"hour": int(r.hour), "bookings_count": int(r.bookings_count)} for r in rows]


def ghost_rooms(
    db: Session, start: datetime, end: datetime, occupancy_threshold: float = 0.2
) -> list[dict]:
    """Bookings whose average occupancy sensor reading is below threshold."""
    bookings = (
        db.query(Booking, Room)
        .join(Room, Room.id == Booking.room_id)
        .filter(
            Booking.status != BookingStatus.cancelled,
            Booking.start_time >= start,
            Booking.end_time <= end,
        )
        .all()
    )
    out = []
    for booking, room in bookings:
        avg = _occupancy_avg_for_room(db, room.id, booking.start_time, booking.end_time)
        if avg is not None and avg < occupancy_threshold:
            out.append(
                {
                    "booking_id": booking.id,
                    "room_id": room.id,
                    "room_number": room.room_number,
                    "user_id": booking.user_id,
                    "start_time": booking.start_time,
                    "end_time": booking.end_time,
                    "avg_occupancy_pct": avg,
                }
            )
    return out


def sensor_anomalies(
    db: Session,
    start: datetime,
    end: datetime,
    z_threshold: float = 3.0,
    limit: int = 200,
) -> list[dict]:
    """Detect anomalies per sensor using a simple z-score over the window."""
    sensors = db.query(Sensor).all()
    out: list[dict] = []
    for sensor in sensors:
        readings = (
            db.query(SensorData)
            .filter(
                SensorData.sensor_id == sensor.id,
                SensorData.timestamp >= start,
                SensorData.timestamp <= end,
            )
            .all()
        )
        if len(readings) < 5:
            continue
        values = [r.value for r in readings]
        mu = mean(values)
        try:
            sigma = stdev(values)
        except Exception:
            continue
        if sigma == 0:
            continue
        for r in readings:
            z = (r.value - mu) / sigma
            if abs(z) >= z_threshold:
                out.append(
                    {
                        "sensor_id": sensor.id,
                        "sensor_type": sensor.sensor_type.value if sensor.sensor_type else None,
                        "room_id": sensor.room_id,
                        "value": r.value,
                        "timestamp": r.timestamp,
                        "z_score": round(z, 3),
                    }
                )
    out.sort(key=lambda d: abs(d["z_score"]), reverse=True)
    return out[:limit]


def hourly_forecast(db: Session, lookback_days: int = 14) -> list[dict]:
    """Average bookings per hour over the lookback window — naive forecast for next day."""
    end = datetime.utcnow()
    start = end - timedelta(days=lookback_days)
    rows = (
        db.query(
            func.hour(Booking.start_time).label("hour"),
            func.count(Booking.id).label("bookings_count"),
        )
        .filter(
            Booking.status != BookingStatus.cancelled,
            Booking.start_time >= start,
            Booking.start_time <= end,
        )
        .group_by(func.hour(Booking.start_time))
        .all()
    )
    days = max(lookback_days, 1)
    by_hour = {int(r.hour): int(r.bookings_count) / days for r in rows}
    return [
        {"hour": h, "predicted_bookings": round(by_hour.get(h, 0.0), 3)} for h in range(24)
    ]
