from pydantic import BaseModel, EmailStr, Field

from app.models.user import UserRole


class RegisterIn(BaseModel):
    first_name: str | None = Field(default=None, max_length=50)
    last_name: str | None = Field(default=None, max_length=50)
    email: EmailStr
    password: str = Field(min_length=8, max_length=100)
    role: UserRole = UserRole.student


class LoginIn(BaseModel):
    email: EmailStr
    password: str


class TokenOut(BaseModel):
    access_token: str
    token_type: str = "bearer"
    expires_in: int
