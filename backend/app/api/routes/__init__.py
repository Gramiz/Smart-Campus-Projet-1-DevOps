from fastapi import APIRouter

from app.api.routes import (
    analytics,
    auth,
    bookings,
    buildings,
    health,
    incidents,
    rooms,
    sensors,
    users,
)

api_router = APIRouter()
api_router.include_router(health.router, tags=["health"])
api_router.include_router(auth.router, prefix="/api/auth", tags=["auth"])
api_router.include_router(users.router, prefix="/api/users", tags=["users"])
api_router.include_router(buildings.router, prefix="/api/buildings", tags=["buildings"])
api_router.include_router(rooms.router, prefix="/api/rooms", tags=["rooms"])
api_router.include_router(bookings.router, prefix="/api/bookings", tags=["bookings"])
api_router.include_router(incidents.router, prefix="/api/incidents", tags=["incidents"])
api_router.include_router(sensors.router, prefix="/api/sensors", tags=["sensors"])
api_router.include_router(analytics.router, prefix="/api/analytics", tags=["analytics"])
