"""FastAPI application setup and endpoints."""
from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from src.core.database import get_db

app = FastAPI(title="JobCity API")

@app.get("/health")
async def health_check():
    """Health check endpoint."""
    return {"status": "healthy"}

# Add the app to main.py's namespace
def get_app():
    """Get the FastAPI application instance."""
    return app
