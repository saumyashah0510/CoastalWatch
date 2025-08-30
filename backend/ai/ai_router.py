# filename: main.py
import os
import json
import random
import httpx
import pandas as pd
import google.generativeai as genai
from datetime import datetime
from fastapi import FastAPI, HTTPException,APIRouter, Depends, status
from pydantic import BaseModel
from dotenv import load_dotenv
from sqlalchemy.orm import Session
from ..database import get_db
from .. import schemas,crud,models

ai_router = APIRouter(
    prefix="/ai",
    tags=["Ai Routes"]
)


# --- Load Environment Variables and Historical Data ---
load_dotenv()

GOOGLE_API_KEY = os.getenv("api_key")
if GOOGLE_API_KEY:
    genai.configure(api_key=GOOGLE_API_KEY)
else:
    print("WARNING: GOOGLE_API_KEY environment variable not set.")

try:
    historical_df = pd.read_csv(r"C:\Users\OMEN\OneDrive\Desktop\lovable\coastguard-watch\backend\ai\historical_sensor_data_extended.csv")
    historical_df['timestamp'] = pd.to_datetime(historical_df['timestamp'])
except FileNotFoundError:
    print("WARNING: historical_sensor_data_extended.csv not found. Please generate it first.")
    historical_df = None

# --- Pydantic Models for API Data ---
class NewSensorReadingExtended(BaseModel):
    sensor_id: int
    timestamp: datetime
    water_level: float
    wind_speed: float

class AnomalyAnalysisResponse(BaseModel):
    is_anomaly: bool
    severity: str
    message: str

# --- AI Analysis Utility (Multi-Variable) ---
async def get_anomaly_analysis_extended(
    reading: NewSensorReadingExtended, 
    avg_water: float, 
    avg_wind: float
) -> AnomalyAnalysisResponse:
    """Uses Gemini to analyze combined water and wind readings."""
    prompt = f"""
    You are an expert coastal monitoring AI. Analyze the following multivariate sensor data.

    Contextual Information:
    - Historical Average Water Level: {avg_water:.2f}m
    - Historical Average Wind Speed: {avg_wind:.2f} m/s

    Current Live Reading:
    - Water Level: {reading.water_level:.2f}m
    - Wind Speed: {reading.wind_speed:.2f} m/s

    Rules for determining combined threat level:
    1. If water level is > 1.5m above average AND wind speed is > 10 m/s above average, severity is 'critical'.
    2. If water level is > 1.5m above average (regardless of wind), severity is 'high'.
    3. If water level is 0.7-1.5m above average AND wind speed is > 5 m/s above average, severity is 'high'.
    4. If water level is 0.7-1.5m above average OR wind speed is > 10 m/s above average, severity is 'medium'.
    5. Otherwise, severity is 'low'.

    Provide your response ONLY in this exact JSON format:
    {{
        "is_anomaly": boolean,
        "severity": "critical" | "high" | "medium" | "low",
        "message": "A brief explanation of the combined threat."
    }}
    """

    try:
        model = genai.GenerativeModel("gemini-1.5-flash")
        response = model.generate_content(prompt)
        gemini_text = response.candidates[0].content.parts[0].text
        print("Gemini raw output:", gemini_text)

        # --- Strip code fences ---
        cleaned = gemini_text.strip()
        if cleaned.startswith("```"):
            cleaned = cleaned.strip("`")
            if cleaned.lower().startswith("json"):
                cleaned = cleaned[4:].strip()  # Remove leading 'json'

        print("Cleaned JSON:", cleaned)

        analysis_content = json.loads(cleaned)
        return AnomalyAnalysisResponse(**analysis_content)

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Gemini API parsing failed: {e}")

# --- API Endpoint to Process New Readings ---
@ai_router.post("/analyze_reading_extended/", response_model=AnomalyAnalysisResponse)
async def analyze_reading_endpoint(
    reading: NewSensorReadingExtended,
    db: Session = Depends(get_db)
):
    """
    Analyze a sensor reading, determine anomalies, store reading in DB,
    and create alerts if anomalies are detected.
    """
    if historical_df is None:
        raise HTTPException(status_code=500, detail="Historical data not loaded.")

    

    # --- 2. Get historical data for this sensor ---
    sensor_history = historical_df[historical_df['sensor_id'] == reading.sensor_id]

    if sensor_history.empty:
        raise HTTPException(
            status_code=404,
            detail=f"No historical data found for sensor_id {reading.sensor_id}"
        )

    current_hour = reading.timestamp.hour
    hour_filtered = sensor_history[sensor_history['timestamp'].dt.hour == current_hour]

    avg_water = hour_filtered['water_level'].mean() if not hour_filtered.empty else sensor_history['water_level'].mean()
    avg_wind = hour_filtered['wind_speed'].mean() if not hour_filtered.empty else sensor_history['wind_speed'].mean()

    # --- 3. Get AI analysis ---
    analysis_result = await get_anomaly_analysis_extended(
        reading=reading,
        avg_water=avg_water,
        avg_wind=avg_wind
    )

    # --- 4. If anomaly, create alert ---
    if analysis_result.is_anomaly:
        alert_data = schemas.AlertCreate(
            sensor_id=reading.sensor_id,
            timestamp=reading.timestamp,
            severity=analysis_result.severity,
            message=analysis_result.message,
        )
        crud.create_alert(db=db, alert=alert_data)

    return analysis_result

# --- Helper Endpoint to Simulate a New Reading ---
@ai_router.get("/get_simulated_reading_extended/", response_model=NewSensorReadingExtended)
def get_simulated_reading_extended(sensor_id: int = None, db: Session = Depends(get_db)):
    """
    Generate a simulated sensor reading, store it in the database, 
    and return the reading.
    """
    if historical_df is None:
        raise HTTPException(status_code=500, detail="Historical data not loaded.")

    available_sensors = historical_df['sensor_id'].unique().tolist()
    if not sensor_id:
        sensor_id = random.choice(available_sensors)

    # Generate simulated values
    water_value = round(random.uniform(2.5, 4.5), 2) if random.random() < 0.15 else round(random.uniform(0.5, 2.0), 2)
    wind_value = round(random.uniform(16, 40), 2) if random.random() < 0.15 else round(random.uniform(3, 15), 2)

    # Store this simulated reading in the database
    new_reading = models.SensorReading(
        sensor_id=sensor_id,
        timestamp=datetime.now(),
        water_level=water_value,
        wind_speed=wind_value
    )
    db.add(new_reading)
    db.commit()
    db.refresh(new_reading)

    # Return response
    return NewSensorReadingExtended(
        sensor_id=sensor_id,
        timestamp=new_reading.timestamp,
        water_level=new_reading.water_level,
        wind_speed=new_reading.wind_speed,
    )

