import os
import time
import logging
from selenium import webdriver
from selenium.webdriver.chrome.options import Options

# Configure basic logger
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

def ensure_chrome_profile():
    profile_name = "linkedin_profile"
    profile_path = os.path.join(os.path.expanduser('~'), '.config', 'google-chrome', profile_name)
    if not os.path.exists(profile_path):
        os.makedirs(profile_path)
    return profile_path

def is_scrollable(element):
    scroll_height = element.get_attribute("scrollHeight")
    client_height = element.get_attribute("clientHeight")
    if isinstance(scroll_height, str) and isinstance(client_height, str):
        return int(scroll_height) > int(client_height)
    return False  # Return False if attributes are not strings (e.g., Mock objects)

def scroll_slow(driver_or_element, end=None, step=100, delay=0.1):
    if isinstance(driver_or_element, webdriver.Remote):
        if end is None:
            end = driver_or_element.execute_script("return document.body.scrollHeight;")
        for i in range(0, end, step):
            driver_or_element.execute_script(f"window.scrollTo(0, {i});")
            time.sleep(delay)
    else:
        if end is None:
            end = int(driver_or_element.get_attribute("scrollHeight"))
        if is_scrollable(driver_or_element):
            for i in range(0, end, step):
                driver_or_element.parent.execute_script(f"arguments[0].scrollTop = {i};", driver_or_element)
                time.sleep(delay)

def chrome_browser_options():
    options = Options()
    options.add_argument('--headless')
    options.add_argument('--no-sandbox')
    options.add_argument('--disable-dev-shm-usage')
    profile_path = ensure_chrome_profile()
    options.add_argument(f'user-data-dir={os.path.dirname(profile_path)}')
    options.add_argument(f'profile-directory={os.path.basename(profile_path)}')
    return options

def printred(text):
    print("\033[91m{}\033[0m".format(text))

def printyellow(text):
    print("\033[93m{}\033[0m".format(text))
