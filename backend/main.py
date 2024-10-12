import logging
import getpass
from src.core.indeed_job_agent import IndeedJobAgent
from src.core.job_data_model import JobDataModel
from src.core.nlp_engine import NLPEngine
from src.core.resume_customizer import ResumeCustomizer
from src.core.cover_letter_generator import CoverLetterGenerator
from src.core.application_submission_engine import ApplicationSubmissionEngine

# Configure logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

def main():
    # Configuration
    email = "kasinadhsarma@gmail.com"
    password = getpass.getpass("Enter your Indeed password: ")
    keywords = "software engineer"
    location = "New York, NY"
    max_applications = 5

    # Initialize components
    job_data_model = JobDataModel()
    nlp_engine = NLPEngine()
    resume_customizer = ResumeCustomizer()
    cover_letter_generator = CoverLetterGenerator()
    application_submission_engine = ApplicationSubmissionEngine()

    # Initialize the IndeedJobAgent
    agent = IndeedJobAgent(
        job_data_model=job_data_model,
        nlp_engine=nlp_engine,
        resume_customizer=resume_customizer,
        cover_letter_generator=cover_letter_generator,
        application_submission_engine=application_submission_engine
    )

    try:
        # Run the job application process
        agent.run_job_application_process(email, password, keywords, location, max_applications)
    except Exception as e:
        logger.error(f"An error occurred during the job application process: {str(e)}")
    finally:
        # Ensure the browser is closed
        agent.close()

if __name__ == "__main__":
    main()
