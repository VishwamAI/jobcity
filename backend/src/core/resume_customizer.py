from src.core.nlp_engine import NLPEngine
from src.core.job_data_model import JobListing, ApplicantInfo
from typing import List, Dict

class ResumeCustomizer:
    def __init__(self):
        self.nlp_engine = NLPEngine()

    def customize_resume(self, job_listing: JobListing, applicant_info: ApplicantInfo) -> Dict[str, List[str]]:
        job_analysis = self.nlp_engine.analyze_job_description(job_listing.description)
        match_result = self.nlp_engine.match_profile_with_job(job_listing.description, self._create_applicant_profile(applicant_info))

        suggestions = {
            "skills": self._suggest_skills(job_analysis, match_result, applicant_info),
            "experience": self._suggest_experience(job_analysis, match_result, applicant_info),
            "education": self._suggest_education(job_analysis, applicant_info),
            "summary": self._suggest_summary(job_listing, match_result, applicant_info)
        }

        return suggestions

    def _create_applicant_profile(self, applicant_info: ApplicantInfo) -> str:
        return f"{applicant_info.name} is a professional with experience in {', '.join(applicant_info.skills)}. " \
               f"Their background includes {', '.join(applicant_info.experience)}. " \
               f"They have education in {', '.join(applicant_info.education)}."

    def _suggest_skills(self, job_analysis: dict, match_result: dict, applicant_info: ApplicantInfo) -> List[str]:
        suggestions = []
        missing_skills = set(job_analysis['keywords']) - set(match_result['common_keywords'])

        for skill in missing_skills:
            if any(skill.lower() in existing_skill.lower() for existing_skill in applicant_info.skills):
                suggestions.append(f"Highlight your experience with {skill}")
            else:
                suggestions.append(f"Consider adding {skill} to your skills if you have experience with it")

        return suggestions

    def _suggest_experience(self, job_analysis: dict, match_result: dict, applicant_info: ApplicantInfo) -> List[str]:
        suggestions = []
        for responsibility in job_analysis['responsibilities']:
            if not any(word in responsibility.lower() for word in match_result['common_keywords']):
                suggestions.append(f"Add an experience that demonstrates your ability to {responsibility.lower()}")

        return suggestions

    def _suggest_education(self, job_analysis: dict, applicant_info: ApplicantInfo) -> List[str]:
        suggestions = []
        education_keywords = ['degree', 'bachelor', 'master', 'phd', 'certification']

        for requirement in job_analysis['requirements']:
            if any(keyword in requirement.lower() for keyword in education_keywords):
                if not any(req.lower() in ' '.join(applicant_info.education).lower() for req in requirement.split()):
                    suggestions.append(f"Highlight education or certifications related to: {requirement}")

        return suggestions

    def _suggest_summary(self, job_listing: JobListing, match_result: dict, applicant_info: ApplicantInfo) -> List[str]:
        suggestions = []

        top_keywords = match_result['common_keywords'][:3]
        suggestions.append(f"Tailor your summary to highlight your experience with {', '.join(top_keywords)}")

        suggestions.append(f"Mention your interest in {job_listing.company} and how your skills align with the {job_listing.title} role")

        if match_result['match_percentage'] < 70:
            suggestions.append("Emphasize transferable skills and how they apply to this role")

        return suggestions

    def apply_suggestions(self, applicant_info: ApplicantInfo, suggestions: Dict[str, List[str]]) -> ApplicantInfo:
        # This method would implement the suggestions to modify the resume
        # For now, we'll just return the original ApplicantInfo
        # In a real implementation, this would create a new ApplicantInfo object with the applied changes
        return applicant_info
