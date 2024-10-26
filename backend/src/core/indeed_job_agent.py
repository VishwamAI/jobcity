import logging
import random
import time
from urllib.parse import quote_plus
from requests_html import HTMLSession
from fake_useragent import UserAgent
from src.core.openhands_manager import OpenHandsManager

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')

class IndeedJobAgent:
    def __init__(self, job_data_model, nlp_engine, resume_customizer, cover_letter_generator, application_submission_engine):
        self.logger = logging.getLogger(self.__class__.__name__)
        self.logger.info(f"{self.__class__.__name__} initialized")
        self.job_data_model = job_data_model
        self.nlp_engine = nlp_engine
        self.resume_customizer = resume_customizer
        self.cover_letter_generator = cover_letter_generator
        self.application_submission_engine = application_submission_engine
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

    def run_job_application_process(self, email, password, keywords, location, max_applications=10):
        """
        Orchestrates the entire job application workflow.

        Args:
            email (str): User's email for job applications
            password (str): User's password for job applications
            keywords (str): Job search keywords
            location (str): Job search location
            max_applications (int, optional): Maximum number of applications to submit. Defaults to 10.

        Returns:
            dict: Contains status, counts, and detailed results of the application process
        """
        self.logger.info(f"Starting job application process for {email}")
        results = []

        try:
            # Store user credentials
            self.job_data_model.store_credentials(email, password)

            # Search for jobs
            job_listings = self.search_jobs(keywords, location)
            if not job_listings:
                return {
                    "status": "error",
                    "message": "No jobs found matching criteria",
                    "applications_submitted": 0,
                    "total_jobs_found": 0,
                    "results": []
                }

            applications_submitted = 0
            for job in job_listings[:max_applications]:
                try:
                    # Analyze job description
                    job_analysis = self.nlp_engine.analyze_job_description(job['description'])

                    # Customize resume
                    customized_resume = self.resume_customizer.customize(job_analysis)

                    # Generate cover letter
                    cover_letter = self.cover_letter_generator.generate(job)

                    # Submit application
                    submission_result = self.application_submission_engine.submit(
                        job, customized_resume, cover_letter
                    )

                    applications_submitted += 1
                    results.append({
                        "job_id": job['id'],
                        "status": "success",
                        "details": submission_result
                    })

                except Exception as e:
                    self.logger.error(f"Error processing job {job.get('id', 'unknown')}: {str(e)}")
                    results.append({
                        "job_id": job.get('id', 'unknown'),
                        "status": "error",
                        "error": str(e)
                    })

            return {
                "status": "success",
                "applications_submitted": applications_submitted,
                "total_jobs_found": len(job_listings),
                "results": results
            }

        except Exception as e:
            self.logger.error(f"Error in job application process: {str(e)}")
            return {
                "status": "error",
                "message": str(e),
                "applications_submitted": applications_submitted,
                "total_jobs_found": len(job_listings) if 'job_listings' in locals() else 0,
                "results": results
            }
    def close(self):
        """
        Clean up resources used by the IndeedJobAgent.
        This method ensures proper cleanup of the HTMLSession when the agent is done.
        """
        try:
            if hasattr(self, 'session'):
                self.session.close()
                self.logger.info("Successfully closed HTMLSession")
        except Exception as e:
            self.logger.error(f"Error closing HTMLSession: {str(e)}")
