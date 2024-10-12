import time
from typing import List, Dict
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException, NoSuchElementException
import logging

class IndeedJobManager:
    def __init__(self, browser: webdriver.Chrome):
        self.browser = browser
        self.logger = logging.getLogger(__name__)

    def search_jobs(self, keywords: str, location: str) -> List[Dict]:
        """
        Search for jobs on Indeed based on keywords and location.

        :param keywords: Job search keywords
        :param location: Job location
        :return: List of job listings
        """
        try:
            # Navigate to Indeed job search page
            self.browser.get("https://www.indeed.com/")

            # Enter job keywords
            keyword_input = WebDriverWait(self.browser, 10).until(
                EC.presence_of_element_located((By.ID, "text-input-what"))
            )
            keyword_input.send_keys(keywords)

            # Enter job location
            location_input = self.browser.find_element(By.ID, "text-input-where")
            location_input.clear()
            location_input.send_keys(location)

            # Submit search
            search_button = self.browser.find_element(By.CLASS_NAME, "yosegi-InlineWhatWhere-primaryButton")
            search_button.click()

            # Wait for search results to load
            WebDriverWait(self.browser, 10).until(
                EC.presence_of_element_located((By.CLASS_NAME, "jobsearch-ResultsList"))
            )

            # Extract job listings
            job_listings = self._extract_job_listings()

            self.logger.info(f"Found {len(job_listings)} job listings")
            return job_listings

        except (TimeoutException, NoSuchElementException) as e:
            self.logger.error(f"Job search failed: {str(e)}")
            return []

    def _extract_job_listings(self) -> List[Dict]:
        """
        Extract job listings from the search results page.

        :return: List of job listings
        """
        job_listings = []
        job_cards = self.browser.find_elements(By.CLASS_NAME, "job_seen_beacon")

        for card in job_cards:
            try:
                title = card.find_element(By.CLASS_NAME, "jobTitle").text
                company = card.find_element(By.CLASS_NAME, "companyName").text
                location = card.find_element(By.CLASS_NAME, "companyLocation").text
                link = card.find_element(By.CLASS_NAME, "jcs-JobTitle").get_attribute("href")

                job_listings.append({
                    "title": title,
                    "company": company,
                    "location": location,
                    "link": link
                })
            except NoSuchElementException:
                continue

        return job_listings

    def apply_to_job(self, job_link: str) -> bool:
        """
        Apply to a job using the provided link.

        :param job_link: URL of the job listing
        :return: True if application is successful, False otherwise
        """
        try:
            self.browser.get(job_link)

            # Wait for the apply button to be clickable
            apply_button = WebDriverWait(self.browser, 10).until(
                EC.element_to_be_clickable((By.CLASS_NAME, "jobsearch-IndeedApplyButton-newDesign"))
            )
            apply_button.click()

            # Switch to the application iframe
            WebDriverWait(self.browser, 10).until(
                EC.frame_to_be_available_and_switch_to_it((By.ID, "indeedapply-iframe"))
            )

            # Fill out application form (this will vary depending on the job)
            # You'll need to implement logic to handle different form types
            self._fill_application_form()

            # Submit application
            submit_button = WebDriverWait(self.browser, 10).until(
                EC.element_to_be_clickable((By.ID, "indeedApplyButton"))
            )
            submit_button.click()

            # Wait for confirmation
            WebDriverWait(self.browser, 10).until(
                EC.presence_of_element_located((By.CLASS_NAME, "ia-continueApplication"))
            )

            self.logger.info("Successfully applied to job")
            return True

        except (TimeoutException, NoSuchElementException) as e:
            self.logger.error(f"Job application failed: {str(e)}")
            return False

    def _fill_application_form(self):
        """
        Fill out the job application form.
        This method should be customized based on the specific fields in the form.
        """
        try:
            # Example: Fill out name fields
            first_name = WebDriverWait(self.browser, 10).until(
                EC.presence_of_element_located((By.ID, "input-firstName"))
            )
            first_name.send_keys("John")

            last_name = self.browser.find_element(By.ID, "input-lastName")
            last_name.send_keys("Doe")

            # Add more field handling as needed

        except (TimeoutException, NoSuchElementException) as e:
            self.logger.error(f"Error filling application form: {str(e)}")
            raise
