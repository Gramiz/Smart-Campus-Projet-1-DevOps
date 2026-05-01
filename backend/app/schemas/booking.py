from datetime import datetime

from pydantic import BaseModel, ConfigDict, model_validator

from app.models.booking import BookingStatus


class BookingBase(BaseModel):
    room_id: int
    start_time: datetime
    end_time: datetime
    status: BookingStatus = BookingStatus.confirmed

    @model_validator(mode="after")
    def _check_window(self):
        if self.end_time <= self.start_time:
            raise ValueError("end_time must be after start_time")
        return self


class BookingCreate(BookingBase):
    pass


class BookingUpdate(BaseModel):
    start_time: datetime | None = None
    end_time: datetime | None = None
    status: BookingStatus | None = None


class BookingOut(BookingBase):
    model_config = ConfigDict(from_attributes=True)
    id: int
    user_id: int | None
