"""PyTest configuration file for JobCity backend tests."""
import os
import pytest
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import StaticPool
from src.core.database import Base, get_db

@pytest.fixture(autouse=True)
def test_db():
    """Create a fresh database for each test."""
    # Set testing environment variable
    os.environ['TESTING'] = 'true'
    
    # Create in-memory database for testing
    engine = create_engine(
        "sqlite:///:memory:",
        connect_args={"check_same_thread": False},
        poolclass=StaticPool
    )
    
    # Create all tables
    Base.metadata.create_all(bind=engine)
    
    # Create session factory
    TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
    
    # Create a new session for the test
    db = TestingSessionLocal()
    
    try:
        yield db
    finally:
        db.close()
        Base.metadata.drop_all(bind=engine)

@pytest.fixture
def override_get_db(test_db):
    """Override the get_db dependency for testing."""
    def override_get_db():
        try:
            yield test_db
        finally:
            test_db.close()
    return override_get_db
