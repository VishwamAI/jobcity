from abc import ABC, abstractmethod
from src.core.openhands_manager import OpenHandsManager

class BaseJobAgent(ABC):
    def __init__(self):
        self.openhands_manager = OpenHandsManager()

    @abstractmethod
    def search_jobs(self):
        """
        Search for job listings.
        """
        pass

    def extract_job_info(self, job_listing):
        """
        Extract detailed information from a job listing.
        """
        try:
            analysis = self.openhands_manager.analyze_job_description(job_listing)
            return analysis
        except Exception as e:
            print(f"Error analyzing job description: {str(e)}")
            return None

    @abstractmethod
    def apply_to_job(self, job_info):
        """
        Apply to a job using the extracted job information.
        """
        pass

    def generate_cover_letter(self, job_info):
        """
        Generate a cover letter for a specific job.
        """
        try:
            applicant_info = self.get_applicant_info()  # This method should be implemented in child classes
            cover_letter = self.openhands_manager.generate_cover_letter(job_info, applicant_info)
            return cover_letter
        except Exception as e:
            print(f"Error generating cover letter: {str(e)}")
            return None

    @abstractmethod
    def get_applicant_info(self):
        """
        Get applicant information for cover letter generation.
        """
        pass
