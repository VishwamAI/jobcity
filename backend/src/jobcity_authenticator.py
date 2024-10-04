import random
import time

from selenium.common.exceptions import NoSuchElementException, TimeoutException, NoAlertPresentException, TimeoutException, UnexpectedAlertPresentException
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait

from loguru import logger


class AIHawkAuthenticator:

    def __init__(self, driver=None):
        self.driver = driver
        logger.debug(f"AIHawkAuthenticator initialized with driver: {driver}")

    def start(self):
        logger.info("Starting Chrome browser to log in to AIHawk.")
        if self.is_logged_in():
            logger.info("User is already logged in. Skipping login process.")
            return
        else:
            logger.info("User is not logged in. Proceeding with login.")
            self.login()

    def login(self, username=None, password=None):
        logger.info("Logging in to AIHawk...")
        self.driver.get("https://www.linkedin.com/login")
        if 'feed' in self.driver.current_url:
            logger.debug("User is already logged in.")
            return True
        try:
            login_success = self.enter_credentials(username, password)
            if not login_success:
                logger.debug("Login failed. Remaining on login page.")
                return False
            self.handle_security_check()
            return self.is_logged_in()
        except NoSuchElementException as e:
            logger.error(f"Could not log in to AIHawk. Element not found: {e}")
            return False

    def handle_login(self):
        logger.info("Navigating to the AIHawk login page...")
        self.driver.get("https://www.linkedin.com/login")
        if 'feed' in self.driver.current_url:
            logger.debug("User is already logged in.")
            return
        try:
            self.enter_credentials()
        except NoSuchElementException as e:
            logger.error(f"Could not log in to AIHawk. Element not found: {e}")
        self.handle_security_check()


    def enter_credentials(self, username, password):
        try:
            logger.debug("Enter credentials...")

            # Find username and password fields
            logger.debug("Finding username field...")
            username_field = self.driver.find_element(By.ID, "username")
            logger.debug("Finding password field...")
            password_field = self.driver.find_element(By.ID, "password")

            # Enter credentials
            logger.debug(f"Entering username: {username}")
            username_field.send_keys(username)
            logger.debug("Entering password")
            password_field.send_keys(password)

            # Submit the form
            logger.debug("Finding submit button...")
            submit_button = self.driver.find_element(By.CSS_SELECTOR, "button[type='submit']")
            logger.debug("Clicking submit button...")
            submit_button.click()

            check_interval = 4  # Interval to log the current URL
            elapsed_time = 0
            max_wait_time = 60  # Maximum wait time in seconds

            logger.debug(f"Starting login completion check (max wait time: {max_wait_time}s)")
            while elapsed_time < max_wait_time:
                # Log current URL every 4 seconds and check for successful login
                current_url = self.driver.current_url
                logger.info(f"Checking login status on {current_url} (Elapsed time: {elapsed_time}s)")

                # Check if the user is already on the feed page
                if 'feed' in current_url:
                    logger.debug("Login successful, redirected to feed page.")
                    return True
                elif 'checkpoint' in current_url:
                    logger.debug("Security checkpoint detected.")
                    return False
                elif 'login' in current_url:
                    logger.debug("Still on login page, possibly due to incorrect credentials.")
                    return False
                else:
                    logger.debug(f"Waiting for login completion. Current URL: {current_url}")

                time.sleep(check_interval)
                elapsed_time += check_interval

            logger.error(f"Login timed out after {max_wait_time} seconds.")
            return False

        except TimeoutException:
            logger.error("Login form not found. Aborting login.")
            return False
        except Exception as e:
            logger.error(f"Unexpected error during login: {str(e)}")
            return False


    def handle_security_check(self):
        try:
            logger.debug("Handling security check...")
            WebDriverWait(self.driver, 10).until(
                EC.url_contains('https://www.linkedin.com/checkpoint/challengesV2/')
            )
            logger.warning("Security checkpoint detected. Please complete the challenge.")
            WebDriverWait(self.driver, 300).until(
                EC.url_contains('https://www.linkedin.com/feed/')
            )
            logger.info("Security check completed")
        except TimeoutException:
            logger.error("Security check not completed. Please try again later.")

    def is_logged_in(self):
        try:
            self.driver.get('https://www.linkedin.com/feed')
            logger.debug("Checking if user is logged in...")
            WebDriverWait(self.driver, 3).until(
                EC.presence_of_element_located((By.CLASS_NAME, 'share-box-feed-entry__trigger'))
            )

            # Check for the presence of the "Start a post" button
            buttons = self.driver.find_elements(By.CLASS_NAME, 'share-box-feed-entry__trigger')
            logger.debug(f"Found {len(buttons)} 'Start a post' buttons")

            for i, button in enumerate(buttons):
                logger.debug(f"Button {i + 1} text: {button.text.strip()}")

            if any(button.text.strip().lower() == 'start a post' for button in buttons):
                logger.info("Found 'Start a post' button indicating user is logged in.")
                return True

            profile_img_elements = self.driver.find_elements(By.XPATH, "//img[contains(@alt, 'Photo of')]")
            if profile_img_elements:
                logger.info("Profile image found. Assuming user is logged in.")
                return True

            logger.info("Did not find 'Start a post' button or profile image. User might not be logged in.")
            return False

        except TimeoutException:
            logger.error("Page elements took too long to load or were not found.")
            return False
