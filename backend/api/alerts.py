from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from backend import crud, models, schemas
from backend.database import get_db

router = APIRouter()

@router.get("/", response_model=list[schemas.AlertRead])
def get_all_alerts(db: Session = Depends(get_db)):
    alerts = (
        db.query(models.Alert.id, models.Alert.message, models.Alert.severity,
                 models.Sensor.location_name, models.Alert.timestamp)
        .join(models.Sensor, models.Alert.sensor_id == models.Sensor.id)
        .all()
    )

    # Convert results to dicts (because ORM returns Row objects)
    return [
        schemas.AlertRead(
            id=a.id,
            message=a.message,
            severity=a.severity,
            location_name=a.location_name,
            timestamp=a.timestamp,
        )
        for a in alerts
    ]