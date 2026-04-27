import enum
from typing import List

from sqlalchemy import Enum, ForeignKey, Integer, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.core.database import Base


class RoomType(str, enum.Enum):
    amphi = "amphi"
    salle_td = "salle_td"
    tp = "tp"
    bureau = "bureau"


class Room(Base):
    __tablename__ = "rooms"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    building_id: Mapped[int | None] = mapped_column(
        ForeignKey("buildings.id", ondelete="CASCADE"), nullable=True
    )
    room_number: Mapped[str] = mapped_column(String(20), nullable=False)
    capacity: Mapped[int | None] = mapped_column(Integer, nullable=True)
    room_type: Mapped[RoomType | None] = mapped_column(
        Enum(RoomType, name="room_type"), nullable=True
    )

    building: Mapped["Building | None"] = relationship(back_populates="rooms")  # noqa: F821
    bookings: Mapped[List["Booking"]] = relationship(back_populates="room")  # noqa: F821
    incidents: Mapped[List["Incident"]] = relationship(back_populates="room")  # noqa: F821
    sensors: Mapped[List["Sensor"]] = relationship(back_populates="room")  # noqa: F821
