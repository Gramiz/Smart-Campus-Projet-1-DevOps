from datetime import datetime

from pydantic import BaseModel, ConfigDict, Field

from app.models.sensor import SensorType


class SensorBase(BaseModel):
    room_id: int | None = None
    sensor_type: SensorType | None = None
    unit: str | None = Field(default=None, max_length=10)


class SensorCreate(SensorBase):
    pass


class SensorUpdate(BaseModel):
    room_id: int | None = None
    sensor_type: SensorType | None = None
    unit: str | None = Field(default=None, max_length=10)


class SensorOut(SensorBase):
    model_config = ConfigDict(from_attributes=True)
    id: int


class SensorDataIn(BaseModel):
    value: float
    timestamp: datetime | None = None


class SensorDataBulkIn(BaseModel):
    readings: list[SensorDataIn]


class SensorDataOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: int
    sensor_id: int | None
    value: float
    timestamp: datetime
