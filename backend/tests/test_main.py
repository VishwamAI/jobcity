import pytest
from unittest.mock import patch, MagicMock
from src.core.indeed_job_agent import IndeedJobAgent
from main import main

def test_main_function():
    # Mock the necessary components and IndeedJobAgent
    with patch('main.JobDataModel') as mock_job_data_model, \
         patch('main.NLPEngine') as mock_nlp_engine, \
         patch('main.ResumeCustomizer') as mock_resume_customizer, \
         patch('main.CoverLetterGenerator') as mock_cover_letter_generator, \
         patch('main.ApplicationSubmissionEngine') as mock_application_submission_engine, \
         patch('main.IndeedJobAgent') as mock_indeed_job_agent, \
         patch('main.getpass.getpass', return_value='password'):

        # Set up the mock IndeedJobAgent
        mock_agent = MagicMock()
        mock_indeed_job_agent.return_value = mock_agent

        # Call the main function
        main()

        # Assert that IndeedJobAgent was initialized with the correct components
        mock_indeed_job_agent.assert_called_once_with(
            job_data_model=mock_job_data_model.return_value,
            nlp_engine=mock_nlp_engine.return_value,
            resume_customizer=mock_resume_customizer.return_value,
            cover_letter_generator=mock_cover_letter_generator.return_value,
            application_submission_engine=mock_application_submission_engine.return_value
        )

        # Assert that run_job_application_process was called with the correct arguments
        mock_agent.run_job_application_process.assert_called_once_with(
            "kasinadhsarma@gmail.com",
            "password",
            "software engineer",
            "New York, NY",
            5
        )

        # Assert that close was called on the agent
        mock_agent.close.assert_called_once()

def test_main_function_exception_handling():
    # Mock the necessary components and IndeedJobAgent
    with patch('main.JobDataModel'), \
         patch('main.NLPEngine'), \
         patch('main.ResumeCustomizer'), \
         patch('main.CoverLetterGenerator'), \
         patch('main.ApplicationSubmissionEngine'), \
         patch('main.IndeedJobAgent') as mock_indeed_job_agent, \
         patch('main.getpass.getpass', return_value='password'), \
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

if __name__ == '__main__':
    pytest.main()
