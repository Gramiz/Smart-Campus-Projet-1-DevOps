from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.api.deps import get_current_user, require_staff
from app.core.database import get_db
from app.models.building import Building
from app.schemas.building import BuildingCreate, BuildingOut, BuildingUpdate
from app.services import building_service

router = APIRouter()


@router.get("", response_model=list[BuildingOut])
def list_buildings(
    db: Session = Depends(get_db), _=Depends(get_current_user)
) -> list[Building]:
    return building_service.list_buildings(db)


@router.post(
    "",
    response_model=BuildingOut,
    status_code=status.HTTP_201_CREATED,
    dependencies=[Depends(require_staff)],
)
def create_building(payload: BuildingCreate, db: Session = Depends(get_db)) -> Building:
    return building_service.create_building(db, payload)


@router.get("/{building_id}", response_model=BuildingOut)
def get_building(
    building_id: int, db: Session = Depends(get_db), _=Depends(get_current_user)
) -> Building:
    building = building_service.get_building(db, building_id)
    if not building:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="building not found")
    return building


@router.patch(
    "/{building_id}", response_model=BuildingOut, dependencies=[Depends(require_staff)]
)
def update_building(
    building_id: int, payload: BuildingUpdate, db: Session = Depends(get_db)
) -> Building:
    building = building_service.get_building(db, building_id)
    if not building:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="building not found")
    return building_service.update_building(db, building, payload)


@router.delete(
    "/{building_id}",
    status_code=status.HTTP_204_NO_CONTENT,
    dependencies=[Depends(require_staff)],
)
def delete_building(building_id: int, db: Session = Depends(get_db)) -> None:
    building = building_service.get_building(db, building_id)
    if not building:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="building not found")
    building_service.delete_building(db, building)
