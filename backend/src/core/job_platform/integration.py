"""
Base integration module for job platforms.
Provides common functionality and security features for all platform integrations.
"""
from typing import Optional, Dict, Any, List
import logging
from fastapi import HTTPException, status
from redis import Redis
from sqlalchemy.orm import Session
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException, WebDriverException

from .security import JobPlatformSecurity
from ..auth.models import User
from ..database import get_db

logger = logging.getLogger(__name__)

class BaseJobPlatformIntegration:
    def __init__(self, platform: str, redis_client: Redis):
        self.platform = platform.lower()
        self.security = JobPlatformSecurity(redis_client)
        self.driver: Optional[webdriver.Chrome] = None
        self.wait_timeout = 10

    async def initialize_driver(self):
        """Initialize Selenium WebDriver with appropriate options."""
        options = webdriver.ChromeOptions()
        options.add_argument('--headless')
        options.add_argument('--no-sandbox')
        options.add_argument('--disable-dev-shm-usage')
        self.driver = webdriver.Chrome(options=options)
        self.driver.implicitly_wait(self.wait_timeout)

    async def verify_and_prepare_application(
        self,
        user_id: int,
        credentials: Dict[str, Any],
        db: Session
    ) -> Dict[str, Any]:
        """
        Verify user eligibility and prepare credentials for job application.
        """
        # Verify user eligibility
        await self.security.verify_application_eligibility(user_id, self.platform, db)

        # Secure and validate credentials
        return self.security.secure_credentials(credentials)

    async def safe_click(self, element_locator: tuple, timeout: int = None) -> bool:
        """Safely click an element with proper waiting and error handling."""
        try:
            timeout = timeout or self.wait_timeout
            element = WebDriverWait(self.driver, timeout).until(
                EC.element_to_be_clickable(element_locator)
            )
            element.click()
            return True
        except (TimeoutException, WebDriverException) as e:
            logger.error(f"Error clicking element {element_locator}: {str(e)}")
            return False

    async def safe_input(self, element_locator: tuple, text: str, timeout: int = None) -> bool:
        """Safely input text into an element with proper waiting and error handling."""
        try:
            timeout = timeout or self.wait_timeout
            element = WebDriverWait(self.driver, timeout).until(
                EC.presence_of_element_located(element_locator)
            )
            element.clear()
            element.send_keys(text)
            return True
        except (TimeoutException, WebDriverException) as e:
            logger.error(f"Error inputting text to element {element_locator}: {str(e)}")
            return False

    async def handle_captcha(self) -> bool:
        """
        Handle CAPTCHA if present. Returns True if no CAPTCHA or if handled successfully.
        """
        # Check for common CAPTCHA elements
        try:
            captcha_present = WebDriverWait(self.driver, 3).until(
                EC.presence_of_element_located((By.CSS_SELECTOR, "[data-sitekey]"))
            )
            if captcha_present:
                logger.warning("CAPTCHA detected - manual intervention required")
                raise HTTPException(
                    status_code=status.HTTP_428_PRECONDITION_REQUIRED,
                    detail="CAPTCHA verification required"
                )
        except TimeoutException:
            return True  # No CAPTCHA found

        return False

    async def submit_application(
        self,
        job_url: str,
        user_data: Dict[str, Any],
        credentials: Dict[str, Any],
        db: Session
    ) -> bool:
        """
        Base method for submitting a job application.
        Should be implemented by platform-specific classes.
        """
        raise NotImplementedError(
            "submit_application must be implemented by platform-specific classes"
        )

    async def cleanup(self):
        """Clean up resources."""
        if self.driver:
            try:
                self.driver.quit()
            except Exception as e:
                logger.error(f"Error cleaning up WebDriver: {str(e)}")
            finally:
                self.driver = None

    def __del__(self):
        """Ensure cleanup on object destruction."""
        import asyncio
        try:
            loop = asyncio.get_event_loop()
            if loop.is_running():
                loop.create_task(self.cleanup())
            else:
                loop.run_until_complete(self.cleanup())
        except Exception:
            pass
