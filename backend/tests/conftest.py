import pytest
import asyncio
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from typing import Generator

from src.core.base import Base
from src.main import app
from src.core.auth.models import User
from src.core.auth.jwt_handler import create_access_token

# Test database URL
DATABASE_URL = "postgresql://postgres:postgres@localhost/jobcity_test"

@pytest.fixture(scope="session")
def event_loop():
    """Create an instance of the default event loop for the test session."""
    loop = asyncio.get_event_loop_policy().new_event_loop()
    yield loop
    loop.close()

@pytest.fixture(scope="session")
def engine():
    """Create database engine."""
    return create_engine(DATABASE_URL)

@pytest.fixture(scope="session")
def tables(engine):
    """Create database tables."""
    Base.metadata.create_all(engine)
    yield
    Base.metadata.drop_all(engine)

@pytest.fixture
def db_session(engine, tables):
    """Get database session."""
    connection = engine.connect()
    transaction = connection.begin()
    Session = sessionmaker(bind=connection)
    session = Session()

    yield session

    session.close()
    transaction.rollback()
    connection.close()

@pytest.fixture
def client() -> Generator:
    """Get test client."""
    with TestClient(app) as test_client:
        yield test_client

@pytest.fixture
def test_user(db_session) -> User:
    """Create test user."""
    user = User(
        username="testuser",
        email="test@example.com",
        hashed_password="hashed_password"
    )
    db_session.add(user)
    db_session.commit()
    db_session.refresh(user)
    return user

@pytest.fixture
def test_user_token(test_user: User) -> str:
    """Create access token for test user."""
    return create_access_token({"sub": test_user.id})

@pytest.fixture
def authorized_client(client: TestClient, test_user_token: str) -> TestClient:
    """Get test client with authorization."""
    client.headers = {
        **client.headers,
        "Authorization": f"Bearer {test_user_token}"
    }
    return client
