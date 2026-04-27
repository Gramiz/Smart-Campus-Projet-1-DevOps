from sqlalchemy.orm import Session

from app.models.incident import Incident, IncidentStatus
from app.schemas.incident import IncidentCreate, IncidentUpdate


def list_incidents(
    db: Session,
    room_id: int | None = None,
    status: IncidentStatus | None = None,
) -> list[Incident]:
    q = db.query(Incident)
    if room_id is not None:
        q = q.filter(Incident.room_id == room_id)
    if status is not None:
        q = q.filter(Incident.status == status)
    return q.order_by(Incident.created_at.desc()).all()


def get_incident(db: Session, incident_id: int) -> Incident | None:
    return db.get(Incident, incident_id)


def create_incident(db: Session, payload: IncidentCreate, reported_by: int) -> Incident:
    incident = Incident(
        room_id=payload.room_id,
        reported_by=reported_by,
        description=payload.description,
        severity=payload.severity,
    )
    db.add(incident)
    db.commit()
    db.refresh(incident)
    return incident


def update_incident(db: Session, incident: Incident, payload: IncidentUpdate) -> Incident:
    for k, v in payload.model_dump(exclude_unset=True).items():
        setattr(incident, k, v)
    db.commit()
    db.refresh(incident)
    return incident


def delete_incident(db: Session, incident: Incident) -> None:
    db.delete(incident)
    db.commit()
