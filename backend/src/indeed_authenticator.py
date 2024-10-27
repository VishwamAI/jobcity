import time
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException, NoSuchElementException
import logging
from src.config import settings

class IndeedAuthenticator:
    def __init__(self, browser: webdriver.Chrome):
        self.browser = browser
        self.logger = logging.getLogger(__name__)
        self._dev_mode = settings.DEV_MODE
        self._mock_logged_in = False

    def login(self, email: str = None, password: str = None) -> bool:
        """
        Attempt to log in to Indeed using the provided credentials.
        In development mode, uses mock credentials and bypasses actual login.

        :param email: User's email address (optional in dev mode)
        :param password: User's password (optional in dev mode)
        :return: True if login is successful, False otherwise
        """
        if self._dev_mode:
            self.logger.info("Development mode: Using mock authentication")
            self._mock_logged_in = True
            return True

        # Use provided credentials or fall back to configured ones
        email = email or settings.INDEED_EMAIL
        password = password or settings.INDEED_PASSWORD

        if not email or not password:
            self.logger.error("No credentials provided and none configured")
            return False

        try:
            # Navigate to Indeed login page
            self.browser.get("https://secure.indeed.com/auth")
            self.logger.info("Navigated to Indeed login page")

            # Wait for page to load completely
            WebDriverWait(self.browser, 30).until(
                EC.presence_of_element_located((By.TAG_NAME, "body"))
            )
            self.logger.info("Page loaded completely")

            # Wait for email input field and enter email
            try:
                # Wait for any overlay or loading indicator to disappear
                WebDriverWait(self.browser, 30).until_not(
                    EC.presence_of_element_located((By.CSS_SELECTOR, ".loading-overlay, .spinner"))
                )

                # Use JavaScript to wait for the email input to be present and visible
                email_input_present = WebDriverWait(self.browser, 30).until(
                    lambda driver: driver.execute_script("""
                        var input = document.querySelector('input[name="__email"]');
                        return input && input.offsetParent !== null;
                    """)
                )

                if not email_input_present:
                    self.logger.error("Email input field not found or not visible")
                    return False

                email_input = WebDriverWait(self.browser, 30).until(
                    EC.element_to_be_clickable((By.NAME, "__email"))
                )
                self.logger.info("Email input field found and clickable")
                email_input.clear()
                email_input.send_keys(email)
                self.logger.info("Email entered successfully")

                # Wait for the continue button to be enabled
                continue_button = WebDriverWait(self.browser, 30).until(
                    EC.element_to_be_clickable((By.XPATH, "//button[@type='submit']"))
                )
                self.logger.info("Continue button is clickable")
                continue_button.click()
                self.logger.info("Clicked continue button")
            except TimeoutException:
                self.logger.error("Email input field not found or not clickable within timeout")
                return False

            # Wait for password input field and enter password
            try:
                password_input = WebDriverWait(self.browser, 30).until(
                    EC.element_to_be_clickable((By.NAME, "__password"))
                )
                self.logger.info("Password input field found and clickable")
                password_input.clear()
                password_input.send_keys(password)
                self.logger.info("Password entered successfully")

                # Wait for the sign in button to be enabled
                sign_in_button = WebDriverWait(self.browser, 30).until(
                    EC.element_to_be_clickable((By.XPATH, "//button[@type='submit']"))
                )
                self.logger.info("Sign in button is clickable")
                sign_in_button.click()
                self.logger.info("Clicked sign in button")
            except TimeoutException:
                self.logger.error("Password input field or sign in button not found or not clickable within timeout")
                return False

            # Wait for successful login (you may need to adjust this based on Indeed's post-login page)
            try:
                WebDriverWait(self.browser, 30).until(
                    EC.presence_of_element_located((By.CLASS_NAME, "gnav-LoggedInAccountLink"))
                )
                self.logger.info("Successfully logged in to Indeed")
                return True
            except TimeoutException:
                self.logger.error("Login unsuccessful, logged-in element not found within timeout")
                return False

        except Exception as e:
            self.logger.error(f"Login failed: {str(e)}")
            return False

    def is_logged_in(self) -> bool:
        """
        Check if the user is currently logged in to Indeed.
        In development mode, returns mock login state.

        :return: True if logged in, False otherwise
        """
        if self._dev_mode:
            return self._mock_logged_in

        try:
            # Check for the presence of a logged-in user element
            self.browser.find_element(By.CLASS_NAME, "gnav-LoggedInAccountLink")
            return True
        except NoSuchElementException:
            return False

    def logout(self) -> bool:
        """
        Attempt to log out from Indeed.
        In development mode, just resets mock login state.

        :return: True if logout is successful, False otherwise
        """
        if self._dev_mode:
            self._mock_logged_in = False
            self.logger.info("Development mode: Mock logout successful")
            return True

        try:
            # Navigate to Indeed homepage
            self.browser.get("https://www.indeed.com/")

            # Click on the user menu to reveal the logout option
            user_menu = WebDriverWait(self.browser, 10).until(
                EC.element_to_be_clickable((By.CLASS_NAME, "gnav-LoggedInAccountLink"))
            )
            user_menu.click()

            # Click on the logout option
            logout_link = WebDriverWait(self.browser, 10).until(
                EC.element_to_be_clickable((By.LINK_TEXT, "Sign Out"))
            )
            logout_link.click()

            # Wait for logout to complete (adjust as needed)
            time.sleep(2)

            self.logger.info("Successfully logged out from Indeed")
            return True

        except (TimeoutException, NoSuchElementException) as e:
            self.logger.error(f"Logout failed: {str(e)}")
            return False
