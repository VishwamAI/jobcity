from src.core.nlp_engine import NLPEngine
from src.core.job_data_model import JobListing, ApplicantInfo
import random

class CoverLetterGenerator:
    def __init__(self):
        self.nlp_engine = NLPEngine()

    def generate_cover_letter(self, job_listing: JobListing, applicant_info: ApplicantInfo) -> str:
        job_analysis = self.nlp_engine.analyze_job_description(job_listing.description)
        match_result = self.nlp_engine.match_profile_with_job(job_listing.description, self._create_applicant_profile(applicant_info))

        intro = self._generate_introduction(job_listing, applicant_info)
        body = self._generate_body(job_analysis, match_result, applicant_info)
        conclusion = self._generate_conclusion(job_listing)

        return f"{intro}\n\n{body}\n\n{conclusion}"

    def _create_applicant_profile(self, applicant_info: ApplicantInfo) -> str:
        return f"{applicant_info.name} is a professional with experience in {', '.join(applicant_info.skills)}. " \
               f"Their background includes {', '.join(applicant_info.experience)}. " \
               f"They have education in {', '.join(applicant_info.education)}."

    def _generate_introduction(self, job_listing: JobListing, applicant_info: ApplicantInfo) -> str:
        intro_templates = [
            f"Dear Hiring Manager,\n\nI am excited to apply for the {job_listing.title} position at {job_listing.company}. As a {applicant_info.skills[0]} professional, I believe my skills and experience align well with the requirements of this role.",
            f"Hello,\n\nI am writing to express my strong interest in the {job_listing.title} role at {job_listing.company}. With my background in {applicant_info.skills[0]}, I am confident in my ability to contribute to your team.",
            f"Greetings,\n\nI am thrilled to submit my application for the {job_listing.title} position at {job_listing.company}. My expertise in {applicant_info.skills[0]} and passion for {job_listing.company}'s mission make me an ideal candidate for this role."
        ]
        return random.choice(intro_templates)

    def _generate_body(self, job_analysis: dict, match_result: dict, applicant_info: ApplicantInfo) -> str:
        body = "Throughout my career, I have developed a strong skill set that aligns well with the requirements of this position:\n\n"

        for keyword in match_result['common_keywords'][:3]:
            relevant_experience = next((exp for exp in applicant_info.experience if keyword.lower() in exp.lower()), None)
            if relevant_experience:
                body += f"- {relevant_experience}\n"
            else:
                body += f"- I have experience with {keyword}, which is crucial for this role.\n"

        body += f"\nMy background in {', '.join(applicant_info.skills[:3])} positions me to tackle the responsibilities of this role effectively. "
        body += f"I am particularly drawn to the opportunity to {random.choice(job_analysis['responsibilities'])[:-1].lower()}. "
        body += f"My experience with {random.choice(match_result['common_keywords'])} will allow me to hit the ground running and make immediate contributions to your team."

        return body

    def _generate_conclusion(self, job_listing: JobListing) -> str:
        conclusion_templates = [
            f"I am excited about the opportunity to bring my unique skills and experiences to {job_listing.company} and would welcome the chance to discuss how I can contribute to your team. Thank you for your consideration, and I look forward to speaking with you soon.",
            f"I am eager to bring my passion and expertise to {job_listing.company} and contribute to your continued success. Thank you for considering my application. I look forward to the opportunity to discuss how I can add value to your team.",
            f"I am confident that my skills and enthusiasm make me a strong candidate for this position. I would welcome the opportunity to further discuss how my background and experiences can benefit {job_listing.company}. Thank you for your time and consideration."
        ]
        return random.choice(conclusion_templates)
