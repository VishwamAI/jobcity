"""
Unit tests for document validation functionality.
"""
import pytest
from fastapi.testclient import TestClient
from sqlalchemy.orm import Session
import os
from datetime import datetime, timedelta
from unittest.mock import Mock, patch

from src.core.identity_verification.document_validator import DocumentValidator
from src.core.identity_verification.aadhaar_validator import AadhaarValidator
from src.core.identity_verification.passport_validator import PassportValidator
from src.core.identity_verification.models import VerifiedDocument, DocumentStatus
from src.core.database import get_db
from src.main import app

# Test client setup
client = TestClient(app)

# Mock data
MOCK_AADHAAR_DATA = {
    "number": "1234-5678-9012",
    "name": "Test User",
    "dob": "1990-01-01",
    "gender": "M",
    "address": "123 Test Street, Test City, 123456"
}

MOCK_PASSPORT_DATA = {
    "number": "A1234567",
    "name": "Test User",
    "dob": "1990-01-01",
    "nationality": "IND",
    "expiry_date": (datetime.now() + timedelta(days=365)).strftime("%Y-%m-%d")
}

@pytest.fixture
def db_session():
    """Create a fresh database session for each test."""
    # Setup test database session
    db = next(get_db())
    yield db
    db.close()

@pytest.fixture
def mock_user():
    """Create a mock authenticated user."""
    return Mock(id=1, username="testuser")

def test_aadhaar_validation():
    """Test Aadhaar card validation logic."""
    validator = AadhaarValidator()

    # Test valid Aadhaar
    is_valid, message, data = validator.validate_document(MOCK_AADHAAR_DATA)
    assert is_valid
    assert "successfully" in message.lower()
    assert data["number"] == MOCK_AADHAAR_DATA["number"]

    # Test invalid Aadhaar number
    invalid_data = MOCK_AADHAAR_DATA.copy()
    invalid_data["number"] = "1234"
    is_valid, message, _ = validator.validate_document(invalid_data)
    assert not is_valid
    assert "invalid" in message.lower()

def test_passport_validation():
    """Test passport validation logic."""
    validator = PassportValidator()

    # Test valid passport
    is_valid, message, data = validator.validate_document(MOCK_PASSPORT_DATA)
    assert is_valid
    assert "successfully" in message.lower()
    assert data["number"] == MOCK_PASSPORT_DATA["number"]

    # Test expired passport
    expired_data = MOCK_PASSPORT_DATA.copy()
    expired_data["expiry_date"] = (datetime.now() - timedelta(days=1)).strftime("%Y-%m-%d")
    is_valid, message, _ = validator.validate_document(expired_data)
    assert not is_valid
    assert "expired" in message.lower()

@pytest.mark.asyncio
async def test_document_upload_endpoint(db_session, mock_user):
    """Test document upload API endpoint."""
    with patch("fastapi.Depends", return_value=mock_user):
        # Test valid Aadhaar upload
        response = client.post(
            "/api/v1/identity/documents/upload",
            json={
                "document_type": "AADHAAR",
                "metadata": MOCK_AADHAAR_DATA
            },
            files={"file": ("test.pdf", b"test content", "application/pdf")}
        )
        assert response.status_code == 202
        assert "success" in response.json()["status"]

        # Test invalid document type
        response = client.post(
            "/api/v1/identity/documents/upload",
            json={
                "document_type": "INVALID",
                "metadata": {}
            },
            files={"file": ("test.pdf", b"test content", "application/pdf")}
        )
        assert response.status_code == 400

def test_document_status_tracking(db_session, mock_user):
    """Test document status tracking functionality."""
    # Create a test document
    doc = VerifiedDocument(
        user_id=mock_user.id,
        document_type="AADHAAR",
        status=DocumentStatus.PENDING.value
    )
    db_session.add(doc)
    db_session.commit()

    # Test status retrieval
    response = client.get(f"/api/v1/identity/documents/{doc.id}/status")
    assert response.status_code == 200
    assert response.json()["status"] == DocumentStatus.PENDING.value

    # Update status
    doc.status = DocumentStatus.VERIFIED.value
    db_session.commit()

    # Test updated status
    response = client.get(f"/api/v1/identity/documents/{doc.id}/status")
    assert response.status_code == 200
    assert response.json()["status"] == DocumentStatus.VERIFIED.value

@pytest.mark.asyncio
async def test_background_verification(db_session, mock_user):
    """Test background verification process."""
    # Create a test document
    doc = VerifiedDocument(
        user_id=mock_user.id,
        document_type="PASSPORT",
        status=DocumentStatus.PENDING.value
    )
    db_session.add(doc)
    db_session.commit()

    # Simulate background verification
    from src.core.identity_verification.api import perform_background_verification
    await perform_background_verification(doc.id, MOCK_PASSPORT_DATA, db_session)

    # Verify status update
    updated_doc = db_session.query(VerifiedDocument).filter_by(id=doc.id).first()
    assert updated_doc.status == DocumentStatus.VERIFIED.value
    assert updated_doc.verification_date is not None

def test_rate_limiting(db_session, mock_user):
    """Test rate limiting functionality."""
    # Test multiple rapid requests
    for _ in range(5):  # Assuming rate limit is higher than 5
        response = client.post(
            "/api/v1/identity/documents/upload",
            json={
                "document_type": "AADHAAR",
                "metadata": MOCK_AADHAAR_DATA
            },
            files={"file": ("test.pdf", b"test content", "application/pdf")}
        )

    # The next request should be rate limited
    response = client.post(
        "/api/v1/identity/documents/upload",
        json={
            "document_type": "AADHAAR",
            "metadata": MOCK_AADHAAR_DATA
        },
        files={"file": ("test.pdf", b"test content", "application/pdf")}
    )
    assert response.status_code == 429
    assert "too many" in response.json()["detail"].lower()
