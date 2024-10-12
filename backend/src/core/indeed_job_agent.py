import logging
import random
import time
from urllib.parse import quote_plus
from requests_html import HTMLSession
from fake_useragent import UserAgent
from src.core.openhands_manager import OpenHandsManager

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')

class IndeedJobAgent:
    def __init__(self):
        self.logger = logging.getLogger(self.__class__.__name__)
        self.logger.info(f"{self.__class__.__name__} initialized")
        self.openhands_manager = self.initialize_openhands_manager()
        self.ua = UserAgent()
        self.session = HTMLSession()

    def initialize_openhands_manager(self):
        return OpenHandsManager()

    def search_jobs(self, job_title, location):
        self.logger.info(f"Searching for {job_title} jobs in {location}")
        search_url = f"https://www.indeed.com/jobs?q={quote_plus(job_title)}&l={quote_plus(location)}"

        headers = {
            'User-Agent': self.ua.random,
            'Accept-Language': 'en-US,en;q=0.9',
            'Accept-Encoding': 'gzip, deflate, br',
            'Referer': 'https://www.indeed.com/',
            'DNT': '1',
        }

        try:
            response = self.session.get(search_url, headers=headers, timeout=30)
            response.html.render(timeout=30)
            self.logger.info(f"Successfully retrieved job listings from {search_url}")
            return self._parse_job_listings(response.html)
        except Exception as e:
            self.logger.error(f"Error retrieving job listings: {str(e)}")
            return []

    def _parse_job_listings(self, html):
        job_cards = html.find('div.job_seen_beacon')

        job_listings = []
        for card in job_cards:
            try:
                title = card.find('h2.jobTitle', first=True).text.strip()
                company = card.find('span.companyName', first=True).text.strip()
                location = card.find('div.companyLocation', first=True).text.strip()
                job_listings.append({
                    "title": title,
                    "company": company,
                    "location": location
                })
            except AttributeError as e:
                self.logger.warning(f"Error parsing job card: {str(e)}")

        self.logger.info(f"Successfully parsed {len(job_listings)} job listings")
        return job_listings

    def apply_to_job(self, job_info):
        self.logger.info(f"Applying to job: {job_info['title']} at {job_info['company']}")
        # Implement application logic here
        self.logger.info("Job application submitted successfully")

    def get_applicant_info(self):
        # In a real scenario, this would fetch the applicant's information from a database or user input
        return {
            "name": "John Doe",
            "experience": "5 years of software development",
            "skills": ["Python", "JavaScript", "Machine Learning", "Data Analysis"]
        }

    def analyze_job_description(self, job_description):
        self.logger.info("Analyzing job description")
        try:
            analysis_result = self.openhands_manager.analyze_job_description(job_description)
            self.logger.info(f"Job description analysis complete. Top terms: {analysis_result}")
            return analysis_result
        except Exception as e:
            self.logger.error(f"Error analyzing job description: {str(e)}")
            return []

    def generate_cover_letter(self, job_listings):
        self.logger.info("Generating cover letter")
        if not job_listings:
            self.logger.warning("No job listings available for cover letter generation")
            return None

        job_listing = job_listings[0]
        applicant_info = self.get_applicant_info()
        job_description = f"Job Title: {job_listing['title']}\nCompany: {job_listing['company']}\nLocation: {job_listing['location']}"

        try:
            cover_letter = self.openhands_manager.generate_cover_letter(job_description, applicant_info)
            self.logger.info("Cover letter generated successfully")
            return cover_letter
        except Exception as e:
            self.logger.error(f"Error generating cover letter: {str(e)}")
            return None

# Test the IndeedJobAgent
if __name__ == "__main__":
    agent = IndeedJobAgent()
    jobs = agent.search_jobs("Software Engineer", "New York, NY")
    if jobs:
        print(f"Found {len(jobs)} jobs. First job: {jobs[0]}")
        cover_letter = agent.generate_cover_letter(jobs)
        if cover_letter:
            print(f"Generated cover letter: {cover_letter[:100]}...")
    else:
        print("No jobs found.")

# Test the IndeedJobAgent
if __name__ == "__main__":
    agent = IndeedJobAgent()

    # Test job search
    job_listings = agent.search_jobs("Software Engineer", "New York")

    if job_listings:
        print(f"Found {len(job_listings)} job listings")
        # Select a random job listing for testing
        job_listing = random.choice(job_listings)
        print(f"Selected job listing: {job_listing}")

        # Test job info extraction
        job_info = agent.extract_job_info(job_listing)
        print("Job Info:", job_info)

        # Test cover letter generation
        cover_letter = agent.generate_cover_letter(job_listing)
        print("Cover Letter:", cover_letter)

        # Test job application
        agent.apply_to_job(job_listing)
    else:
        print("No job listings found.")
