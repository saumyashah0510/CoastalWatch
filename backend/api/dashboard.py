# app/api.py
from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from datetime import datetime, timedelta
from ..database import get_db
from ..models import Alert, Sensor, SensorReading

router = APIRouter(
    prefix="/dashboard",
    tags=["Dashboard"]
)

@router.get("/alerts")
def get_alerts(days: int = 10, db: Session = Depends(get_db)):
    since = datetime.utcnow() - timedelta(days=days)
    alerts = (
        db.query(Alert)
        .filter(Alert.timestamp >= since)
        .order_by(Alert.timestamp.desc())
        
        .all()
    )
    return [
        {
            "id": a.id,
            "sensor_id": a.sensor_id,
            "message": a.message,
            "severity": a.severity,
            "timestamp": a.timestamp,
            "location_name": a.sensor.location_name,
        }
        for a in alerts
    ]

@router.get("/sensors")
def get_sensors(db: Session = Depends(get_db)):
    return db.query(Sensor).limit(5).all()

@router.get("/readings/averages")
def get_averages(limit: int = 10, db: Session = Depends(get_db)):
    readings = (
        db.query(SensorReading)
        .order_by(SensorReading.timestamp.desc())
        .limit(limit)
        .all()
    )

    if not readings:
        return {"avg_water_level": 0.0, "avg_wind_speed": 0.0}

    avg_water = sum(r.water_level for r in readings) / len(readings)
    avg_wind = sum(r.wind_speed for r in readings) / len(readings)

    return {
        "avg_water_level": round(avg_water, 2),
        "avg_wind_speed": round(avg_wind, 2),
    }

