from sqlalchemy.orm import Session

from app.core.security import create_access_token, hash_password, verify_password
from app.core.config import settings
from app.models.user import User, UserRole
from app.schemas.auth import RegisterIn


class AuthError(Exception):
    pass


def register(db: Session, payload: RegisterIn) -> User:
    existing = db.query(User).filter(User.email == payload.email).first()
    if existing:
        raise AuthError("email already registered")

    user = User(
        first_name=payload.first_name,
        last_name=payload.last_name,
        email=payload.email,
        password=hash_password(payload.password),
        role=payload.role or UserRole.student,
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    return user


def authenticate(db: Session, email: str, password: str) -> User:
    user = db.query(User).filter(User.email == email).first()
    if not user or not verify_password(password, user.password):
        raise AuthError("invalid credentials")
    return user


def issue_token(user: User) -> tuple[str, int]:
    token = create_access_token(user.id, extra_claims={"role": user.role.value})
    return token, settings.ACCESS_TOKEN_EXPIRE_MINUTES * 60
