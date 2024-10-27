import logging
import os
from typing import Optional, Dict, Any, List
from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session

from src.core.indeed_job_agent import IndeedJobAgent
from src.core.job_data_model import JobDataModel
from src.core.nlp_engine import NLPEngine
from src.core.resume_customizer import ResumeCustomizer
from src.core.cover_letter_generator import CoverLetterGenerator
from src.core.application_submission_engine import ApplicationSubmissionEngine
from src.core.database import get_db
from src.config import settings

# Configure logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

# Initialize FastAPI app
app = FastAPI(title="JobCity API")

@app.get("/health")
async def health_check():
    """Health check endpoint."""
    return {"status": "healthy"}

@app.get("/")
async def root():
    """Root endpoint."""
    return {"message": "Welcome to JobCity API"}

def main():
    # Configuration from settings
    email = settings.DEV_EMAIL if settings.DEV_MODE else settings.INDEED_EMAIL
    password = settings.DEV_PASSWORD if settings.DEV_MODE else settings.INDEED_PASSWORD

    if not settings.DEV_MODE and (not email or not password):
        logger.error("Indeed credentials not found in environment variables")
        return

    keywords = os.getenv('JOB_KEYWORDS', "software engineer")
    location = os.getenv('JOB_LOCATION', "New York, NY")
    max_applications = int(os.getenv('MAX_APPLICATIONS', "5"))

    # Initialize components
    job_data_model = JobDataModel()
    nlp_engine = NLPEngine()
    resume_customizer = ResumeCustomizer()
    cover_letter_generator = CoverLetterGenerator()
    application_submission_engine = ApplicationSubmissionEngine()

    # Initialize the IndeedJobAgent with all required components
    agent = IndeedJobAgent()
    agent.job_data_model = job_data_model
    agent.nlp_engine = nlp_engine
    agent.resume_customizer = resume_customizer
    agent.cover_letter_generator = cover_letter_generator
    agent.application_submission_engine = application_submission_engine

    try:
        # Run the job application process
        agent.run_job_application_process(email, password, keywords, location, max_applications)
    except Exception as e:
        logger.error(f"An error occurred during the job application process: {str(e)}")
    finally:
        # Ensure the browser is closed
        agent.close()

@app.get("/api/jobs/")
async def search_jobs(
    keywords: str,
    location: str,
    db: Session = Depends(get_db)
) -> Dict[str, List[Dict[str, str]]]:
    """
    Search for jobs with given keywords and location.

    Args:
        keywords: Job search keywords
        location: Job location
        db: Database session dependency

    Returns:
        Dictionary containing list of job listings

    Raises:
        HTTPException: If job search fails
    """
    agent = None
    try:
        agent = IndeedJobAgent()
        jobs = agent.search_jobs(keywords, location)
        return {"jobs": jobs}
    except Exception as e:
        logger.error(f"Error searching jobs: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to search jobs")
    finally:
        if agent:
            agent.close()

if __name__ == "__main__":
    import uvicorn
    if os.getenv("RUN_API", "false").lower() == "true":
        # Run as API server
        uvicorn.run(
            "main:app",
            host=settings.API_HOST,
            port=settings.API_PORT,
            reload=settings.DEBUG
        )
    else:
        # Run as CLI application
        main()
