import pytest
from unittest.mock import Mock, patch, call, MagicMock
from selenium.webdriver.common.by import By
from src.jobcity_authenticator import AIHawkAuthenticator

@pytest.fixture
def mock_driver():
    driver = Mock()
    driver.current_url = ""
    return driver

@pytest.fixture
def authenticator(mock_driver):
    return AIHawkAuthenticator(mock_driver)

def test_login_success(authenticator, mock_driver):
    # Mock successful login
    mock_username_field = Mock(name="username_field")
    mock_password_field = Mock(name="password_field")
    mock_submit_button = Mock(name="submit_button")
    mock_driver.find_element.side_effect = [
        mock_username_field,
        mock_password_field,
        mock_submit_button,
        Mock(name="default_mock")  # Default mock for additional calls
    ]
    mock_driver.find_elements.return_value = [Mock(name="start_post_button")]
    mock_driver.current_url = "https://www.linkedin.com/login"

    def update_url(*args, **kwargs):
        mock_driver.current_url = "https://www.linkedin.com/feed/"

    mock_submit_button.click.side_effect = update_url

    result = authenticator.login("test@example.com", "password123")

    assert result == True
    assert mock_driver.get.call_count == 2
    mock_driver.get.assert_has_calls([
        call("https://www.linkedin.com/login"),
        call("https://www.linkedin.com/feed")
    ], any_order=False)
    assert mock_driver.find_element.call_count >= 3  # Username, password, and submit button, plus potential additional calls
    mock_driver.find_element.assert_any_call(By.ID, "username")
    mock_driver.find_element.assert_any_call(By.ID, "password")
    mock_driver.find_element.assert_any_call(By.CSS_SELECTOR, "button[type='submit']")
    mock_username_field.send_keys.assert_called_once_with("test@example.com")
    mock_password_field.send_keys.assert_called_once_with("password123")
    mock_submit_button.click.assert_called_once()

    # Verify login behavior through other means
    assert mock_driver.current_url == "https://www.linkedin.com/feed/"

@pytest.mark.timeout(30)  # Increase timeout to 30 seconds
def test_login_failure(authenticator, mock_driver):
    print("Starting test_login_failure")
    # Mock failed login
    mock_username_field = Mock(name="username_field")
    mock_password_field = Mock(name="password_field")
    mock_submit_button = Mock(name="submit_button")
    mock_driver.find_element.side_effect = [
        mock_username_field,
        mock_password_field,
        mock_submit_button,
        Mock(name="default_mock")  # Default mock for additional calls
    ]
    mock_driver.find_elements.return_value = []  # Simulate no elements found for is_logged_in check
    mock_driver.current_url = "https://www.linkedin.com/login"
    print(f"Initial URL: {mock_driver.current_url}")

    # Simulate login failure by keeping the URL unchanged
    print("Calling authenticator.login")
    result = authenticator.login("test@example.com", "wrong_password")
    print(f"Login result: {result}")

    print("Asserting results")
    assert result == False, "Expected login to fail"
    assert mock_driver.current_url == "https://www.linkedin.com/login", "URL should remain unchanged for failed login"
    print("Checking mock_driver.get calls")
    mock_driver.get.assert_any_call("https://www.linkedin.com/login")
    print(f"mock_driver.find_element call count: {mock_driver.find_element.call_count}")
    assert mock_driver.find_element.call_count >= 3, "Expected at least 3 find_element calls"
    print("Checking find_element calls")
    mock_driver.find_element.assert_any_call(By.ID, "username")
    mock_driver.find_element.assert_any_call(By.ID, "password")
    mock_driver.find_element.assert_any_call(By.CSS_SELECTOR, "button[type='submit']")
    print("Checking send_keys calls")
    mock_username_field.send_keys.assert_called_once_with("test@example.com")
    mock_password_field.send_keys.assert_called_once_with("wrong_password")
    print("Checking submit button click")
    mock_submit_button.click.assert_called_once()
    print("test_login_failure completed")

@patch('src.jobcity_authenticator.time.sleep')
def test_security_check(mock_sleep, authenticator, mock_driver):
    # Mock security check scenario
    mock_driver.current_url = "https://www.linkedin.com/checkpoint/challenge/"

    authenticator.handle_security_check()

    mock_sleep.assert_called()
    # Add more assertions based on the actual implementation of handle_security_check

def test_is_logged_in(authenticator, mock_driver):
    # Test when logged in
    mock_driver.find_elements.return_value = [Mock(text="Start a post")]
    assert authenticator.is_logged_in() == True

    # Test when not logged in
    mock_driver.find_elements.return_value = []
    assert authenticator.is_logged_in() == False

def test_enter_credentials(authenticator, mock_driver):
    # Mock the find_element method
    mock_username_field = Mock(name="username_field")
    mock_password_field = Mock(name="password_field")
    mock_submit_button = Mock(name="submit_button")
    mock_driver.find_element.side_effect = [
        mock_username_field,
        mock_password_field,
        mock_submit_button
    ]

    # Call the enter_credentials method
    authenticator.enter_credentials("test@example.com", "password123")

    # Assert that find_element was called for username, password, and submit button
    assert mock_driver.find_element.call_count == 3
    mock_driver.find_element.assert_any_call(By.ID, "username")
    mock_driver.find_element.assert_any_call(By.ID, "password")
    mock_driver.find_element.assert_any_call(By.CSS_SELECTOR, "button[type='submit']")

    # Assert that send_keys was called for username and password
    mock_username_field.send_keys.assert_called_once_with("test@example.com")
    mock_password_field.send_keys.assert_called_once_with("password123")

    # Assert that click was called for submit button
    mock_submit_button.click.assert_called_once()

# Add more tests as needed to cover other functionalities of AIHawkAuthenticator
