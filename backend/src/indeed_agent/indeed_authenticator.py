import time
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException, NoSuchElementException

class IndeedAuthenticator:
    def __init__(self, browser):
        self.browser = browser

    def login(self, email, password):
        try:
            # Navigate to Indeed login page
            self.browser.get("https://secure.indeed.com/account/login")

            # Wait for email input field to be visible
            email_input = WebDriverWait(self.browser, 10).until(
                EC.visibility_of_element_located((By.ID, "ifl-InputFormField-3"))
            )
            email_input.send_keys(email)

            # Click on continue button
            continue_button = self.browser.find_element(By.ID, "ifl-SignInButton-0")
            continue_button.click()

            # Wait for password input field to be visible
            password_input = WebDriverWait(self.browser, 10).until(
                EC.visibility_of_element_located((By.ID, "ifl-InputFormField-7"))
            )
            password_input.send_keys(password)

            # Click on sign in button
            sign_in_button = self.browser.find_element(By.ID, "ifl-SignInButton-1")
            sign_in_button.click()

            # Wait for successful login (you may need to adjust this based on Indeed's behavior)
            WebDriverWait(self.browser, 10).until(
                EC.presence_of_element_located((By.CLASS_NAME, "gnav-LoggedInAccount"))
            )

            print("Successfully logged in to Indeed")
            return True

        except (TimeoutException, NoSuchElementException) as e:
            print(f"Failed to log in to Indeed: {str(e)}")
            return False

    def is_logged_in(self):
        try:
            # Check for the presence of a logged-in user element
            self.browser.find_element(By.CLASS_NAME, "gnav-LoggedInAccount")
            return True
        except NoSuchElementException:
            return False

    def logout(self):
        if self.is_logged_in():
            try:
                # Click on the user menu
                user_menu = WebDriverWait(self.browser, 10).until(
                    EC.element_to_be_clickable((By.CLASS_NAME, "gnav-LoggedInAccount"))
                )
                user_menu.click()

                # Click on the sign out button
                sign_out_button = WebDriverWait(self.browser, 10).until(
                    EC.element_to_be_clickable((By.LINK_TEXT, "Sign Out"))
                )
                sign_out_button.click()

                # Wait for the login button to appear, indicating successful logout
                WebDriverWait(self.browser, 10).until(
                    EC.presence_of_element_located((By.LINK_TEXT, "Sign in"))
                )

                print("Successfully logged out from Indeed")
                return True
            except (TimeoutException, NoSuchElementException) as e:
                print(f"Failed to log out from Indeed: {str(e)}")
                return False
        else:
            print("Already logged out from Indeed")
            return True
