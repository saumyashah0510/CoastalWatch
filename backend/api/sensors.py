# In app/api/sensors.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from backend import crud, models, schemas
from backend.database import get_db

router = APIRouter()

@router.post("/", response_model=schemas.SensorRead)
def create_sensor_endpoint(sensor: schemas.SensorCreate, db: Session = Depends(get_db)):
    return crud.create_sensor(db=db, sensor=sensor)

@router.get("/", response_model=List[schemas.SensorData])
def read_sensors_endpoint( db: Session = Depends(get_db)):
    return crud.get_sensor_data(db)

@router.get("/{sensor_id}", response_model=schemas.SensorRead)
def read_sensor_endpoint(sensor_id: int, db: Session = Depends(get_db)):
    db_sensor = crud.get_sensor(db, sensor_id=sensor_id)
    if db_sensor is None:
        raise HTTPException(status_code=404, detail="Sensor not found")
    return db_sensor
