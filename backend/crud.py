# In app/crud.py
from sqlalchemy.orm import Session
from . import models, schemas

# Sensor CRUD Functions
def get_sensor(db: Session, sensor_id: int):
    return db.query(models.Sensor).filter(models.Sensor.id == sensor_id).first()

def get_sensors(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Sensor).offset(skip).limit(limit).all()

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

