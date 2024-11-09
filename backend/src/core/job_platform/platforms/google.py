"""
Google Jobs-specific implementation of job platform integration.
"""
from typing import Dict, Any, Optional
import logging
from sqlalchemy.orm import Session
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from fastapi import HTTPException, status

from ..integration import BaseJobPlatformIntegration
from ...auth.models import User

logger = logging.getLogger(__name__)

class GoogleJobsIntegration(BaseJobPlatformIntegration):
    def __init__(self, redis_client):
        super().__init__("google", redis_client)
        self.base_url = "https://www.google.com/about/careers"
        self.login_url = "https://accounts.google.com/signin"

    async def login(self, credentials: Dict[str, Any]) -> bool:
        """Login to Google account."""
        try:
            self.driver.get(self.login_url)

            # Input email
            email_success = await self.safe_input(
                (By.CSS_SELECTOR, "input[type='email']"),
                credentials["email"]
            )
            if not email_success:
                raise HTTPException(
                    status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                    detail="Failed to input email"
                )

            # Click next
            next_success = await self.safe_click(
                (By.CSS_SELECTOR, "#identifierNext")
            )
            if not next_success:
                raise HTTPException(
                    status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                    detail="Failed to click next button"
                )

            # Wait for password field and input password
            password_success = await self.safe_input(
                (By.CSS_SELECTOR, "input[type='password']"),
                credentials["password"],
                timeout=15  # Google sometimes needs more time
            )
            if not password_success:
                raise HTTPException(
                    status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                    detail="Failed to input password"
                )

            # Click sign in button
            signin_success = await self.safe_click(
                (By.CSS_SELECTOR, "#passwordNext")
            )
            if not signin_success:
                raise HTTPException(
                    status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                    detail="Failed to click sign in button"
                )

            # Check for successful login
            try:
                WebDriverWait(self.driver, 15).until(
                    EC.presence_of_element_located((By.CSS_SELECTOR, ".gb_k"))
                )
                return True
            except Exception as e:
                logger.error(f"Login verification failed: {str(e)}")
                return False

        except Exception as e:
            logger.error(f"Google login failed: {str(e)}")
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Login failed"
            )

    async def submit_application(
        self,
        job_url: str,
        user_data: Dict[str, Any],
        credentials: Dict[str, Any],
        db: Session
    ) -> bool:
        """Submit a job application through Google Careers."""
        try:
            # Initialize WebDriver if not already initialized
            if not self.driver:
                await self.initialize_driver()

            # Login to Google
            await self.login(credentials)

            # Navigate to job posting
            self.driver.get(job_url)

            # Wait for and click the apply button
            apply_button = WebDriverWait(self.driver, 10).until(
                EC.presence_of_element_located((By.CSS_SELECTOR, ".careers-apply-button"))
            )
            apply_button.click()

            # Handle application form
            try:
                # Fill personal information
                if user_data.get("full_name"):
                    await self.safe_input(
                        (By.CSS_SELECTOR, "input[name='name']"),
                        user_data["full_name"]
                    )

                if user_data.get("phone"):
                    await self.safe_input(
                        (By.CSS_SELECTOR, "input[name='phone']"),
                        user_data["phone"]
                    )

                # Handle resume upload if required
                resume_upload = self.driver.find_element(By.CSS_SELECTOR, "input[type='file']")
                if resume_upload and user_data.get("resume_path"):
                    resume_upload.send_keys(user_data["resume_path"])

                # Fill additional questions if present
                questions = self.driver.find_elements(By.CSS_SELECTOR, ".application-question")
                for question in questions:
                    question_text = question.find_element(By.CSS_SELECTOR, "label").text.lower()
                    if "experience" in question_text and user_data.get("years_experience"):
                        await self.safe_input(
                            (By.CSS_SELECTOR, "input, textarea"),
                            str(user_data["years_experience"])
                        )
                    elif "why" in question_text and user_data.get("cover_letter"):
                        await self.safe_input(
                            (By.CSS_SELECTOR, "textarea"),
                            user_data["cover_letter"]
                        )

                # Check for and handle any CAPTCHA
                captcha_handled = await self.handle_captcha()
                if not captcha_handled:
                    return False

                # Submit application
                submit_success = await self.safe_click(
                    (By.CSS_SELECTOR, "button[type='submit']")
                )
                return submit_success

            except Exception as e:
                logger.error(f"Error filling application form: {str(e)}")
                return False

        except Exception as e:
            logger.error(f"Error submitting Google application: {str(e)}")
            return False

        finally:
            await self.cleanup()

    async def verify_application_status(self, job_url: str) -> Dict[str, Any]:
        """Check the status of a submitted application."""
        try:
            if not self.driver:
                await self.initialize_driver()

            self.driver.get(job_url)

            # Check for applied status
            try:
                status_element = WebDriverWait(self.driver, 5).until(
                    EC.presence_of_element_located((By.CSS_SELECTOR, ".application-status"))
                )
                return {
                    "status": status_element.text,
                    "applied": "submitted" in status_element.text.lower()
                }
            except Exception:
                return {
                    "status": "Unknown",
                    "applied": False
                }

        except Exception as e:
            logger.error(f"Error checking application status: {str(e)}")
            return {
                "status": "Error",
                "applied": False,
                "error": str(e)
            }

        finally:
            await self.cleanup()
