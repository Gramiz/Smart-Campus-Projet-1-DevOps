from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime
import random

app = FastAPI(title="Smart Campus API", version="1.0")

# CORS to allow local frontend access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Welcome to the Smart Campus API"}

@app.get("/api/sensors")
def get_sensors_data():
    """Simule des capteurs pour le campus (occupation, température)"""
    return [
        {
            "id": "A101",
            "type": "room",
            "temperature": round(random.uniform(18.0, 25.0), 1),
            "occupation_pct": random.randint(0, 100),
            "status": "online"
        },
        {
            "id": "Amphi_C",
            "type": "amphitheater",
            "temperature": round(random.uniform(19.0, 22.0), 1),
            "occupation_pct": random.randint(30, 95),
            "status": "online"
        },
        {
            "id": "Biblio_Main",
            "type": "library",
            "temperature": round(random.uniform(20.0, 23.0), 1),
            "occupation_pct": random.randint(10, 80),
            "status": "online"
        }
    ]

@app.get("/api/reservations")
def get_reservations():
    """Simule les prochaines réservations de salles"""
    return [
        {"id": 1, "room": "A101", "time": "10:00 - 12:00", "subject": "Cours Cloud Computing"},
        {"id": 2, "room": "Amphi_C", "time": "14:00 - 17:00", "subject": "Conférence DevOps"},
    ]
