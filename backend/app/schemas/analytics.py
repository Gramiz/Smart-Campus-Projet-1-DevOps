from datetime import datetime

from pydantic import BaseModel


class RoomOccupancyOut(BaseModel):
    room_id: int
    room_number: str
    capacity: int | None
    bookings_count: int
    booked_minutes: int
    avg_occupancy_pct: float | None


class PeakHourOut(BaseModel):
    hour: int
    bookings_count: int


class GhostRoomOut(BaseModel):
    booking_id: int
    room_id: int
    room_number: str
    user_id: int | None
    start_time: datetime
    end_time: datetime
    avg_occupancy_pct: float | None


class SensorAnomalyOut(BaseModel):
    sensor_id: int
    sensor_type: str | None
    room_id: int | None
    value: float
    timestamp: datetime
    z_score: float


class ForecastPointOut(BaseModel):
    hour: int
    predicted_bookings: float
