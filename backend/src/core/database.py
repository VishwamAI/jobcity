"""Database configuration module for JobCity application."""
import os
from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base  # Updated import for SQLAlchemy 2.0
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import StaticPool

# Determine if we're in a test environment
TESTING = os.environ.get('TESTING', 'false').lower() == 'true'

# Use SQLite for testing, PostgreSQL for production
if TESTING:
    # Use in-memory SQLite for testing
    SQLALCHEMY_DATABASE_URL = "sqlite:///:memory:"
    # These arguments are needed for SQLite in-memory testing
    engine = create_engine(
        SQLALCHEMY_DATABASE_URL,
        connect_args={"check_same_thread": False},
        poolclass=StaticPool  # This ensures a single connection for in-memory SQLite
    )
else:
    # Use PostgreSQL for production
    SQLALCHEMY_DATABASE_URL = os.getenv(
        "DATABASE_URL",
        "postgresql://jobcity:jobcity@localhost/jobcity"
    )
    engine = create_engine(SQLALCHEMY_DATABASE_URL)

# Create session factory
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Create base class for declarative models
Base = declarative_base()

def get_db():
    """Dependency for FastAPI to get database session."""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def init_db():
    """Initialize database by creating all tables."""
    Base.metadata.create_all(bind=engine)

def get_engine():
    """Get the SQLAlchemy engine instance."""
    return engine
