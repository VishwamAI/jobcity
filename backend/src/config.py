"""Configuration management for JobCity backend."""
import os
from typing import Optional
from pydantic import BaseSettings

class Settings(BaseSettings):
    """Application settings."""
    # Development mode flag
    DEV_MODE: bool = os.getenv('DEV_MODE', 'False').lower() == 'true'
    
    # Indeed credentials
    INDEED_EMAIL: Optional[str] = os.getenv('INDEED_EMAIL')
    INDEED_PASSWORD: Optional[str] = os.getenv('INDEED_PASSWORD')
    
    # Development credentials (only used when DEV_MODE is True)
    DEV_EMAIL: str = "dev@jobcity.com"
    DEV_PASSWORD: str = "devpass123"
    
    # Database configuration
    DATABASE_URL: str = os.getenv('DATABASE_URL', 'postgresql://jobcity:jobcity@localhost/jobcity')
    
    # API configuration
    API_HOST: str = os.getenv('API_HOST', '0.0.0.0')
    API_PORT: int = int(os.getenv('API_PORT', '8000'))
    
    class Config:
        """Pydantic config."""
        env_file = '.env'
        case_sensitive = True

# Global settings instance
settings = Settings()
