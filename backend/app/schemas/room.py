from pydantic import BaseModel, ConfigDict, Field

from app.models.room import RoomType


class RoomBase(BaseModel):
    building_id: int | None = None
    room_number: str = Field(min_length=1, max_length=20)
    capacity: int | None = Field(default=None, ge=0)
    room_type: RoomType | None = None


class RoomCreate(RoomBase):
    pass


class RoomUpdate(BaseModel):
    building_id: int | None = None
    room_number: str | None = Field(default=None, min_length=1, max_length=20)
    capacity: int | None = Field(default=None, ge=0)
    room_type: RoomType | None = None


class RoomOut(RoomBase):
    model_config = ConfigDict(from_attributes=True)
    id: int
