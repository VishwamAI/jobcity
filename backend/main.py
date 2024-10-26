import logging
from fastapi import FastAPI, HTTPException, BackgroundTasks, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional, List, Dict
import getpass
from sqlalchemy.orm import Session
from src.core.indeed_job_agent import IndeedJobAgent
from src.core.job_data_model import JobDataModel
from src.core.nlp_engine import NLPEngine
from src.core.resume_customizer import ResumeCustomizer
from src.core.cover_letter_generator import CoverLetterGenerator
from src.core.application_submission_engine import ApplicationSubmissionEngine
from src.core.database import get_db, engine, Base, SessionLocal

# Configure logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

# Create database tables
Base.metadata.create_all(bind=engine)

# Initialize FastAPI app
app = FastAPI(title="JobCity API", description="Automated job application platform API")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize components
def get_job_data_model(db: Session = Depends(get_db)):
    return JobDataModel(db)

nlp_engine = NLPEngine()
resume_customizer = ResumeCustomizer()
cover_letter_generator = CoverLetterGenerator()
application_submission_engine = ApplicationSubmissionEngine()

# Pydantic models for request/response
class LoginRequest(BaseModel):
    email: str
    password: str

class LoginResponse(BaseModel):
    status: str
    message: str
    token: Optional[str] = None

@app.post("/api/auth/login")
async def login(request: LoginRequest):
    """Handle user login"""
    # TODO: Implement proper authentication
    if request.email == "test@example.com" and request.password == "password":
        return LoginResponse(
            status="success",
            message="Login successful",
            token="dummy_token"
        )
    logger.info(f"Failed login attempt for email: {request.email}")
    raise HTTPException(status_code=401, detail="Invalid credentials")

class JobSearchRequest(BaseModel):
    email: str
    keywords: str
    location: str
    max_applications: int = 5

class JobSearchResponse(BaseModel):
    status: str
    message: str
    job_count: Optional[int] = None

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "healthy", "message": "JobCity API is running"}

@app.post("/api/search-jobs")
async def search_jobs(
    request: JobSearchRequest,
    background_tasks: BackgroundTasks,
    job_data_model: JobDataModel = Depends(get_job_data_model)
):
    """
    Start an automated job search and application process
    """
    try:
        # Initialize the IndeedJobAgent
        agent = IndeedJobAgent(
            job_data_model=job_data_model,
            nlp_engine=nlp_engine,
            resume_customizer=resume_customizer,
            cover_letter_generator=cover_letter_generator,
            application_submission_engine=application_submission_engine
        )

        # Add job search task to background tasks
        background_tasks.add_task(
            agent.run_job_application_process,
            request.email,
            None,  # Password handled securely in the agent
            request.keywords,
            request.location,
            request.max_applications
        )

        return JobSearchResponse(
            status="success",
            message="Job search process started",
            job_count=request.max_applications
        )

    except Exception as e:
        logger.error(f"An error occurred during the job search process: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/job-listings")
async def get_job_listings(job_data_model: JobDataModel = Depends(get_job_data_model)):
    """
    Get all stored job listings
    """
    try:
        listings = job_data_model.get_job_listings()
        return {"status": "success", "listings": listings}
    except Exception as e:
        logger.error(f"Error retrieving job listings: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/applications")
async def get_applications(job_data_model: JobDataModel = Depends(get_job_data_model)):
    """
    Get all submitted applications
    """
    try:
        applications = job_data_model.get_submitted_applications()
        return {"status": "success", "applications": applications}
    except Exception as e:
        logger.error(f"Error retrieving applications: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

# Keep the main function for CLI usage
def main():
    email = "kasinadhsarma@gmail.com"
    password = getpass.getpass("Enter your Indeed password: ")
    keywords = "software engineer"
    location = "New York, NY"
    max_applications = 5

    # Create database session
    db = SessionLocal()
    try:
        # Initialize components with database session
        current_job_data_model = JobDataModel(db)
        current_nlp_engine = NLPEngine()
        current_resume_customizer = ResumeCustomizer()
        current_cover_letter_generator = CoverLetterGenerator()
        current_application_submission_engine = ApplicationSubmissionEngine()

        agent = IndeedJobAgent(
            job_data_model=current_job_data_model,
            nlp_engine=current_nlp_engine,
            resume_customizer=current_resume_customizer,
            cover_letter_generator=current_cover_letter_generator,
            application_submission_engine=current_application_submission_engine
        )

        try:
            agent.run_job_application_process(email, password, keywords, location, max_applications)
        except Exception as e:
            logger.error(f"An error occurred during the job application process: {str(e)}")
        finally:
            agent.close()
    finally:
        db.close()

if __name__ == "__main__":
    main()
