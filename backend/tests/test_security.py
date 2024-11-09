"""
Security-focused tests for authentication, authorization, and credential management.
"""
import pytest
from fastapi.testclient import TestClient
from sqlalchemy.orm import Session
from datetime import datetime, timedelta
from unittest.mock import Mock, patch
import jwt
import bcrypt

from src.core.auth.jwt_handler import create_access_token, verify_token
from src.core.auth.middleware import get_current_user
from src.core.auth.models import User
from src.core.identity_verification.models import VerifiedDocument
from src.core.database import get_db
from src.main import app

# Test client setup
client = TestClient(app)

@pytest.fixture
def db_session():
    """Create a fresh database session for each test."""
    db = next(get_db())
    yield db
    db.close()

@pytest.fixture
def test_user(db_session):
    """Create a test user in the database."""
    # Hash password
    password = "testpassword123"
    salt = bcrypt.gensalt()
    hashed_password = bcrypt.hashpw(password.encode('utf-8'), salt)

    user = User(
        username="testuser",
        email="test@example.com",
        hashed_password=hashed_password.decode('utf-8'),
        is_active=True
    )
    db_session.add(user)
    db_session.commit()
    db_session.refresh(user)
    return user

def test_password_hashing():
    """Test password hashing and verification."""
    password = "securepassword123"

    # Test password hashing
    salt = bcrypt.gensalt()
    hashed = bcrypt.hashpw(password.encode('utf-8'), salt)
    assert bcrypt.checkpw(password.encode('utf-8'), hashed)

    # Test wrong password
    wrong_password = "wrongpassword123"
    assert not bcrypt.checkpw(wrong_password.encode('utf-8'), hashed)

def test_jwt_token_creation_and_verification():
    """Test JWT token creation and verification."""
    user_data = {"sub": "testuser", "id": 1}

    # Create token
    token = create_access_token(user_data)
    assert token is not None

    # Verify token
    decoded = verify_token(token)
    assert decoded["sub"] == user_data["sub"]
    assert decoded["id"] == user_data["id"]

    # Test expired token
    with patch("jwt.decode") as mock_decode:
        mock_decode.side_effect = jwt.ExpiredSignatureError()
        with pytest.raises(Exception):
            verify_token("expired_token")

def test_authentication_flow(test_user):
    """Test complete authentication flow."""
    # Test login
    response = client.post(
        "/api/v1/auth/login",
        json={
            "username": test_user.username,
            "password": "testpassword123"
        }
    )
    assert response.status_code == 200
    assert "access_token" in response.json()

    token = response.json()["access_token"]

    # Test protected endpoint access
    response = client.get(
        "/api/v1/identity/documents/verified",
        headers={"Authorization": f"Bearer {token}"}
    )
    assert response.status_code == 200

    # Test invalid token
    response = client.get(
        "/api/v1/identity/documents/verified",
        headers={"Authorization": "Bearer invalid_token"}
    )
    assert response.status_code == 401

def test_rate_limiting():
    """Test rate limiting middleware."""
    # Test rapid requests
    for _ in range(10):  # Assuming rate limit is set to less than 10
        response = client.post(
            "/api/v1/auth/login",
            json={
                "username": "testuser",
                "password": "testpassword123"
            }
        )

    # Next request should be rate limited
    response = client.post(
        "/api/v1/auth/login",
        json={
            "username": "testuser",
            "password": "testpassword123"
        }
    )
    assert response.status_code == 429

@pytest.mark.asyncio
async def test_document_access_control(db_session, test_user):
    """Test document access control."""
    # Create test document
    doc = VerifiedDocument(
        user_id=test_user.id,
        document_type="PASSPORT",
        status="VERIFIED"
    )
    db_session.add(doc)
    db_session.commit()

    # Create another test user
    other_user = User(
        username="otheruser",
        email="other@example.com",
        hashed_password="hashedpass",
        is_active=True
    )
    db_session.add(other_user)
    db_session.commit()

    # Test document access by owner
    with patch("fastapi.Depends", return_value=test_user):
        response = client.get(f"/api/v1/identity/documents/{doc.id}/status")
        assert response.status_code == 200

    # Test document access by non-owner
    with patch("fastapi.Depends", return_value=other_user):
        response = client.get(f"/api/v1/identity/documents/{doc.id}/status")
        assert response.status_code == 404

def test_session_management():
    """Test session management and token refresh."""
    # Login and get initial token
    response = client.post(
        "/api/v1/auth/login",
        json={
            "username": "testuser",
            "password": "testpassword123"
        }
    )
    assert response.status_code == 200
    initial_token = response.json()["access_token"]

    # Test token refresh
    response = client.post(
        "/api/v1/auth/refresh",
        headers={"Authorization": f"Bearer {initial_token}"}
    )
    assert response.status_code == 200
    assert "access_token" in response.json()
    assert response.json()["access_token"] != initial_token

def test_security_headers():
    """Test security headers in responses."""
    response = client.get("/api/v1/health")
    headers = response.headers

    # Check security headers
    assert headers.get("X-Content-Type-Options") == "nosniff"
    assert headers.get("X-Frame-Options") == "DENY"
    assert "Content-Security-Policy" in headers
    assert "Strict-Transport-Security" in headers

@pytest.mark.asyncio
async def test_credential_encryption(db_session):
    """Test credential encryption and decryption."""
    from src.core.identity_verification.encryption import encrypt_data, decrypt_data

    # Test data
    sensitive_data = {
        "document_number": "A1234567",
        "personal_info": "sensitive information"
    }

    # Test encryption
    encrypted = encrypt_data(sensitive_data)
    assert encrypted != str(sensitive_data)

    # Test decryption
    decrypted = decrypt_data(encrypted)
    assert decrypted == sensitive_data

    # Test tampering detection
    with pytest.raises(Exception):
        decrypt_data(encrypted + "tampered")
