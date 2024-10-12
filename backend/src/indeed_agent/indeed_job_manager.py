import time
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException, NoSuchElementException

class IndeedJobManager:
    def __init__(self, browser):
        self.browser = browser

    def search_jobs(self, keywords, location):
        try:
            # Navigate to Indeed job search page
            self.browser.get("https://www.indeed.com/")

            # Wait for and fill in the "what" field
            what_input = WebDriverWait(self.browser, 10).until(
                EC.visibility_of_element_located((By.ID, "text-input-what"))
            )
            what_input.clear()
            what_input.send_keys(keywords)

            # Wait for and fill in the "where" field
            where_input = WebDriverWait(self.browser, 10).until(
                EC.visibility_of_element_located((By.ID, "text-input-where"))
            )
            where_input.clear()
            where_input.send_keys(location)

            # Click on the search button
            search_button = self.browser.find_element(By.CLASS_NAME, "yosegi-InlineWhatWhere-primaryButton")
            search_button.click()

            # Wait for job results to load
            WebDriverWait(self.browser, 10).until(
                EC.presence_of_element_located((By.CLASS_NAME, "jobsearch-ResultsList"))
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
            job_cards = self.browser.find_elements(By.CLASS_NAME, "job_seen_beacon")

            for i, card in enumerate(job_cards[:num_listings]):
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

            return job_listings

        except NoSuchElementException as e:
            print(f"Error while getting job listings: {str(e)}")
            return job_listings

    def apply_to_job(self, job_link):
        try:
            # Navigate to the job page
            self.browser.get(job_link)

            # Wait for the "Apply now" button to be clickable
            apply_button = WebDriverWait(self.browser, 10).until(
                EC.element_to_be_clickable((By.CLASS_NAME, "jobsearch-IndeedApplyButton-newDesign"))
            )
            apply_button.click()

            # Switch to the application iframe
            WebDriverWait(self.browser, 10).until(
                EC.frame_to_be_available_and_switch_to_it((By.ID, "indeedapply-iframe"))
            )

            # Fill out application form (this part may vary depending on the job)
            # You may need to add more logic here to handle different types of application forms

            # Submit the application
            submit_button = WebDriverWait(self.browser, 10).until(
                EC.element_to_be_clickable((By.ID, "indeedApplyButton"))
            )
            submit_button.click()

            print(f"Successfully applied to job: {job_link}")
            return True

        except (TimeoutException, NoSuchElementException) as e:
            print(f"Failed to apply to job {job_link}: {str(e)}")
            return False

        finally:
            # Switch back to the main content
            self.browser.switch_to.default_content()

    def run_job_application_process(self, keywords, location, num_applications=5):
        if self.search_jobs(keywords, location):
            job_listings = self.get_job_listings(num_applications)
            successful_applications = 0

            for job in job_listings:
                if self.apply_to_job(job['link']):
                    successful_applications += 1

            print(f"Applied to {successful_applications} out of {len(job_listings)} jobs")
            return successful_applications
        else:
            print("Failed to search for jobs. Aborting application process.")
            return 0
