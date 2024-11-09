"""
Indeed-specific implementation of job platform integration.
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

class IndeedIntegration(BaseJobPlatformIntegration):
    def __init__(self, redis_client):
        super().__init__("indeed", redis_client)
        self.base_url = "https://www.indeed.com"
        self.login_url = "https://secure.indeed.com/auth"

    async def login(self, credentials: Dict[str, Any]) -> bool:
        """Login to Indeed."""
        try:
            self.driver.get(self.login_url)

            # Input email
            email_success = await self.safe_input(
                (By.ID, "ifl-InputFormField-3"),
                credentials["email"]
            )
            if not email_success:
                raise HTTPException(
                    status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                    detail="Failed to input email"
                )

            # Click continue button
            continue_success = await self.safe_click(
                (By.CSS_SELECTOR, "button[type='submit']")
            )
            if not continue_success:
                raise HTTPException(
                    status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                    detail="Failed to click continue button"
                )

            # Wait for password field and input password
            password_success = await self.safe_input(
                (By.ID, "ifl-InputFormField-7"),
                credentials["password"]
            )
            if not password_success:
                raise HTTPException(
                    status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                    detail="Failed to input password"
                )

            # Click sign in button
            signin_success = await self.safe_click(
                (By.CSS_SELECTOR, "button[type='submit']")
            )
            if not signin_success:
                raise HTTPException(
                    status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                    detail="Failed to click sign in button"
                )

            # Check for successful login
            try:
                WebDriverWait(self.driver, 10).until(
                    EC.presence_of_element_located((By.CSS_SELECTOR, ".gnav-header"))
                )
                return True
            except Exception as e:
                logger.error(f"Login verification failed: {str(e)}")
                return False

        except Exception as e:
            logger.error(f"Indeed login failed: {str(e)}")
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
        """Submit a job application on Indeed."""
        try:
            # Initialize WebDriver if not already initialized
            if not self.driver:
                await self.initialize_driver()

            # Login to Indeed
            await self.login(credentials)

            # Navigate to job posting
            self.driver.get(job_url)

            # Wait for and click the apply button
            apply_button = WebDriverWait(self.driver, 10).until(
                EC.presence_of_element_located((By.CSS_SELECTOR, ".jobsearch-IndeedApplyButton-newDesign"))
            )
            apply_button.click()

            # Switch to application iframe
            iframe = WebDriverWait(self.driver, 10).until(
                EC.presence_of_element_located((By.CSS_SELECTOR, "#indeedapply-iframe"))
            )
            self.driver.switch_to.frame(iframe)

            # Fill out application form
            try:
                # Handle contact information
                if user_data.get("phone"):
                    await self.safe_input(
                        (By.CSS_SELECTOR, "input[type='tel']"),
                        user_data["phone"]
                    )

                # Handle work experience if required
                work_exp = self.driver.find_elements(By.CSS_SELECTOR, ".ia-WorkExperience")
                if work_exp and user_data.get("work_experience"):
                    for exp in user_data["work_experience"]:
                        await self.safe_input(
                            (By.CSS_SELECTOR, "input[name='jobTitle']"),
                            exp.get("title", "")
                        )
                        await self.safe_input(
                            (By.CSS_SELECTOR, "input[name='companyName']"),
                            exp.get("company", "")
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

            finally:
                # Switch back to default content
                self.driver.switch_to.default_content()

        except Exception as e:
            logger.error(f"Error submitting Indeed application: {str(e)}")
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
                    EC.presence_of_element_located((By.CSS_SELECTOR, ".indeed-apply-status"))
                )
                return {
                    "status": status_element.text,
                    "applied": "applied" in status_element.text.lower()
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
