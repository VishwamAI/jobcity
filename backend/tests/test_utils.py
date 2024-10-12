# tests/test_utils.py
import pytest
import os
import time
from unittest import mock
from selenium import webdriver
from selenium.webdriver.remote.webelement import WebElement
from src.utils import ensure_chrome_profile, is_scrollable, scroll_slow, chrome_browser_options, printred, printyellow

# Mocking logging to avoid actual file writing
@pytest.fixture(autouse=True)
def mock_logger(mocker):
    mocker.patch("src.utils.logger")

# Test ensure_chrome_profile function
def test_ensure_chrome_profile(mocker):
    mocker.patch("os.path.exists", return_value=False)  # Pretend directory doesn't exist
    mocker.patch("os.makedirs")  # Mock making directories

    # Call the function
    profile_path = ensure_chrome_profile()

    # Verify that os.makedirs was called twice to create the directory
    assert profile_path.endswith("linkedin_profile")
    assert os.path.exists.called
    assert os.makedirs.called

# Test is_scrollable function
def test_is_scrollable(mocker):
    mock_element = mocker.Mock(spec=WebElement)
    mock_element.get_attribute.side_effect = lambda attr: "1000" if attr == "scrollHeight" else "500"

    # Call the function
    scrollable = is_scrollable(mock_element)

    # Check the expected outcome
    assert scrollable is True
    mock_element.get_attribute.assert_any_call("scrollHeight")
    mock_element.get_attribute.assert_any_call("clientHeight")

# Test scroll_slow function
def test_scroll_slow(mocker):
    mock_driver = mocker.Mock(spec=webdriver.Remote)
    mock_driver.execute_script.return_value = 2000  # Mock the scrollHeight

    # Test case 1: end is provided
    scroll_slow(mock_driver, end=1000, step=100)
    assert mock_driver.execute_script.call_count == 10  # 10 scrolls

    mock_driver.execute_script.reset_mock()

    # Test case 2: end is None
    scroll_slow(mock_driver, end=None, step=100)
    assert mock_driver.execute_script.call_count == 21  # 1 initial call + 20 scrolls

    # Test with WebElement
    mock_element = mocker.Mock(spec=WebElement)
    mock_element.get_attribute.return_value = "2000"
    mocker.patch("src.utils.is_scrollable", return_value=True)

    scroll_slow(mock_element, end=1000, step=100)

    assert mock_element.parent.execute_script.call_count == 10

    # Add print statements to debug the actual number of calls
    print(f"Test case 1 execute_script call count: {10}")
    print(f"Test case 2 execute_script call count: {21}")
    print(f"WebElement test execute_script call count: {mock_element.parent.execute_script.call_count}")

def test_scroll_slow_element_not_scrollable(mocker):
    mock_driver = mocker.Mock()
    mock_element = mocker.Mock(spec=WebElement)

    # Mock the attributes so the element is not scrollable
    mock_element.get_attribute.side_effect = lambda attr: "1000" if attr == "scrollHeight" else "1000"
    mock_element.is_displayed.return_value = True

    scroll_slow(mock_element, end=1000, step=100)

    # Ensure it detected non-scrollable element
    mock_element.parent.execute_script.assert_not_called()

# Test chrome_browser_options function
def test_chrome_browser_options(mocker):
    mocker.patch("src.utils.ensure_chrome_profile", return_value="/mocked/path/profile_directory")
    mocker.patch("os.path.dirname", return_value="/mocked/path")
    mocker.patch("os.path.basename", return_value="profile_directory")

    # Call the function
    options = chrome_browser_options()

    # Ensure options were set correctly
    assert '--headless' in options.arguments
    assert '--no-sandbox' in options.arguments
    assert '--disable-dev-shm-usage' in options.arguments
    assert any('user-data-dir=/mocked/path' in arg for arg in options.arguments)
    assert any('profile-directory=profile_directory' in arg for arg in options.arguments)

# Test printred and printyellow functions
def test_printred(mocker):
    mocker.patch("builtins.print")
    printred("Test")
    print.assert_called_once_with("\033[91mTest\033[0m")

def test_printyellow(mocker):
    mocker.patch("builtins.print")
    printyellow("Test")
    print.assert_called_once_with("\033[93mTest\033[0m")
