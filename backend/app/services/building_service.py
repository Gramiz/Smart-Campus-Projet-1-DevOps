from sqlalchemy.orm import Session

from app.models.building import Building
from app.schemas.building import BuildingCreate, BuildingUpdate


def list_buildings(db: Session) -> list[Building]:
    return db.query(Building).order_by(Building.id).all()


def get_building(db: Session, building_id: int) -> Building | None:
    return db.get(Building, building_id)


def create_building(db: Session, payload: BuildingCreate) -> Building:
    building = Building(name=payload.name, location=payload.location)
    db.add(building)
    db.commit()
    db.refresh(building)
    return building


def update_building(db: Session, building: Building, payload: BuildingUpdate) -> Building:
    data = payload.model_dump(exclude_unset=True)
    for k, v in data.items():
        setattr(building, k, v)
    db.commit()
    db.refresh(building)
    return building


def delete_building(db: Session, building: Building) -> None:
    db.delete(building)
    db.commit()
