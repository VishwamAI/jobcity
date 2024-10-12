import os
import time
from selenium import webdriver
from selenium.webdriver.chrome.options import Options

def ensure_chrome_profile(profile_name):
    profile_path = os.path.join(os.path.expanduser('~'), '.config', 'google-chrome', profile_name)
    if not os.path.exists(profile_path):
        os.makedirs(profile_path)
    return profile_path

def is_scrollable(driver):
    return driver.execute_script("return document.body.scrollHeight > window.innerHeight;")

def scroll_slow(driver, start=0, end=None, step=100, delay=0.1):
    if end is None:
        end = driver.execute_script("return document.body.scrollHeight;")
    for i in range(start, end, step):
        driver.execute_script(f"window.scrollTo(0, {i});")
        time.sleep(delay)

def chrome_browser_options(headless=True):
    options = Options()
    if headless:
        options.add_argument('--headless')
    options.add_argument('--no-sandbox')
    options.add_argument('--disable-dev-shm-usage')
    return options

def printred(text):
    print("\033[91m {}\033[00m".format(text))

def printyellow(text):
    print("\033[93m {}\033[00m".format(text))
