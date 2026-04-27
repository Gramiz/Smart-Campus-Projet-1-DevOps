from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.api.deps import get_current_user, require_staff
from app.core.database import get_db
from app.models.incident import Incident, IncidentStatus
from app.models.user import User
from app.schemas.incident import IncidentCreate, IncidentOut, IncidentUpdate
from app.services import incident_service

router = APIRouter()


@router.get("", response_model=list[IncidentOut])
def list_incidents(
    room_id: int | None = None,
    status_filter: IncidentStatus | None = None,
    db: Session = Depends(get_db),
    _: User = Depends(get_current_user),
) -> list[Incident]:
    return incident_service.list_incidents(db, room_id=room_id, status=status_filter)


@router.post("", response_model=IncidentOut, status_code=status.HTTP_201_CREATED)
def create_incident(
    payload: IncidentCreate,
    db: Session = Depends(get_db),
    user: User = Depends(get_current_user),
) -> Incident:
    return incident_service.create_incident(db, payload, reported_by=user.id)


@router.get("/{incident_id}", response_model=IncidentOut)
def get_incident(
    incident_id: int,
    db: Session = Depends(get_db),
    _: User = Depends(get_current_user),
) -> Incident:
    incident = incident_service.get_incident(db, incident_id)
    if not incident:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="incident not found")
    return incident


@router.patch(
    "/{incident_id}", response_model=IncidentOut, dependencies=[Depends(require_staff)]
)
def update_incident(
    incident_id: int, payload: IncidentUpdate, db: Session = Depends(get_db)
) -> Incident:
    incident = incident_service.get_incident(db, incident_id)
    if not incident:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="incident not found")
    return incident_service.update_incident(db, incident, payload)


@router.delete(
    "/{incident_id}",
    status_code=status.HTTP_204_NO_CONTENT,
    dependencies=[Depends(require_staff)],
)
def delete_incident(incident_id: int, db: Session = Depends(get_db)) -> None:
    incident = incident_service.get_incident(db, incident_id)
    if not incident:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="incident not found")
    incident_service.delete_incident(db, incident)
