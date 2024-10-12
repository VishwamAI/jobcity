from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException, NoSuchElementException
from selenium.webdriver.support.ui import Select
import time

class MicrosoftJobManager:
    def __init__(self, browser):
        self.browser = browser
        self.base_url = "https://careers.microsoft.com/v2/global/en/home.html"

    def navigate_to_careers_page(self):
        self.browser.get(self.base_url)
        try:
            WebDriverWait(self.browser, 10).until(
                EC.presence_of_element_located((By.XPATH, "//input[@placeholder='Search by job title, ID, or keyword']"))
            )
        except TimeoutException:
            print("Timeout while loading Microsoft Careers page")
            return False
        return True

    def search_jobs(self, keyword, location):
        url = f"https://careers.microsoft.com/us/en/search-results?keywords={keyword}&location={location}"
        self.browser.get(url)
        print(f"Navigating to: {url}")

        try:
            WebDriverWait(self.browser, 30).until(
                EC.presence_of_element_located((By.TAG_NAME, "body"))
            )
            print("Page loaded successfully")
        except TimeoutException:
            print("Timeout waiting for page to load")
            return []

        print(f"Current URL: {self.browser.current_url}")
        print(f"Page title: {self.browser.title}")

        try:
            # Wait for job listings to be present
            job_listings = WebDriverWait(self.browser, 30).until(
                EC.presence_of_all_elements_located((By.CSS_SELECTOR, 'div[devin-id^="43"], div[devin-id^="60"], div[devin-id^="77"]'))
            )
            print(f"Found {len(job_listings)} job listings")

            jobs = []
            for job in job_listings:
                try:
                    title = job.find_element(By.CSS_SELECTOR, 'h2').text.strip()
                    location = job.find_element(By.CSS_SELECTOR, 'span[devin-id$="4"]').text.strip()
                    posted_date = job.find_element(By.CSS_SELECTOR, 'span[devin-id$="1"]').text.strip()
                    work_arrangement = job.find_element(By.CSS_SELECTOR, 'span[devin-id$="7"]').text.strip()
                    description = job.find_element(By.CSS_SELECTOR, 'span[aria-label="job description"]').text.strip()
                    link = job.find_element(By.CSS_SELECTOR, 'button[aria-label^="click to see details"]').get_attribute('aria-label').split(' for ')[1]

                    jobs.append({
                        'title': title,
                        'location': location,
                        'posted_date': posted_date,
                        'work_arrangement': work_arrangement,
                        'description': description,
                        'link': link
                    })
                except NoSuchElementException as e:
                    print(f"Error extracting job details: {str(e)}")
                    continue

            print(f"Successfully extracted {len(jobs)} jobs")
            return jobs

        except TimeoutException:
            print("Timeout waiting for job listings to load")
        except Exception as e:
            print(f"Error extracting jobs: {str(e)}")

        # Log JavaScript console for debugging
        logs = self.browser.get_log('browser')
        print("JavaScript console logs:")
        for log in logs:
            print(log)

        return []

    def analyze_page_source(self):
        print("Page title:", self.browser.title)
        print("Current URL:", self.browser.current_url)

        selectors = [
            'div[data-ph-at-id^="job-"]',
            'h2',
            'span[aria-label="job location icon"] + span',
            'span[aria-label="posted details icon"] + span',
            'span[aria-label="work site flexibility icon"] + span',
            'span[aria-label="job description"]',
            'button[aria-label^="click to see details"]'
        ]

        for selector in selectors:
            elements = self.browser.find_elements(By.CSS_SELECTOR, selector)
            print(f"Elements found with selector '{selector}': {len(elements)}")

        print("First 1000 characters of page source:")
        print(self.browser.page_source[:1000])

        # Check for any error messages
        error_messages = self.browser.find_elements(By.CSS_SELECTOR, '.error-message, .alert, .notification')
        if error_messages:
            print('Error messages found:')
            for error in error_messages:
                print(error.text)
        else:
            print('No error messages found on the page')

        # Print JavaScript console logs
        logs = self.browser.get_log('browser')
        if logs:
            print('JavaScript console logs:')
            for log in logs:
                print(log)
        else:
            print('No JavaScript console logs found')

    def check_for_captcha(self):
        return len(self.browser.find_elements(By.XPATH, "//*[contains(text(), 'CAPTCHA') or contains(text(), 'robot')]")) > 0

    def get_total_jobs(self):
        try:
            total_jobs_element = WebDriverWait(self.browser, 10).until(
                EC.presence_of_element_located((By.XPATH, "//h1[contains(text(), 'Showing')]"))
            )
            return total_jobs_element.text
        except:
            return None

    def extract_jobs_javascript(self):
        script = """
        return Array.from(document.querySelectorAll('div[data-ph-at-id^="job-"]')).map(job => ({
            title: job.querySelector('h2')?.textContent.trim(),
            location: job.querySelector('span[devin-id$="4"]')?.textContent.trim(),
            posted_date: job.querySelector('span[devin-id$="1"]')?.textContent.trim(),
            work_arrangement: job.querySelector('span[devin-id$="7"]')?.textContent.trim(),
            description: job.querySelector('span[aria-label="job description"]')?.textContent.trim(),
            link: job.querySelector('button[aria-label^="click to see details"]')?.getAttribute('aria-label').split(' for ')[1]
        })).filter(job => job.title && job.location);
        """
        return self.browser.execute_script(script)

    def extract_jobs_selenium(self):
        jobs = []
        job_elements = self.browser.find_elements(By.CSS_SELECTOR, 'div[data-ph-at-id^="job-"]')
        for job in job_elements:
            try:
                title = job.find_element(By.CSS_SELECTOR, 'h2').text.strip()
                location = job.find_element(By.CSS_SELECTOR, 'span[aria-label="job location icon"] + span').text.strip()
                posted_date = job.find_element(By.CSS_SELECTOR, 'span[aria-label="posted details icon"] + span').text.strip()
                work_arrangement = job.find_element(By.CSS_SELECTOR, 'span[aria-label="work site flexibility icon"] + span').text.strip()
                description = job.find_element(By.CSS_SELECTOR, 'span[aria-label="job description"]').text.strip()
                link = job.find_element(By.CSS_SELECTOR, 'button[aria-label^="click to see details"]').get_attribute('aria-label').split(' for ')[1]

                jobs.append({
                    "title": title,
                    "location": location,
                    "posted_date": posted_date,
                    "work_arrangement": work_arrangement,
                    "description": description,
                    "link": link
                })
            except Exception as e:
                print(f"Error extracting job details: {str(e)}")
        return jobs

    def analyze_page_source(self):
        print("Page title:", self.browser.title)
        print("Current URL:", self.browser.current_url)

        common_selectors = [
            '.jobs-list', '.job-card', '[data-automation-id="jobsList"]', '[data-automation-id="jobCard"]',
            '.job-tile', '.job-result'
        ]

        for selector in common_selectors:
            elements = self.browser.find_elements(By.CSS_SELECTOR, selector)
            print(f"Elements found with selector '{selector}': {len(elements)}")

        print("First 1000 characters of page source:")
        print(self.browser.page_source[:1000])

    def apply_to_job(self, job_url):
        self.browser.get(job_url)
        try:
            # Wait for the apply button to be clickable
            apply_button = WebDriverWait(self.browser, 20).until(
                EC.element_to_be_clickable((By.XPATH, "//button[contains(text(), 'Apply') or contains(text(), 'Apply now')]"))
            )
            self.browser.execute_script("arguments[0].click();", apply_button)

            # Wait for the application form to load
            WebDriverWait(self.browser, 20).until(
                EC.presence_of_element_located((By.TAG_NAME, "form"))
            )

            # Fill out the application form
            self.fill_application_form()

            # Handle potential multi-step application process
            while True:
                next_button = self.browser.find_elements(By.XPATH, "//button[contains(text(), 'Next') or contains(text(), 'Continue')]")
                if next_button:
                    self.browser.execute_script("arguments[0].click();", next_button[0])
                    WebDriverWait(self.browser, 20).until(
                        EC.presence_of_element_located((By.TAG_NAME, "form"))
                    )
                    self.fill_application_form()
                else:
                    break

            # Submit the application
            submit_button = WebDriverWait(self.browser, 20).until(
                EC.element_to_be_clickable((By.XPATH, "//button[contains(text(), 'Submit') or contains(text(), 'Apply')]"))
            )
            self.browser.execute_script("arguments[0].click();", submit_button)

            # Wait for confirmation message
            WebDriverWait(self.browser, 20).until(
                EC.presence_of_element_located((By.XPATH, "//div[contains(text(), 'Application submitted') or contains(text(), 'Thank you for applying')]"))
            )

            print("Application submitted successfully")
            return True

        except (TimeoutException, NoSuchElementException) as e:
            print(f"Error applying to job: {str(e)}")
            return False

    def fill_application_form(self):
        # Fill in basic information
        self.safe_send_keys("firstName", "John")
        self.safe_send_keys("lastName", "Doe")
        self.safe_send_keys("email", "john.doe@example.com")
        self.safe_send_keys("phone", "1234567890")

        # Additional fields that might be present
        self.safe_send_keys("resume", "/path/to/resume.pdf")
        self.safe_send_keys("coverLetter", "/path/to/cover_letter.pdf")
        self.safe_send_keys("linkedInProfile", "https://www.linkedin.com/in/johndoe")
        self.safe_send_keys("githubProfile", "https://github.com/johndoe")

        # Handle dropdown menus
        self.safe_select_option("country", "United States")
        self.safe_select_option("yearsOfExperience", "3-5 years")

        # Handle checkboxes
        self.safe_check_box("agreeToTerms")
        self.safe_check_box("willingToRelocate")

        # Handle radio buttons
        self.safe_select_radio("employmentType", "Full-time")

        print("Application form filled successfully")

    def safe_send_keys(self, element_id, text):
        try:
            element = WebDriverWait(self.browser, 10).until(
                EC.presence_of_element_located((By.ID, element_id))
            )
            element.send_keys(text)
        except Exception as e:
            print(f"Error filling in {element_id}: {str(e)}")

    def safe_select_option(self, element_id, option_text):
        try:
            select_element = WebDriverWait(self.browser, 10).until(
                EC.presence_of_element_located((By.ID, element_id))
            )
            select = Select(select_element)
            select.select_by_visible_text(option_text)
        except Exception as e:
            print(f"Error selecting option for {element_id}: {str(e)}")

    def safe_check_box(self, element_id):
        try:
            checkbox = WebDriverWait(self.browser, 10).until(
                EC.presence_of_element_located((By.ID, element_id))
            )
            if not checkbox.is_selected():
                checkbox.click()
        except Exception as e:
            print(f"Error checking box {element_id}: {str(e)}")

    def safe_select_radio(self, name, value):
        try:
            radio = WebDriverWait(self.browser, 10).until(
                EC.presence_of_element_located((By.XPATH, f"//input[@type='radio' and @name='{name}' and @value='{value}']"))
            )
            radio.click()
        except Exception as e:
            print(f"Error selecting radio button {name} with value {value}: {str(e)}")

    def run_job_search_and_apply(self, keyword, location):
        jobs = self.search_jobs(keyword, location)
        for job in jobs[:5]:  # Apply to the first 5 jobs
            self.apply_to_job(job['link'])
        print(f"Completed job search and apply process for {keyword} in {location}")

# Example usage:
# browser = webdriver.Chrome()
# manager = MicrosoftJobManager(browser)
# manager.run_job_search_and_apply("Software Engineer", "Redmond, WA")
# browser.quit()
