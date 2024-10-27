import os
import logging
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from src.indeed_authenticator import IndeedAuthenticator
from src.indeed_job_manager import IndeedJobManager
from src.config import settings

class IndeedBotFacade:
    def __init__(self, headless: bool = True):
        self.logger = logging.getLogger(__name__)
        self.browser = self._initialize_browser(headless)
        self.authenticator = IndeedAuthenticator(self.browser)
        self.job_manager = IndeedJobManager(self.browser)

    def _initialize_browser(self, headless: bool) -> webdriver.Chrome:
        chrome_options = Options()
        if headless:
            chrome_options.add_argument("--headless")
        chrome_options.add_argument("--no-sandbox")
        chrome_options.add_argument("--disable-dev-shm-usage")
        return webdriver.Chrome(options=chrome_options)

    def login(self, email: str = None, password: str = None) -> bool:
        """
        Log in to Indeed using provided credentials or fall back to configured ones.
        In development mode, uses mock authentication.

        Args:
            email: User's email address (optional in dev mode)
            password: User's password (optional in dev mode)

        Returns:
            bool: True if login successful, False otherwise
        """
        # Use provided credentials or fall back to settings
        email = email or settings.INDEED_EMAIL
        password = password or settings.INDEED_PASSWORD
        return self.authenticator.login(email, password)

    def search_jobs(self, keywords: str, location: str):
        return self.job_manager.search_jobs(keywords, location)

    def apply_to_job(self, job_link: str) -> bool:
        return self.job_manager.apply_to_job(job_link)

    def run_job_application_process(self, email: str = None, password: str = None, keywords: str = None, location: str = None, max_applications: int = 10):
        """
        Run the automated job application process.
        In development mode, uses mock credentials if none provided.

        Args:
            email: Indeed account email (optional in dev mode)
            password: Indeed account password (optional in dev mode)
            keywords: Job search keywords (defaults to env var JOB_KEYWORDS)
            location: Job location (defaults to env var JOB_LOCATION)
            max_applications: Maximum number of applications to submit
        """
        # Use environment variables as fallbacks
        keywords = keywords or os.getenv('JOB_KEYWORDS', 'software engineer')
        location = location or os.getenv('JOB_LOCATION', 'New York, NY')
        max_applications = int(os.getenv('MAX_APPLICATIONS', str(max_applications)))

        if not self.login(email, password):
            self.logger.error("Failed to log in. Aborting job application process.")
            return

        job_listings = self.search_jobs(keywords, location)
        applications_submitted = 0

        for job in job_listings:
            if applications_submitted >= max_applications:
                break

            if self.apply_to_job(job['link']):
                applications_submitted += 1
                self.logger.info(f"Successfully applied to job: {job['title']} at {job['company']}")
            else:
                self.logger.warning(f"Failed to apply to job: {job['title']} at {job['company']}")

        self.logger.info(f"Job application process completed. Applied to {applications_submitted} jobs.")

    def close(self):
        """Clean up resources by closing the browser."""
        if hasattr(self, 'browser'):
            self.browser.quit()
