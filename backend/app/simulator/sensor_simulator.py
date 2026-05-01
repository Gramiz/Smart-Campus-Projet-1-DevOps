"""Sensor simulator — injects realistic readings into sensor_data.

Run as a script: `python -m app.simulator.sensor_simulator [--once] [--interval 60]`.

Cycles:
- temperature: ~20°C ± 2°C, mild diurnal swing
- occupancy: 0..1, high 8h-18h on weekdays, near-zero at night
- energy: kWh proportional to occupancy with baseline
"""
from __future__ import annotations

import argparse
import math
import random
import time
from datetime import datetime

from sqlalchemy.orm import Session

from app.core.database import SessionLocal
from app.models.sensor import Sensor, SensorType
from app.models.sensor_data import SensorData


def _temperature(now: datetime) -> float:
    base = 20.5
    diurnal = 1.5 * math.sin((now.hour - 6) / 24 * 2 * math.pi)
    return round(base + diurnal + random.uniform(-0.4, 0.4), 2)


def _occupancy(now: datetime) -> float:
    if now.weekday() >= 5:
        peak = 0.15
    else:
        peak = 0.85 if 8 <= now.hour <= 18 else 0.05
    return round(max(0.0, min(1.0, peak + random.uniform(-0.1, 0.1))), 3)


def _energy(now: datetime, occupancy: float) -> float:
    baseline = 0.4
    return round(baseline + 3.5 * occupancy + random.uniform(-0.2, 0.2), 3)


def _value_for(sensor: Sensor, now: datetime) -> float:
    occupancy = _occupancy(now)
    if sensor.sensor_type == SensorType.temperature:
        return _temperature(now)
    if sensor.sensor_type == SensorType.energy:
        return _energy(now, occupancy)
    return occupancy


def tick(db: Session) -> int:
    now = datetime.utcnow()
    sensors = db.query(Sensor).all()
    rows = [SensorData(sensor_id=s.id, value=_value_for(s, now), timestamp=now) for s in sensors]
    if not rows:
        return 0
    db.add_all(rows)
    db.commit()
    return len(rows)


def main() -> None:
    parser = argparse.ArgumentParser(description="Smart Campus sensor simulator")
    parser.add_argument("--once", action="store_true", help="emit one batch and exit")
    parser.add_argument(
        "--interval", type=int, default=60, help="seconds between batches (default 60)"
    )
    args = parser.parse_args()

    while True:
        db = SessionLocal()
        try:
            count = tick(db)
            print(f"[simulator] inserted {count} readings at {datetime.utcnow().isoformat()}")
        finally:
            db.close()
        if args.once:
            break
        time.sleep(args.interval)


if __name__ == "__main__":
    main()
