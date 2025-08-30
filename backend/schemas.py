# In app/schemas.py
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

# Schemas for Dashboard
class DashboardMetrics(BaseModel):
    active_alerts: int
    sensors_online: int
    water_level_avg: float
    system_status: str

# Schemas for Sensors
class SensorBase(BaseModel):
    name: str
    type: str
    location_name: str
    latitude: float
    longitude: float
    status: str
    installed_date: datetime
    last_update: datetime
    
class SensorCreate(SensorBase):
    pass

class SensorRead(SensorBase):
    id: int
    class Config:
        orm_mode = True

# Schemas for Alerts
class AlertRead(BaseModel):
    id: int
    message: str
    severity: str
    location_name: str
    timestamp: datetime
    class Config:
        orm_mode = True


class AlertCreate(BaseModel):
    sensor_id: int
    timestamp: datetime
    severity: str
    message: str
 
class SensorData(BaseModel):
    sensor_id: int
    timestamp: datetime
    water_level: float
    wind_speed: float
    location_name: str
    latitude: float
    longitude: float
    status: str

    class Config:
        orm_mode = True
