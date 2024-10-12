from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException

class WebInteractionManager:
    def __init__(self):
        self.driver = None

    def initialize_driver(self):
        """Initialize the Selenium WebDriver."""
        options = webdriver.ChromeOptions()
        options.add_argument('--headless')
        options.add_argument('--no-sandbox')
        options.add_argument('--disable-dev-shm-usage')
        self.driver = webdriver.Chrome(options=options)

    def navigate_to(self, url):
        """Navigate to the specified URL."""
        if not self.driver:
            self.initialize_driver()
        self.driver.get(url)

    def find_element(self, by, value, timeout=10):
        """Find an element on the page with a timeout."""
        try:
            element = WebDriverWait(self.driver, timeout).until(
                EC.presence_of_element_located((by, value))
            )
            return element
        except TimeoutException:
            print(f"Element not found: {by}={value}")
            return None

    def click_element(self, by, value):
        """Click on an element."""
        element = self.find_element(by, value)
        if element:
            element.click()
            return True
        return False

    def input_text(self, by, value, text):
        """Input text into an element."""
        element = self.find_element(by, value)
        if element:
            element.clear()
            element.send_keys(text)
            return True
        return False

    def get_page_source(self):
        """Get the current page source."""
        return self.driver.page_source

    def close(self):
        """Close the WebDriver."""
        if self.driver:
            self.driver.quit()
            self.driver = None
