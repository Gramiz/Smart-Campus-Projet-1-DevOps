from functools import lru_cache

from pydantic import Field
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=(".env.local"),
        env_file_encoding="utf-8",
        case_sensitive=True,
        extra="ignore",
    )

    APP_NAME: str = "Smart Campus API"
    APP_VERSION: str = "1.0.0"
    ENVIRONMENT: str = "development"

    DATABASE_URL: str = Field(
        default="mysql+pymysql://campus_user:campus_password@localhost:3306/campus_smart_manager"
    )

    SECRET_KEY: str = Field(default="change-me-in-production")
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60

    CORS_ORIGINS: str = "*"

    @property
    def cors_origins_list(self) -> list[str]:
        raw = self.CORS_ORIGINS.strip()
        if raw in ("", "*"):
            return ["*"]
        return [o.strip() for o in raw.split(",") if o.strip()]


@lru_cache
def get_settings() -> Settings:
    return Settings()


settings = get_settings()
