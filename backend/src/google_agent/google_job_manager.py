import time
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException, NoSuchElementException

class GoogleJobManager:
    def __init__(self, browser):
        self.browser = browser

    def search_jobs(self, keywords, location):
        try:
            # Navigate to Google Careers page
            self.browser.get("https://careers.google.com/jobs/results/")

            # Wait for and fill in the "Search jobs" field
            search_input = WebDriverWait(self.browser, 10).until(
                EC.visibility_of_element_located((By.ID, "search-box"))
            )
            search_input.clear()
            search_input.send_keys(keywords)

            # Wait for and fill in the "Location" field
            location_input = WebDriverWait(self.browser, 10).until(
                EC.visibility_of_element_located((By.ID, "location-box"))
            )
            location_input.clear()
            location_input.send_keys(location)

            # Click on the search button
            search_button = self.browser.find_element(By.XPATH, "//button[@type='submit']")
            search_button.click()

            # Wait for job results to load
            WebDriverWait(self.browser, 10).until(
                EC.presence_of_element_located((By.CLASS_NAME, "gc-card__container"))
            )

            print(f"Successfully searched for {keywords} jobs in {location}")
            return True

        except (TimeoutException, NoSuchElementException) as e:
            print(f"Failed to search for jobs: {str(e)}")
            return False

    def get_job_listings(self, num_listings=10):
        job_listings = []
        try:
            # Find all job cards
            job_cards = self.browser.find_elements(By.CLASS_NAME, "gc-card__container")

            for i, card in enumerate(job_cards[:num_listings]):
                title = card.find_element(By.CLASS_NAME, "gc-card__title").text
                company = "Google"
                location = card.find_element(By.CLASS_NAME, "gc-card__location").text
                link = card.find_element(By.TAG_NAME, "a").get_attribute("href")

                job_listings.append({
                    "title": title,
                    "company": company,
                    "location": location,
                    "link": link
                })

            return job_listings

        except NoSuchElementException as e:
            print(f"Error while getting job listings: {str(e)}")
            return job_listings

    def apply_to_job(self, job_link):
        try:
            # Navigate to the job page
            self.browser.get(job_link)

            # Wait for the "Apply" button to be clickable
            apply_button = WebDriverWait(self.browser, 10).until(
                EC.element_to_be_clickable((By.XPATH, "//a[contains(@class, 'apply-button')]"))
            )
            apply_button.click()

            # Note: Google's application process might require authentication and multiple steps
            # You may need to add more logic here to handle the application process

            print(f"Successfully initiated application process for job: {job_link}")
            return True

        except (TimeoutException, NoSuchElementException) as e:
            print(f"Failed to apply to job {job_link}: {str(e)}")
            return False

    def run_job_application_process(self, keywords, location, num_applications=5):
        if self.search_jobs(keywords, location):
            job_listings = self.get_job_listings(num_applications)
            successful_applications = 0

            for job in job_listings:
                if self.apply_to_job(job['link']):
                    successful_applications += 1

            print(f"Initiated application process for {successful_applications} out of {len(job_listings)} jobs")
            return successful_applications
        else:
            print("Failed to search for jobs. Aborting application process.")
            return 0
