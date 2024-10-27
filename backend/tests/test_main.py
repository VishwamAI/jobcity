import os
import pytest
from unittest.mock import patch, MagicMock
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import Session, sessionmaker
from sqlalchemy.pool import StaticPool

from src.core.indeed_job_agent import IndeedJobAgent
from src.core.database import Base, get_db
from main import app, main

# Set up test database
SQLALCHEMY_DATABASE_URL = "sqlite:///:memory:"
engine = create_engine(
    SQLALCHEMY_DATABASE_URL,
    connect_args={"check_same_thread": False},
    poolclass=StaticPool
)
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

@pytest.fixture(scope="function")
def test_db():
    """Create a fresh test database for each test."""
    Base.metadata.create_all(bind=engine)
    db = TestingSessionLocal()
    try:
        yield db
    finally:
        db.close()
        Base.metadata.drop_all(bind=engine)

@pytest.fixture(scope="function")
def test_client(test_db):
    """Create a test client using the test database."""
    def override_get_db():
        try:
            yield test_db
        finally:
            test_db.close()

    app.dependency_overrides[get_db] = override_get_db
    client = TestClient(app)
    yield client
    app.dependency_overrides.clear()

def test_main_function(test_db):
    # Mock the necessary components and IndeedJobAgent
    with patch('main.JobDataModel') as mock_job_data_model, \
         patch('main.NLPEngine') as mock_nlp_engine, \
         patch('main.ResumeCustomizer') as mock_resume_customizer, \
         patch('main.CoverLetterGenerator') as mock_cover_letter_generator, \
         patch('main.ApplicationSubmissionEngine') as mock_application_submission_engine, \
         patch('main.IndeedJobAgent') as mock_indeed_job_agent, \
         patch('main.settings.DEV_MODE', True), \
         patch('main.settings.DEV_EMAIL', "dev@jobcity.com"), \
         patch('main.settings.DEV_PASSWORD', "devpass123"):

        # Set up the mock IndeedJobAgent
        mock_agent = MagicMock()
        mock_indeed_job_agent.return_value = mock_agent

        # Call the main function
        main()

        # Assert that IndeedJobAgent was initialized
        mock_indeed_job_agent.assert_called_once_with()

        # Assert that components were set correctly
        assert mock_agent.job_data_model == mock_job_data_model.return_value
        assert mock_agent.nlp_engine == mock_nlp_engine.return_value
        assert mock_agent.resume_customizer == mock_resume_customizer.return_value
        assert mock_agent.cover_letter_generator == mock_cover_letter_generator.return_value
        assert mock_agent.application_submission_engine == mock_application_submission_engine.return_value

        # Assert that run_job_application_process was called with the correct arguments
        mock_agent.run_job_application_process.assert_called_once_with(
            "dev@jobcity.com",  # From settings.DEV_EMAIL
            "devpass123",       # From settings.DEV_PASSWORD
            "software engineer",
            "New York, NY",
            5
        )

        # Assert that close was called on the agent
        mock_agent.close.assert_called_once()

def test_main_function_exception_handling(test_db):
    # Mock the necessary components and IndeedJobAgent
    with patch('main.JobDataModel'), \
         patch('main.NLPEngine'), \
         patch('main.ResumeCustomizer'), \
         patch('main.CoverLetterGenerator'), \
         patch('main.ApplicationSubmissionEngine'), \
         patch('main.IndeedJobAgent') as mock_indeed_job_agent, \
         patch('main.settings.DEV_MODE', True), \
         patch('main.settings.DEV_EMAIL', "dev@jobcity.com"), \
         patch('main.settings.DEV_PASSWORD', "devpass123"), \
         patch('main.logger.error') as mock_logger_error:

        # Set up the mock IndeedJobAgent to raise an exception
        mock_agent = MagicMock()
        mock_agent.run_job_application_process.side_effect = Exception("Test exception")
        mock_indeed_job_agent.return_value = mock_agent

        # Call the main function
        main()

        # Assert that the exception was logged
        mock_logger_error.assert_called_once_with("An error occurred during the job application process: Test exception")

        # Assert that close was called on the agent even after the exception
        mock_agent.close.assert_called_once()

def test_health_check(test_client):
    """Test the health check endpoint."""
    response = test_client.get("/health")
    assert response.status_code == 200
    assert response.json() == {"status": "healthy"}

if __name__ == '__main__':
    pytest.main()
