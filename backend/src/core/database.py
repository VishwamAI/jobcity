from sqlalchemy import create_engine, text
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base
import os
from dotenv import load_dotenv
from sqlalchemy.exc import SQLAlchemyError
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Load environment variables
load_dotenv()

# Get database URL from environment variable, default to development URL
DATABASE_URL = os.getenv('DATABASE_URL', 'postgresql://jobcity:jobcity123@localhost:5432/jobcity')

try:
    # Create SQLAlchemy engine with connection pool settings
    engine = create_engine(
        DATABASE_URL,
        pool_size=5,
        max_overflow=10,
        pool_timeout=30,
        pool_recycle=1800,
        pool_pre_ping=True,  # Enable connection health checks
        echo=bool(os.getenv('SQL_ECHO', False))  # Enable SQL query logging if needed
    )

    # Test connection
    with engine.connect() as conn:
        conn.execute(text("SELECT 1"))
        logger.info("Database connection successful")
except SQLAlchemyError as e:
    logger.error(f"Database connection error: {str(e)}")
    raise

# Create SessionLocal class
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Create Base class
Base = declarative_base()

def get_db():
    """Dependency to get DB session"""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
