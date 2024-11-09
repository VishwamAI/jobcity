"""
Tests for credential management functionality.
"""
import pytest
from fastapi.testclient import TestClient
from sqlalchemy.orm import Session
from unittest.mock import Mock, patch
import os
import base64
from cryptography.fernet import Fernet
from datetime import datetime, timedelta

from src.core.auth.models import User, UserCredential
from src.core.job_platform.security import JobPlatformSecurity
from src.core.identity_verification.encryption import encrypt_data, decrypt_data
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
    """Create a test user with credentials."""
    user = User(
        username="testuser",
        email="test@example.com",
        hashed_password="hashedpassword",
        is_active=True
    )
    db_session.add(user)
    db_session.commit()
    db_session.refresh(user)
    return user

@pytest.fixture
def encryption_key():
    """Generate a test encryption key."""
    return Fernet.generate_key()

def test_credential_encryption_decryption(encryption_key):
    """Test encryption and decryption of credentials."""
    # Test data
    sensitive_data = {
        "username": "platform_user",
        "password": "platform_pass",
        "api_key": "secret_key_123"
    }

    # Test encryption
    encrypted = encrypt_data(sensitive_data)
    assert isinstance(encrypted, str)
    assert encrypted != str(sensitive_data)

    # Test decryption
    decrypted = decrypt_data(encrypted)
    assert decrypted == sensitive_data

    # Test data integrity
    with pytest.raises(Exception):
        decrypt_data(encrypted + "tampered")

def test_credential_storage(db_session, test_user):
    """Test secure storage of platform credentials."""
    # Create platform credentials
    cred = UserCredential(
        user_id=test_user.id,
        platform="linkedin",
        encrypted_credentials=encrypt_data({
            "username": "linkedin_user",
            "password": "linkedin_pass"
        })
    )
    db_session.add(cred)
    db_session.commit()

    # Retrieve and verify credentials
    stored_cred = db_session.query(UserCredential).filter_by(
        user_id=test_user.id,
        platform="linkedin"
    ).first()

    decrypted = decrypt_data(stored_cred.encrypted_credentials)
    assert decrypted["username"] == "linkedin_user"
    assert decrypted["password"] == "linkedin_pass"

def test_credential_update(db_session, test_user):
    """Test updating stored credentials."""
    # Initial credentials
    cred = UserCredential(
        user_id=test_user.id,
        platform="indeed",
        encrypted_credentials=encrypt_data({
            "username": "old_user",
            "password": "old_pass"
        })
    )
    db_session.add(cred)
    db_session.commit()

    # Update credentials
    new_creds = {
        "username": "new_user",
        "password": "new_pass"
    }
    cred.encrypted_credentials = encrypt_data(new_creds)
    db_session.commit()

    # Verify update
    updated_cred = db_session.query(UserCredential).filter_by(
        user_id=test_user.id,
        platform="indeed"
    ).first()
    decrypted = decrypt_data(updated_cred.encrypted_credentials)
    assert decrypted["username"] == "new_user"
    assert decrypted["password"] == "new_pass"

def test_credential_access_control(db_session, test_user):
    """Test credential access control."""
    # Create another test user
    other_user = User(
        username="otheruser",
        email="other@example.com",
        hashed_password="hashedpass",
        is_active=True
    )
    db_session.add(other_user)
    db_session.commit()

    # Store credentials for first user
    cred = UserCredential(
        user_id=test_user.id,
        platform="google",
        encrypted_credentials=encrypt_data({
            "username": "google_user",
            "password": "google_pass"
        })
    )
    db_session.add(cred)
    db_session.commit()

    # Test access by owner
    with patch("fastapi.Depends", return_value=test_user):
        response = client.get("/api/v1/credentials/google")
        assert response.status_code == 200

    # Test access by non-owner
    with patch("fastapi.Depends", return_value=other_user):
        response = client.get("/api/v1/credentials/google")
        assert response.status_code == 404

def test_credential_rotation(db_session, test_user):
    """Test credential rotation functionality."""
    # Store initial credentials
    cred = UserCredential(
        user_id=test_user.id,
        platform="linkedin",
        encrypted_credentials=encrypt_data({
            "username": "linkedin_user",
            "password": "old_pass"
        })
    )
    db_session.add(cred)
    db_session.commit()

    # Simulate credential rotation
    new_password = "new_rotated_pass"
    cred.encrypted_credentials = encrypt_data({
        "username": "linkedin_user",
        "password": new_password
    })
    cred.last_rotated = datetime.utcnow()
    db_session.commit()

    # Verify rotation
    rotated_cred = db_session.query(UserCredential).filter_by(
        user_id=test_user.id,
        platform="linkedin"
    ).first()
    decrypted = decrypt_data(rotated_cred.encrypted_credentials)
    assert decrypted["password"] == new_password
    assert rotated_cred.last_rotated is not None

def test_credential_validation(db_session, test_user):
    """Test credential validation rules."""
    # Test invalid credentials format
    with pytest.raises(ValueError):
        UserCredential(
            user_id=test_user.id,
            platform="invalid_platform",
            encrypted_credentials="not_encrypted_data"
        )

    # Test unsupported platform
    with pytest.raises(ValueError):
        UserCredential(
            user_id=test_user.id,
            platform="unsupported_platform",
            encrypted_credentials=encrypt_data({
                "username": "user",
                "password": "pass"
            })
        )

def test_bulk_credential_operations(db_session, test_user):
    """Test bulk credential operations."""
    # Create multiple credentials
    platforms = ["linkedin", "indeed", "google"]
    creds = []
    for platform in platforms:
        cred = UserCredential(
            user_id=test_user.id,
            platform=platform,
            encrypted_credentials=encrypt_data({
                "username": f"{platform}_user",
                "password": f"{platform}_pass"
            })
        )
        creds.append(cred)

    # Bulk insert
    db_session.bulk_save_objects(creds)
    db_session.commit()

    # Verify bulk insertion
    stored_creds = db_session.query(UserCredential).filter_by(
        user_id=test_user.id
    ).all()
    assert len(stored_creds) == len(platforms)

    # Test bulk update
    for cred in stored_creds:
        decrypted = decrypt_data(cred.encrypted_credentials)
        decrypted["updated"] = True
        cred.encrypted_credentials = encrypt_data(decrypted)

    db_session.bulk_save_objects(stored_creds)
    db_session.commit()

    # Verify bulk update
    updated_creds = db_session.query(UserCredential).filter_by(
        user_id=test_user.id
    ).all()
    for cred in updated_creds:
        decrypted = decrypt_data(cred.encrypted_credentials)
        assert decrypted["updated"] is True
