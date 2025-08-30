# In app/crud.py
from sqlalchemy.orm import Session
from . import models, schemas

# Sensor CRUD Functions
def get_sensor(db: Session, sensor_id: int):
    return db.query(models.Sensor).filter(models.Sensor.id == sensor_id).first()

def get_sensor_data(db: Session):

    results = (
        db.query(
            models.SensorReading.sensor_id,
            models.SensorReading.timestamp,
            models.SensorReading.water_level,
            models.SensorReading.wind_speed,
            models.Sensor.location_name,
            models.Sensor.latitude,
            models.Sensor.longitude,
            models.Sensor.status
        )
        .join(models.Sensor, models.SensorReading.sensor_id == models.Sensor.id)
        .all()
    )

    # Convert to list of dicts to match SensorData schema
    sensor_data = [
        schemas.SensorData(
            sensor_id=r.sensor_id,
            timestamp=r.timestamp,
            water_level=r.water_level,
            wind_speed=r.wind_speed,
            location_name=r.location_name,
            latitude=r.latitude,
            longitude=r.longitude,
            status=r.status
        )
        for r in results
    ]
    return sensor_data

def create_sensor(db: Session, sensor: schemas.SensorCreate):
    db_sensor = models.Sensor(**sensor.dict())
    db.add(db_sensor)
    db.commit()
    db.refresh(db_sensor)
    return db_sensor


from sqlalchemy.orm import Session
from . import models, schemas  # Import your SQLAlchemy models and Pydantic schemas

# ... (your other CRUD functions for sensors, etc.) ...

def create_alert(db: Session, alert: schemas.AlertCreate) -> models.Alert:
   
    db_alert = models.Alert(
        sensor_id=alert.sensor_id,
        timestamp=alert.timestamp,
        severity=alert.severity,
        message=alert.message, 
    )
    
    db.add(db_alert)
    db.commit()    
    db.refresh(db_alert)
    
    return db_alert

