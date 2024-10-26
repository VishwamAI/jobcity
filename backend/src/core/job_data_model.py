from typing import List, Optional
from sqlalchemy import Column, Integer, String, ForeignKey, JSON
from sqlalchemy.orm import relationship
from .database import Base

class JobListing(Base):
    __tablename__ = 'job_listings'

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    company = Column(String, nullable=False)
    location = Column(String, nullable=False)
    description = Column(String, nullable=False)
    url = Column(String, nullable=False)
    salary = Column(String)
    posted_date = Column(String)
    job_type = Column(String)
    requirements = Column(JSON, default=list)
    responsibilities = Column(JSON, default=list)

    applications = relationship("ApplicationForm", back_populates="job_listing")

class ApplicantInfo(Base):
    __tablename__ = 'applicant_info'

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    email = Column(String, nullable=False)
    phone = Column(String, nullable=False)
    resume_path = Column(String, nullable=False)
    linkedin_url = Column(String)
    github_url = Column(String)
    portfolio_url = Column(String)
    skills = Column(JSON, default=list)
    experience = Column(JSON, default=list)
    education = Column(JSON, default=list)

    applications = relationship("ApplicationForm", back_populates="applicant_info")

class ApplicationForm(Base):
    __tablename__ = 'application_forms'

    id = Column(Integer, primary_key=True, index=True)
    job_listing_id = Column(Integer, ForeignKey('job_listings.id'))
    applicant_info_id = Column(Integer, ForeignKey('applicant_info.id'))
    cover_letter = Column(String, nullable=False)
    custom_questions = Column(JSON, default=list)
    attachments = Column(JSON, default=list)

    job_listing = relationship("JobListing", back_populates="applications")
    applicant_info = relationship("ApplicantInfo", back_populates="applications")

class JobDataModel:
    def __init__(self, db_session):
        self.db = db_session
        self._credentials: Optional[dict] = None

    def add_job_listing(self, title: str, company: str, location: str, description: str, url: str) -> JobListing:
        job_listing = JobListing(
            title=title,
            company=company,
            location=location,
            description=description,
            url=url
        )
        self.db.add(job_listing)
        self.db.commit()
        self.db.refresh(job_listing)
        return job_listing

    def set_applicant_info(self, name: str, email: str, phone: str, resume_path: str) -> ApplicantInfo:
        applicant_info = ApplicantInfo(
            name=name,
            email=email,
            phone=phone,
            resume_path=resume_path
        )
        self.db.add(applicant_info)
        self.db.commit()
        self.db.refresh(applicant_info)
        return applicant_info

    def add_submitted_application(self, job_listing_id: int, status: str, submission_date: str) -> ApplicationForm:
        application = ApplicationForm(
            job_listing_id=job_listing_id,
            status=status,
            submission_date=submission_date
        )
        self.db.add(application)
        self.db.commit()
        self.db.refresh(application)
        return application

    def get_job_listings(self) -> List[JobListing]:
        return self.db.query(JobListing).all()

    def get_applicant_info(self) -> Optional[ApplicantInfo]:
        return self.db.query(ApplicantInfo).first()

    def get_submitted_applications(self) -> List[ApplicationForm]:
        return self.db.query(ApplicationForm).all()

    def store_credentials(self, email: str, password: str) -> None:
        """
        Securely store user credentials for job applications.

        Args:
            email (str): User's email address
            password (str): User's password
        """
        self._credentials = {
            'email': email,
            'password': password
        }
