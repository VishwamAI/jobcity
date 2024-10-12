from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from src.indeed_authenticator import IndeedAuthenticator
from src.indeed_job_manager import IndeedJobManager
import logging

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

    def login(self, email: str, password: str) -> bool:
        return self.authenticator.login(email, password)

    def search_jobs(self, keywords: str, location: str):
        return self.job_manager.search_jobs(keywords, location)

    def apply_to_job(self, job_link: str) -> bool:
        return self.job_manager.apply_to_job(job_link)

    def run_job_application_process(self, email: str, password: str, keywords: str, location: str, max_applications: int = 10):
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
        self.browser.quit()
