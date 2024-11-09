import pytest
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from src.core.database import Base, get_db
from src.core.auth.models import User
import os

# Test database URL
DATABASE_URL = os.getenv("DATABASE_URL")

@pytest.fixture(scope="session")
def engine():
    return create_engine(DATABASE_URL)

@pytest.fixture(scope="session")
def TestingSessionLocal(engine):
    Base.metadata.create_all(bind=engine)
    SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
    return SessionLocal

@pytest.fixture
def db_session(TestingSessionLocal):
    session = TestingSessionLocal()
    try:
        yield session
    finally:
        session.close()

@pytest.fixture
def client():
    from fastapi.testclient import TestClient
    from src.main import app
    return TestClient(app)
