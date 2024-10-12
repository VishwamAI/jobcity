from dataclasses import dataclass, field
from typing import List, Optional

@dataclass
class JobListing:
    title: str
    company: str
    location: str
    description: str
    url: str
    salary: Optional[str] = None
    posted_date: Optional[str] = None
    job_type: Optional[str] = None
    requirements: List[str] = field(default_factory=list)
    responsibilities: List[str] = field(default_factory=list)

@dataclass
class ApplicantInfo:
    name: str
    email: str
    phone: str
    resume_path: str
    linkedin_url: Optional[str] = None
    github_url: Optional[str] = None
    portfolio_url: Optional[str] = None
    skills: List[str] = field(default_factory=list)
    experience: List[str] = field(default_factory=list)
    education: List[str] = field(default_factory=list)

@dataclass
class ApplicationForm:
    job_listing: JobListing
    applicant_info: ApplicantInfo
    cover_letter: str
    custom_questions: List[dict] = field(default_factory=list)
    attachments: List[str] = field(default_factory=list)

class JobDataModel:
    def __init__(self):
        self.job_listings: List[JobListing] = []
        self.applicant_info: Optional[ApplicantInfo] = None
        self.submitted_applications: List[ApplicationForm] = []

    def add_job_listing(self, job_listing: JobListing):
        self.job_listings.append(job_listing)

    def set_applicant_info(self, applicant_info: ApplicantInfo):
        self.applicant_info = applicant_info

    def add_submitted_application(self, application: ApplicationForm):
        self.submitted_applications.append(application)

    def get_job_listings(self) -> List[JobListing]:
        return self.job_listings

    def get_applicant_info(self) -> Optional[ApplicantInfo]:
        return self.applicant_info

    def get_submitted_applications(self) -> List[ApplicationForm]:
        return self.submitted_applications
