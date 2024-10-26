import pytest
from unittest.mock import patch, MagicMock
import main
from src.core.indeed_job_agent import IndeedJobAgent
from src.core.job_data_model import JobDataModel
from src.core.nlp_engine import NLPEngine
from src.core.resume_customizer import ResumeCustomizer
from src.core.cover_letter_generator import CoverLetterGenerator
from src.core.application_submission_engine import ApplicationSubmissionEngine

def test_main_function():
    # Mock the necessary components and IndeedJobAgent
    mock_job_data_model = MagicMock(spec=JobDataModel)
    mock_nlp_engine = MagicMock(spec=NLPEngine)
    mock_resume_customizer = MagicMock(spec=ResumeCustomizer)
    mock_cover_letter_generator = MagicMock(spec=CoverLetterGenerator)
    mock_application_submission_engine = MagicMock(spec=ApplicationSubmissionEngine)

    with patch.object(main, 'job_data_model', mock_job_data_model), \
         patch.object(main, 'nlp_engine', mock_nlp_engine), \
         patch.object(main, 'resume_customizer', mock_resume_customizer), \
         patch.object(main, 'cover_letter_generator', mock_cover_letter_generator), \
         patch.object(main, 'application_submission_engine', mock_application_submission_engine), \
         patch('main.IndeedJobAgent') as mock_indeed_job_agent, \
         patch('main.getpass.getpass', return_value='password'):

        # Set up the mock IndeedJobAgent
        mock_agent = MagicMock()
        mock_indeed_job_agent.return_value = mock_agent

        # Call the main function
        main.main()

        # Assert that IndeedJobAgent was initialized with the correct components
        mock_indeed_job_agent.assert_called_once_with(
            job_data_model=mock_job_data_model,
            nlp_engine=mock_nlp_engine,
            resume_customizer=mock_resume_customizer,
            cover_letter_generator=mock_cover_letter_generator,
            application_submission_engine=mock_application_submission_engine
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
        main.main()

        # Assert that the exception was logged
        mock_logger_error.assert_called_once_with("An error occurred during the job application process: Test exception")

        # Assert that close was called on the agent even after the exception
        mock_agent.close.assert_called_once()

if __name__ == '__main__':
    pytest.main()
