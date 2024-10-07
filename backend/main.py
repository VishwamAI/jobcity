import os
import re
import sys
from pathlib import Path
from typing import Dict, List, Set, Tuple, Optional
import yaml
import click
from selenium import webdriver
from selenium.webdriver.chrome.service import Service as ChromeService
from webdriver_manager.chrome import ChromeDriverManager
from selenium.common.exceptions import WebDriverException
from lib_resume_builder_AIHawk import Resume, StyleManager, FacadeManager, ResumeGenerator
from src.utils import chrome_browser_options
from src.llm.llm_manager import GPTAnswerer
from src.aihawk_authenticator import AIHawkAuthenticator
from src.aihawk_bot_facade import AIHawkBotFacade
from src.aihawk_job_manager import AIHawkJobManager
from src.job_application_profile import JobApplicationProfile
from loguru import logger

# Suppress stderr to reduce noise
sys.stderr = open(os.devnull, 'w')

# Constants for configuration validation
EXPERIENCE_LEVELS = {'internship', 'entry', 'associate', 'mid-senior level', 'director', 'executive'}
JOB_TYPES = {'full-time', 'contract', 'part-time', 'temporary', 'internship', 'other', 'volunteer'}
DATE_FILTERS = {'all time', 'month', 'week', '24 hours'}
APPROVED_DISTANCES: Set[int] = {0, 5, 10, 25, 50, 100}
REQUIRED_CONFIG_KEYS = {
    'remote': bool,
    'experienceLevel': dict,
    'jobTypes': dict,
    'date': dict,
    'positions': list,
    'locations': list,
    'distance': int,
    'companyBlacklist': list,
    'titleBlacklist': list,
    'llm_model_type': str,
    'llm_model': str
}

class ConfigError(Exception):
    """Custom exception for configuration-related errors"""
    pass

class ConfigValidator:
    @staticmethod
    def validate_email(email: str) -> bool:
        """Validate email format using regex"""
        email_pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
        return bool(re.match(email_pattern, email))
    
    @staticmethod
    def validate_yaml_file(yaml_path: Path) -> dict:
        """Load and validate a YAML file"""
        try:
            with open(yaml_path, 'r') as stream:
                return yaml.safe_load(stream)
        except (yaml.YAMLError, FileNotFoundError) as exc:
            raise ConfigError(f"Error with file {yaml_path}: {exc}")
    
    @staticmethod
    def validate_config(config_yaml_path: Path) -> dict:
        """Validate the configuration file and return the parsed config"""
        parameters = ConfigValidator.validate_yaml_file(config_yaml_path)
        
        # Validate required keys and their types
        for key, expected_type in REQUIRED_CONFIG_KEYS.items():
            if key not in parameters:
                if key in ['companyBlacklist', 'titleBlacklist']:
                    parameters[key] = []  # Set default empty lists
                else:
                    raise ConfigError(f"Missing key '{key}' in config")
            elif not isinstance(parameters[key], expected_type):
                if key in ['companyBlacklist', 'titleBlacklist'] and parameters[key] is None:
                    parameters[key] = []  # Convert None to empty list
                else:
                    raise ConfigError(f"Invalid type for '{key}'. Expected {expected_type}.")

        # Validate experience levels
        for level in EXPERIENCE_LEVELS:
            if not isinstance(parameters['experienceLevel'].get(level), bool):
                raise ConfigError(f"Experience level '{level}' must be boolean")

        # Validate job types
        for job_type in JOB_TYPES:
            if not isinstance(parameters['jobTypes'].get(job_type), bool):
                raise ConfigError(f"Job type '{job_type}' must be boolean")

        # Validate date filters
        for date_filter in DATE_FILTERS:
            if not isinstance(parameters['date'].get(date_filter), bool):
                raise ConfigError(f"Date filter '{date_filter}' must be boolean")

        # Validate positions and locations are lists of strings
        if not all(isinstance(pos, str) for pos in parameters['positions']):
            raise ConfigError("'positions' must be a list of strings")
        if not all(isinstance(loc, str) for loc in parameters['locations']):
            raise ConfigError("'locations' must be a list of strings")

        # Validate distance
        if parameters['distance'] not in APPROVED_DISTANCES:
            raise ConfigError(f"Distance must be one of: {APPROVED_DISTANCES}")

        return parameters

    @staticmethod
    def validate_secrets(secrets_yaml_path: Path) -> str:
        """Validate the secrets file and return the LLM API key"""
        secrets = ConfigValidator.validate_yaml_file(secrets_yaml_path)
        
        if 'llm_api_key' not in secrets or not secrets['llm_api_key']:
            raise ConfigError("Missing or empty 'llm_api_key' in secrets file")
        
        return secrets['llm_api_key']

