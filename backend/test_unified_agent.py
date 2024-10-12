import logging
import random
from src.core.indeed_job_agent import IndeedJobAgent

def test_unified_agent():
    logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
    logger = logging.getLogger(__name__)

    logger.info("Starting unified agent test")
    try:
        agent = IndeedJobAgent()

        # Test job search
        job_listings = agent.search_jobs("Software Engineer", "New York")
        logger.info(f"Job search returned {len(job_listings)} listings")

        if job_listings:
            # Select a random job listing for testing
            job_listing = random.choice(job_listings)
            logger.info(f"Selected job listing: {job_listing}")

            # Test cover letter generation
            cover_letter = agent.generate_cover_letter(job_listing)
            logger.info(f"Generated cover letter (first 100 characters): {cover_letter[:100]}...")

            # Test job application
            agent.apply_to_job(job_listing)
        else:
            logger.warning("No job listings found.")

        # Test OpenHands integration
        logger.info("Testing OpenHands integration")
        try:
            job_description = "Software Engineer with 5+ years of experience in Python and machine learning"
            analysis = agent.openhands_manager.analyze_job_description(job_description)
            logger.info(f"OpenHands analysis result: {analysis}")

            applicant_info = {
                "name": "John Doe",
                "experience": "6 years of Python development",
                "skills": ["Python", "Django", "Flask", "SQL"]
            }
            cover_letter = agent.openhands_manager.generate_cover_letter(job_description, applicant_info)
            logger.info(f"OpenHands generated cover letter (first 100 characters): {cover_letter[:100]}...")
        except AttributeError:
            logger.warning("OpenHands integration not found in IndeedJobAgent")
        except Exception as e:
            logger.error(f"Error testing OpenHands integration: {str(e)}")

    except Exception as e:
        logger.error(f"An error occurred during testing: {str(e)}")

    logger.info("Unified agent test completed")

if __name__ == "__main__":
    test_unified_agent()
