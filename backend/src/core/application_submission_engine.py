from src.core.web_interaction_manager import WebInteractionManager
from src.core.job_data_model import JobListing, ApplicantInfo, ApplicationForm
from typing import Dict, Any
import logging

class ApplicationSubmissionEngine:
    def __init__(self):
        self.web_manager = WebInteractionManager()
        logging.basicConfig(level=logging.INFO)
        self.logger = logging.getLogger(__name__)

    def submit_application(self, application_form: ApplicationForm) -> bool:
        self.logger.info(f"Submitting application for {application_form.job_listing.title} at {application_form.job_listing.company}")

        try:
            self.web_manager.navigate_to(application_form.job_listing.url)
            self._fill_application_form(application_form)
            self._upload_attachments(application_form.attachments)
            self._submit_form()
            self.logger.info("Application submitted successfully")
            return True
        except Exception as e:
            self.logger.error(f"Error submitting application: {str(e)}")
            return False
        finally:
            self.web_manager.close()

    def _fill_application_form(self, application_form: ApplicationForm):
        self._fill_personal_info(application_form.applicant_info)
        self._fill_cover_letter(application_form.cover_letter)
        self._answer_custom_questions(application_form.custom_questions)

    def _fill_personal_info(self, applicant_info: ApplicantInfo):
        fields_mapping = {
            "name": "input[name='fullName']",
            "email": "input[name='email']",
            "phone": "input[name='phone']",
            "linkedin_url": "input[name='linkedin']",
            "github_url": "input[name='github']",
            "portfolio_url": "input[name='portfolio']"
        }

        for field, selector in fields_mapping.items():
            value = getattr(applicant_info, field, None)
            if value:
                self.web_manager.input_text(selector, value)

    def _fill_cover_letter(self, cover_letter: str):
        cover_letter_selector = "textarea[name='coverLetter']"
        self.web_manager.input_text(cover_letter_selector, cover_letter)

    def _answer_custom_questions(self, custom_questions: Dict[str, Any]):
        for question, answer in custom_questions.items():
            question_selector = f"textarea[name='{question}']"
            self.web_manager.input_text(question_selector, answer)

    def _upload_attachments(self, attachments: list):
        for attachment in attachments:
            file_input_selector = "input[type='file']"
            self.web_manager.input_text(file_input_selector, attachment)

    def _submit_form(self):
        submit_button_selector = "button[type='submit']"
        self.web_manager.click_element(submit_button_selector)

    def verify_submission(self) -> bool:
        confirmation_message_selector = ".application-confirmation-message"
        confirmation_element = self.web_manager.find_element(confirmation_message_selector)
        return confirmation_element is not None