class FileManager:
    @staticmethod
    def find_file(name_containing: str, with_extension: str, at_path: Path) -> Optional[Path]:
        """Find a file containing specific text and extension in a directory"""
        return next(
            (file for file in at_path.iterdir() 
             if name_containing.lower() in file.name.lower() 
             and file.suffix.lower() == with_extension.lower()),
            None
        )

    @staticmethod
    def validate_data_folder(app_data_folder: Path) -> Tuple[Path, Path, Path, Path]:
        """Validate the data folder structure and return required file paths"""
        if not app_data_folder.exists() or not app_data_folder.is_dir():
            raise FileNotFoundError(f"Data folder not found: {app_data_folder}")

        required_files = ['secrets.yaml', 'config.yaml', 'plain_text_resume.yaml']
        missing_files = [file for file in required_files 
                         if not (app_data_folder / file).exists()]
        
        if missing_files:
            raise FileNotFoundError(f"Missing files: {', '.join(missing_files)}")

        output_folder = app_data_folder / 'output'
        output_folder.mkdir(exist_ok=True)
        
        return tuple(app_data_folder / file for file in required_files) + (output_folder,)

    @staticmethod
    def file_paths_to_dict(resume_file: Optional[Path], plain_text_resume_file: Path) -> Dict[str, Path]:
        """Convert file paths to a dictionary format"""
        if not plain_text_resume_file.exists():
            raise FileNotFoundError(f"Missing plain text resume: {plain_text_resume_file}")

        result = {'plainTextResume': plain_text_resume_file}
        
        if resume_file and resume_file.exists():
            result['resume'] = resume_file

        return result

def init_browser() -> webdriver.Chrome:
    """Initialize and return a Chrome WebDriver instance"""
    try:
        options = chrome_browser_options()
        service = ChromeService(ChromeDriverManager().install())
        return webdriver.Chrome(service=service, options=options)
    except Exception as e:
        raise RuntimeError(f"Browser initialization failed: {str(e)}")

def create_and_run_bot(parameters: Dict, llm_api_key: str) -> None:
    """Create and run the AIHawk bot with the given parameters"""
    try:
        logger.info("Initializing bot components...")
        
        # Initialize core components
        style_manager = StyleManager()
        resume_generator = ResumeGenerator()
        
        # Load and process resume
        with open(parameters['uploads']['plainTextResume'], "r", encoding='utf-8') as file:
            plain_text_resume = file.read()
        resume_object = Resume(plain_text_resume)
        
        # Setup resume generator manager
        resume_generator_manager = FacadeManager(
            llm_api_key, style_manager, resume_generator, 
            resume_object, Path("data_folder/output")
        )
        
        # Clear screen for better visibility
        os.system('cls' if os.name == 'nt' else 'clear')

        # Choose resume style
        logger.info("Choosing resume style...")
        resume_generator_manager.choose_style()
        
        os.system('cls' if os.name == 'nt' else 'clear')

        # Initialize job application components
        logger.info("Creating job application profile...")
        job_application_profile = JobApplicationProfile(plain_text_resume)

        logger.info("Initializing browser and components...")
        browser = init_browser()
        login_component = AIHawkAuthenticator(browser)
        apply_component = AIHawkJobManager(browser)
        gpt_answerer = GPTAnswerer(parameters, llm_api_key)
        
        # Setup and configure bot
        bot = AIHawkBotFacade(login_component, apply_component)
        bot.set_job_application_profile_and_resume(job_application_profile, resume_object)
        bot.set_gpt_answerer_and_resume_generator(gpt_answerer, resume_generator_manager)
        bot.set_parameters(parameters)

        # Start the application process
        logger.info("Starting login process...")
        bot.start_login()
        logger.info("Starting job application process...")
        bot.start_apply()
        
    except WebDriverException as e:
        logger.error(f"WebDriver error: {e}")
    except Exception as e:
        logger.error(f"Unexpected error: {e}")
        raise RuntimeError(f"Bot execution failed: {str(e)}")

@click.command()
@click.option('--resume', type=click.Path(exists=True, file_okay=True, dir_okay=False, path_type=Path), 
              help="Path to the resume PDF file")
def main(resume: Optional[Path] = None) -> None:
    """Main function to run the AIHawk job application bot"""
    try:
        # Initialize and validate all required files and configurations
        data_folder = Path("data_folder")
        secrets_file, config_file, plain_text_resume_file, output_folder = FileManager.validate_data_folder(data_folder)
        
        parameters = ConfigValidator.validate_config(config_file)
        llm_api_key = ConfigValidator.validate_secrets(secrets_file)
        
        parameters['uploads'] = FileManager.file_paths_to_dict(resume, plain_text_resume_file)
        parameters['outputFileDirectory'] = output_folder
        
        # Run the bot with validated parameters
        create_and_run_bot(parameters, llm_api_key)
        
    except (ConfigError, FileNotFoundError, RuntimeError) as e:
        logger.error(f"{type(e).__name__}: {str(e)}")
        logger.error("For troubleshooting, visit: https://github.com/feder-cr/AIHawk_AIHawk_automatic_job_application/blob/main/readme.md#configuration")
    except Exception as e:
        logger.error(f"Unexpected error: {str(e)}")
        logger.error("For general troubleshooting, visit: https://github.com/feder-cr/AIHawk_AIHawk_automatic_job_application/blob/main/readme.md#configuration")

if __name__ == "__main__":
    main()