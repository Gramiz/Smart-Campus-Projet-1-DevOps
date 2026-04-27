import enum
from typing import List

from sqlalchemy import Enum, ForeignKey, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.core.database import Base


class SensorType(str, enum.Enum):
    occupancy = "occupancy"
    temperature = "temperature"
    energy = "energy"


class Sensor(Base):
    __tablename__ = "sensors"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    room_id: Mapped[int | None] = mapped_column(ForeignKey("rooms.id"), nullable=True)
    sensor_type: Mapped[SensorType | None] = mapped_column(
        Enum(SensorType, name="sensor_type"), nullable=True
    )
    unit: Mapped[str | None] = mapped_column(String(10), nullable=True)

    room: Mapped["Room | None"] = relationship(back_populates="sensors")  # noqa: F821
    readings: Mapped[List["SensorData"]] = relationship(  # noqa: F821
        back_populates="sensor", cascade="all, delete-orphan"
    )
