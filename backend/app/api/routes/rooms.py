from datetime import datetime

from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session

from app.api.deps import get_current_user, require_staff
from app.core.database import get_db
from app.models.room import Room, RoomType
from app.schemas.room import RoomCreate, RoomOut, RoomUpdate
from app.services import room_service

router = APIRouter()


@router.get("", response_model=list[RoomOut])
def list_rooms(
    building_id: int | None = None,
    room_type: RoomType | None = None,
    db: Session = Depends(get_db),
    _=Depends(get_current_user),
) -> list[Room]:
    return room_service.list_rooms(db, building_id=building_id, room_type=room_type)


@router.get("/available", response_model=list[RoomOut])
def list_available_rooms(
    start: datetime = Query(...),
    end: datetime = Query(...),
    building_id: int | None = None,
    min_capacity: int | None = None,
    db: Session = Depends(get_db),
    _=Depends(get_current_user),
) -> list[Room]:
    if end <= start:
        raise HTTPException(status_code=400, detail="end must be after start")
    return room_service.find_available_rooms(
        db, start, end, building_id=building_id, min_capacity=min_capacity
    )


@router.post(
    "",
    response_model=RoomOut,
    status_code=status.HTTP_201_CREATED,
    dependencies=[Depends(require_staff)],
)
def create_room(payload: RoomCreate, db: Session = Depends(get_db)) -> Room:
    return room_service.create_room(db, payload)


@router.get("/{room_id}", response_model=RoomOut)
def get_room(
    room_id: int, db: Session = Depends(get_db), _=Depends(get_current_user)
) -> Room:
    room = room_service.get_room(db, room_id)
    if not room:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="room not found")
    return room


@router.patch("/{room_id}", response_model=RoomOut, dependencies=[Depends(require_staff)])
def update_room(
    room_id: int, payload: RoomUpdate, db: Session = Depends(get_db)
) -> Room:
    room = room_service.get_room(db, room_id)
    if not room:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="room not found")
    return room_service.update_room(db, room, payload)


@router.delete(
    "/{room_id}",
    status_code=status.HTTP_204_NO_CONTENT,
    dependencies=[Depends(require_staff)],
)
def delete_room(room_id: int, db: Session = Depends(get_db)) -> None:
    room = room_service.get_room(db, room_id)
    if not room:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="room not found")
    room_service.delete_room(db, room)
