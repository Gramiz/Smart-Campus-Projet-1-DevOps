from datetime import datetime

from pydantic import BaseModel, ConfigDict, Field

from app.models.incident import IncidentSeverity, IncidentStatus


class IncidentBase(BaseModel):
    room_id: int
    description: str | None = Field(default=None, max_length=10_000)
    severity: IncidentSeverity | None = IncidentSeverity.medium


class IncidentCreate(IncidentBase):
    pass


class IncidentUpdate(BaseModel):
    description: str | None = Field(default=None, max_length=10_000)
    severity: IncidentSeverity | None = None
    status: IncidentStatus | None = None


class IncidentOut(IncidentBase):
    model_config = ConfigDict(from_attributes=True)
    id: int
    reported_by: int | None
    status: IncidentStatus
    created_at: datetime
