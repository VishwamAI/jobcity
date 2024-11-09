from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from src.core.auth import models as auth_models
from src.core.database import engine
from src.core.job_platform.api import router as job_router
from src.core.identity_verification.api import router as identity_router

app = FastAPI(
    title="JobCity Backend API",
    description="Backend API for JobCity automated job application system",
    version="1.0.0"
)

# Configure CORS
origins = [
    "https://verdant-cendol-0975eb.netlify.app",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["*"],
)

# Create database tables
auth_models.Base.metadata.create_all(bind=engine)

# Include routers
app.include_router(job_router, prefix="/api/jobs", tags=["jobs"])
app.include_router(identity_router, prefix="/api/identity", tags=["identity"])

@app.get("/health")
async def health_check():
    return {
        "status": "healthy",
        "message": "JobCity Backend API is running",
        "version": "1.0.0"
    }

@app.exception_handler(HTTPException)
async def http_exception_handler(request, exc):
    return {"detail": exc.detail}, exc.status_code

@app.exception_handler(Exception)
async def general_exception_handler(request, exc):
    return {"detail": "Internal server error"}, 500
