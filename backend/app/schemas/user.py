from pydantic import BaseModel, ConfigDict, EmailStr, Field

from app.models.user import UserRole


class UserBase(BaseModel):
    first_name: str | None = Field(default=None, max_length=50)
    last_name: str | None = Field(default=None, max_length=50)
    email: EmailStr
    role: UserRole = UserRole.student


class UserCreate(UserBase):
    password: str = Field(min_length=8, max_length=100)


class UserUpdate(BaseModel):
    first_name: str | None = Field(default=None, max_length=50)
    last_name: str | None = Field(default=None, max_length=50)
    role: UserRole | None = None


class UserOut(UserBase):
    model_config = ConfigDict(from_attributes=True)
    id: int
