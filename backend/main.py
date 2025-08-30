# In app/main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .database import engine
from . import models
from .api import sensors,alerts
from .ai import ai_router # import other routers as you create them


models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="CoastalWatch Backend")

# CORS middleware to allow frontend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:8080"], # Add your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(sensors.router, prefix="/sensors", tags=["Sensors"])
app.include_router(ai_router.ai_router)
app.include_router(alerts.router,prefix="/alerts",tags=["Alerts"])


@app.get("/")
def read_root():
    return {"message": "Welcome to the CoastalWatch API"}
