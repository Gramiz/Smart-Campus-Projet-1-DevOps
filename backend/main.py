"""Compatibility shim — the real app lives in app.main:app."""
from app.main import app

__all__ = ["app"]
