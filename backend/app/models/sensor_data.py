from datetime import datetime

from sqlalchemy import BigInteger, Float, ForeignKey, Index, TIMESTAMP, func
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.core.database import Base


class SensorData(Base):
    __tablename__ = "sensor_data"
    __table_args__ = (Index("ix_sensor_data_timestamp", "timestamp"),)

    id: Mapped[int] = mapped_column(BigInteger, primary_key=True, autoincrement=True)
    sensor_id: Mapped[int | None] = mapped_column(ForeignKey("sensors.id"), nullable=True)
    value: Mapped[float] = mapped_column(Float, nullable=False)
    timestamp: Mapped[datetime] = mapped_column(
        TIMESTAMP, server_default=func.current_timestamp(), nullable=False
    )

    sensor: Mapped["Sensor | None"] = relationship(back_populates="readings")  # noqa: F821
