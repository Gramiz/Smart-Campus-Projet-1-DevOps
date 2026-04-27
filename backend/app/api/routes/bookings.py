from datetime import datetime

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.api.deps import get_current_user
from app.core.database import get_db
from app.models.booking import Booking
from app.models.user import User, UserRole
from app.schemas.booking import BookingCreate, BookingOut, BookingUpdate
from app.services import booking_service

router = APIRouter()


@router.get("", response_model=list[BookingOut])
def list_bookings(
    room_id: int | None = None,
    start_after: datetime | None = None,
    end_before: datetime | None = None,
    mine: bool = False,
    db: Session = Depends(get_db),
    user: User = Depends(get_current_user),
) -> list[Booking]:
    user_id = user.id if mine or user.role == UserRole.student else None
    return booking_service.list_bookings(
        db,
        user_id=user_id,
        room_id=room_id,
        start_after=start_after,
        end_before=end_before,
    )


@router.post("", response_model=BookingOut, status_code=status.HTTP_201_CREATED)
def create_booking(
    payload: BookingCreate,
    db: Session = Depends(get_db),
    user: User = Depends(get_current_user),
) -> Booking:
    try:
        return booking_service.create_booking(db, payload, user_id=user.id)
    except booking_service.BookingError as e:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail=str(e))


@router.get("/{booking_id}", response_model=BookingOut)
def get_booking(
    booking_id: int,
    db: Session = Depends(get_db),
    user: User = Depends(get_current_user),
) -> Booking:
    booking = booking_service.get_booking(db, booking_id)
    if not booking:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="booking not found")
    if user.role == UserRole.student and booking.user_id != user.id:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="forbidden")
    return booking


@router.patch("/{booking_id}", response_model=BookingOut)
def update_booking(
    booking_id: int,
    payload: BookingUpdate,
    db: Session = Depends(get_db),
    user: User = Depends(get_current_user),
) -> Booking:
    booking = booking_service.get_booking(db, booking_id)
    if not booking:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="booking not found")
    if user.role == UserRole.student and booking.user_id != user.id:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="forbidden")
    try:
        return booking_service.update_booking(db, booking, payload)
    except booking_service.BookingError as e:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail=str(e))


@router.delete("/{booking_id}", response_model=BookingOut)
def cancel_booking(
    booking_id: int,
    db: Session = Depends(get_db),
    user: User = Depends(get_current_user),
) -> Booking:
    booking = booking_service.get_booking(db, booking_id)
    if not booking:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="booking not found")
    if user.role == UserRole.student and booking.user_id != user.id:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="forbidden")
    return booking_service.cancel_booking(db, booking)
