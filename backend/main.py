import logging
import getpass
from src.indeed_bot_facade import IndeedBotFacade

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

    # Initialize the IndeedBotFacade
    bot = IndeedBotFacade(headless=False)  # Set to False for debugging

    try:
        # Run the job application process
        bot.run_job_application_process(email, password, keywords, location, max_applications)
    except Exception as e:
        logger.error(f"An error occurred during the job application process: {str(e)}")
    finally:
        # Ensure the browser is closed
        bot.close()

if __name__ == "__main__":
    main()
