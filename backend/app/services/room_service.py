from datetime import datetime

from sqlalchemy import and_, or_
from sqlalchemy.orm import Session

from app.models.booking import Booking, BookingStatus
from app.models.room import Room, RoomType
from app.schemas.room import RoomCreate, RoomUpdate


def list_rooms(
    db: Session,
    building_id: int | None = None,
    room_type: RoomType | None = None,
) -> list[Room]:
    q = db.query(Room)
    if building_id is not None:
        q = q.filter(Room.building_id == building_id)
    if room_type is not None:
        q = q.filter(Room.room_type == room_type)
    return q.order_by(Room.id).all()


def get_room(db: Session, room_id: int) -> Room | None:
    return db.get(Room, room_id)


def create_room(db: Session, payload: RoomCreate) -> Room:
    room = Room(**payload.model_dump())
    db.add(room)
    db.commit()
    db.refresh(room)
    return room


def update_room(db: Session, room: Room, payload: RoomUpdate) -> Room:
    for k, v in payload.model_dump(exclude_unset=True).items():
        setattr(room, k, v)
    db.commit()
    db.refresh(room)
    return room


def delete_room(db: Session, room: Room) -> None:
    db.delete(room)
    db.commit()


def is_room_available(
    db: Session,
    room_id: int,
    start: datetime,
    end: datetime,
    exclude_booking_id: int | None = None,
) -> bool:
    """A room is available when no confirmed/pending booking overlaps [start, end[."""
    q = db.query(Booking).filter(
        Booking.room_id == room_id,
        Booking.status != BookingStatus.cancelled,
        and_(Booking.start_time < end, Booking.end_time > start),
    )
    if exclude_booking_id is not None:
        q = q.filter(Booking.id != exclude_booking_id)
    return q.first() is None


def find_available_rooms(
    db: Session,
    start: datetime,
    end: datetime,
    building_id: int | None = None,
    min_capacity: int | None = None,
) -> list[Room]:
    occupied_subq = (
        db.query(Booking.room_id)
        .filter(
            Booking.status != BookingStatus.cancelled,
            Booking.start_time < end,
            Booking.end_time > start,
        )
        .subquery()
    )
    q = db.query(Room).filter(or_(Room.id.notin_(occupied_subq), Room.id.is_(None)))
    if building_id is not None:
        q = q.filter(Room.building_id == building_id)
    if min_capacity is not None:
        q = q.filter(Room.capacity >= min_capacity)
    return q.order_by(Room.id).all()
