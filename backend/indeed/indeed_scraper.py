import time
import random
import json
import logging
from playwright.sync_api import sync_playwright, TimeoutError as PlaywrightTimeoutError

logging.basicConfig(level=logging.DEBUG, format='%(asctime)s - %(levelname)s - %(message)s')

class IndeedScraper:
    def __init__(self):
        self.base_url = "https://www.indeed.com"
        self.max_retries = 3
        self.timeout = 30000  # 30 seconds

    def search_jobs(self, query, location, num_pages=1):
        jobs = []
        with sync_playwright() as p:
            browser = p.chromium.launch(headless=True)
            context = browser.new_context(
                user_agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
            )
            page = context.new_page()
            page.set_viewport_size({"width": 1920, "height": 1080})

            for page_num in range(num_pages):
                url = f"{self.base_url}/jobs?q={query}&l={location}&start={page_num*10}"
                logging.info(f"Scraping page {page_num+1}: {url}")

                for attempt in range(self.max_retries):
                    try:
                        page.goto(url, wait_until="networkidle", timeout=self.timeout)
                        page.wait_for_selector('div[class*="job_seen_beacon"]', state="attached", timeout=self.timeout)
                        break
                    except PlaywrightTimeoutError:
                        if attempt < self.max_retries - 1:
                            logging.warning(f"Timeout on attempt {attempt+1}. Retrying...")
                            time.sleep(random.uniform(2, 5))
                        else:
                            logging.error(f"Failed to load page after {self.max_retries} attempts.")
                            continue

                logging.info(f"Page title: {page.title()}")
                job_cards = page.query_selector_all('div[class*="job_seen_beacon"]')
                logging.info(f"Found {len(job_cards)} job cards on page {page_num+1}")

                for card in job_cards:
                    self.inspect_job_card(card)
                    job = self._extract_job_info(card)
                    if job:
                        jobs.append(job)

                time.sleep(random.uniform(2, 5))  # Random delay between page loads

            browser.close()

        return jobs

    def inspect_job_card(self, card):
        logging.debug("Inspecting job card HTML structure:")
        logging.debug(card.inner_html())

        selectors = {
            'title': 'h2[class*="jobTitle"] a',
            'company': 'span[data-testid="company-name"]',
            'location': 'div[data-testid="text-location"]',
            'summary': 'div[class*="job-snippet"]',
            'url': 'h2[class*="jobTitle"] a'
        }

        for key, selector in selectors.items():
            element = card.query_selector(selector)
            if element:
                if key == 'url':
                    value = self.base_url + element.get_attribute('href')
                else:
                    value = element.inner_text()
                logging.debug(f"{key.capitalize()} found: {value}")
            else:
                logging.debug(f"{key.capitalize()} not found. Selector: {selector}")

        # Additional debugging for salary and job type
        salary = card.query_selector('div[class*="salary-snippet"]')
        if salary:
            logging.debug(f"Salary found: {salary.inner_text()}")
        else:
            logging.debug("Salary not found")

        job_type = card.query_selector('div[class*="attribute_snippet"]')
        if job_type:
            logging.debug(f"Job type found: {job_type.inner_text()}")
        else:
            logging.debug("Job type not found")

    def _extract_job_info(self, card):
        try:
            title_element = card.query_selector('h2[class*="jobTitle"] a')
            title = title_element.inner_text() if title_element else None

            company_element = card.query_selector('span[data-testid="company-name"]')
            company = company_element.inner_text() if company_element else None

            location_element = card.query_selector('div[data-testid="text-location"]')
            location = location_element.inner_text() if location_element else None

            summary_element = card.query_selector('div[class*="job-snippet"]')
            summary = summary_element.inner_text() if summary_element else None

            job_url_element = card.query_selector('h2[class*="jobTitle"] a')
            job_url = self.base_url + job_url_element.get_attribute('href') if job_url_element else None

            salary_element = card.query_selector('div[class*="salary-snippet"]')
            salary = salary_element.inner_text() if salary_element else None

            job_type_element = card.query_selector('div[class*="attribute_snippet"]')
            job_type = job_type_element.inner_text() if job_type_element else None

            if not all([title, company, location, job_url]):
                logging.warning("Some essential job information is missing. Skipping this job.")
                return None

            job_info = {
                'title': title,
                'company': company,
                'location': location,
                'summary': summary,
                'url': job_url,
                'salary': salary,
                'job_type': job_type
            }
            logging.info(f"Extracted job info: {job_info}")
            return job_info
        except Exception as e:
            logging.error(f"Error extracting job info: {str(e)}")
            return None

    def extract_job_info(self, job_url: str) -> dict:
        with sync_playwright() as p:
            browser = p.chromium.launch(headless=True)
            context = browser.new_context(
                user_agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
            )
            page = context.new_page()
            page.set_viewport_size({"width": 1920, "height": 1080})

            for attempt in range(self.max_retries):
                try:
                    page.goto(job_url, wait_until="networkidle", timeout=self.timeout)
                    page.wait_for_selector('div[class*="jobsearch-JobComponent"]', state="attached", timeout=self.timeout)
                    break
                except PlaywrightTimeoutError:
                    if attempt < self.max_retries - 1:
                        logging.warning(f"Timeout on attempt {attempt+1}. Retrying...")
                        time.sleep(random.uniform(2, 5))
                    else:
                        logging.error(f"Failed to load page after {self.max_retries} attempts.")
                        return None

            job_info = {}
            try:
                job_info['title'] = page.query_selector('h1[class*="jobsearch-JobInfoHeader-title"]').inner_text()
                job_info['company'] = page.query_selector('div[data-company-name="true"]').inner_text()
                job_info['location'] = page.query_selector('div[data-testid="job-location"]').inner_text()
                job_info['description'] = page.query_selector('div[id="jobDescriptionText"]').inner_text()
                salary_elem = page.query_selector('div[id="salaryInfoAndJobType"]')
                job_info['salary'] = salary_elem.inner_text() if salary_elem else None
                job_info['url'] = job_url
            except Exception as e:
                logging.error(f"Error extracting job info: {str(e)}")
                return None

            browser.close()
            return job_info

def main():
    scraper = IndeedScraper()
    jobs = scraper.search_jobs("Software Engineer", "New York, NY", num_pages=2)

    print(f"Found {len(jobs)} jobs")
    for i, job in enumerate(jobs[:5], 1):
        print(f"\nJob {i}:")
        print(json.dumps(job, indent=2))

    # Save all jobs to a JSON file
    with open('indeed_jobs.json', 'w') as f:
        json.dump(jobs, f, indent=2)

if __name__ == "__main__":
    main()
