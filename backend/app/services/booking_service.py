from datetime import datetime

from sqlalchemy.orm import Session

from app.models.booking import Booking, BookingStatus
from app.schemas.booking import BookingCreate, BookingUpdate
from app.services.room_service import is_room_available


class BookingError(Exception):
    pass


def list_bookings(
    db: Session,
    user_id: int | None = None,
    room_id: int | None = None,
    start_after: datetime | None = None,
    end_before: datetime | None = None,
) -> list[Booking]:
    q = db.query(Booking)
    if user_id is not None:
        q = q.filter(Booking.user_id == user_id)
    if room_id is not None:
        q = q.filter(Booking.room_id == room_id)
    if start_after is not None:
        q = q.filter(Booking.start_time >= start_after)
    if end_before is not None:
        q = q.filter(Booking.end_time <= end_before)
    return q.order_by(Booking.start_time).all()


def get_booking(db: Session, booking_id: int) -> Booking | None:
    return db.get(Booking, booking_id)


def create_booking(db: Session, payload: BookingCreate, user_id: int) -> Booking:
    if not is_room_available(db, payload.room_id, payload.start_time, payload.end_time):
        raise BookingError("room not available for this time window")
    booking = Booking(
        room_id=payload.room_id,
        user_id=user_id,
        start_time=payload.start_time,
        end_time=payload.end_time,
        status=payload.status or BookingStatus.confirmed,
    )
    db.add(booking)
    db.commit()
    db.refresh(booking)
    return booking


def update_booking(db: Session, booking: Booking, payload: BookingUpdate) -> Booking:
    data = payload.model_dump(exclude_unset=True)
    new_start = data.get("start_time", booking.start_time)
    new_end = data.get("end_time", booking.end_time)
    if new_end <= new_start:
        raise BookingError("end_time must be after start_time")
    if "start_time" in data or "end_time" in data:
        if not is_room_available(
            db, booking.room_id, new_start, new_end, exclude_booking_id=booking.id
        ):
            raise BookingError("room not available for this time window")
    for k, v in data.items():
        setattr(booking, k, v)
    db.commit()
    db.refresh(booking)
    return booking


def cancel_booking(db: Session, booking: Booking) -> Booking:
    booking.status = BookingStatus.cancelled
    db.commit()
    db.refresh(booking)
    return booking
