"""
Tests for document validation system.
"""
import pytest
from datetime import datetime, timedelta
import os
from PIL import Image
import io
from ..document_validator import DocumentValidator
from ..aadhaar_validator import AadhaarValidator
from ..passport_validator import PassportValidator
from ..encryption import DocumentEncryption, DocumentHasher
from ..models import VerifiedDocument, DocumentStatus
from fastapi.testclient import TestClient
from ....main import app
from sqlalchemy.orm import Session
from unittest.mock import Mock, patch

# Test data
SAMPLE_AADHAAR_DATA = {
    'aadhaar_number': '123456789012',
    'name': 'John Doe',
    'dob': datetime(1990, 1, 1),
    'gender': 'MALE'
}

SAMPLE_PASSPORT_DATA = {
    'passport_number': 'A1234567',
    'name': 'John',
    'surname': 'Doe',
    'nationality': 'USA',
    'dob': datetime(1990, 1, 1),
    'expiry_date': datetime.now() + timedelta(days=365),
    'gender': 'M'
}

@pytest.fixture
def db_session():
    """Create test database session."""
    # This would be replaced with actual test database setup
    return Mock(spec=Session)

@pytest.fixture
def client():
    """Create test client."""
    return TestClient(app)

@pytest.fixture
def mock_current_user():
    """Mock authenticated user."""
    return Mock(id=1, username="testuser")

class TestDocumentEncryption:
    """Test document encryption functionality."""

    def test_document_encryption(self):
        """Test document encryption and decryption."""
        encryption = DocumentEncryption()
        test_data = b"test document data"

        # Encrypt data
        encrypted_data, key, iv, salt = encryption.encrypt_document(test_data)
        assert encrypted_data != test_data

        # Decrypt data
        decrypted_data = encryption.decrypt_document(encrypted_data, key, iv)
        assert decrypted_data == test_data

    def test_document_hasher(self):
        """Test document hashing."""
        hasher = DocumentHasher()
        test_data = b"test document data"

        # Create hash
        doc_hash = hasher.hash_document(test_data)
        assert doc_hash

        # Verify hash
        assert hasher.verify_document_hash(test_data, doc_hash)

class TestAadhaarValidator:
    """Test Aadhaar card validation."""

    @pytest.fixture
    def validator(self):
        """Create Aadhaar validator instance."""
        return AadhaarValidator()

    async def test_validate_valid_aadhaar(self, validator):
        """Test validation of valid Aadhaar data."""
        is_valid, message, _ = await validator._validate_extracted_data(
            SAMPLE_AADHAAR_DATA,
            {}
        )
        assert is_valid
        assert "passed" in message.lower()

    async def test_validate_invalid_aadhaar(self, validator):
        """Test validation of invalid Aadhaar data."""
        invalid_data = SAMPLE_AADHAAR_DATA.copy()
        invalid_data['aadhaar_number'] = '123'  # Invalid number
        is_valid, message, _ = await validator._validate_extracted_data(
            invalid_data,
            {}
        )
        assert not is_valid
        assert "invalid" in message.lower()

    def test_aadhaar_number_validation(self, validator):
        """Test Aadhaar number format validation."""
        assert validator._validate_aadhaar_number('123456789012')
        assert not validator._validate_aadhaar_number('123')

class TestPassportValidator:
    """Test passport validation."""

    @pytest.fixture
    def validator(self):
        """Create passport validator instance."""
        return PassportValidator()

    async def test_validate_valid_passport(self, validator):
        """Test validation of valid passport data."""
        is_valid, message, _ = await validator._validate_extracted_data(
            SAMPLE_PASSPORT_DATA,
            {}
        )
        assert is_valid
        assert "passed" in message.lower()

    async def test_validate_invalid_passport(self, validator):
        """Test validation of invalid passport data."""
        invalid_data = SAMPLE_PASSPORT_DATA.copy()
        invalid_data['passport_number'] = '123'  # Invalid number
        is_valid, message, _ = await validator._validate_extracted_data(
            invalid_data,
            {}
        )
        assert not is_valid
        assert "invalid" in message.lower()

    def test_passport_number_validation(self, validator):
        """Test passport number format validation."""
        assert validator._validate_passport_number('A1234567')
        assert not validator._validate_passport_number('123')

class TestDocumentAPI:
    """Test document API endpoints."""

    @pytest.mark.asyncio
    async def test_upload_document(self, client, db_session, mock_current_user):
        """Test document upload endpoint."""
        with patch('fastapi.Depends', return_value=db_session):
            with patch('src.core.auth.get_current_user', return_value=mock_current_user):
                # Create test image
                img = Image.new('RGB', (100, 100), color='white')
                img_byte_arr = io.BytesIO()
                img.save(img_byte_arr, format='PNG')
                img_byte_arr = img_byte_arr.getvalue()

                response = client.post(
                    "/api/v1/documents/upload",
                    files={"file": ("test.png", img_byte_arr, "image/png")},
                    data={"document_type": "AADHAAR"}
                )

                assert response.status_code == 200
                assert "document_id" in response.json()

    @pytest.mark.asyncio
    async def test_get_document_status(self, client, db_session, mock_current_user):
        """Test document status endpoint."""
        with patch('fastapi.Depends', return_value=db_session):
            with patch('src.core.auth.get_current_user', return_value=mock_current_user):
                # Mock document in database
                mock_doc = Mock(
                    status=DocumentStatus.VERIFIED.value,
                    verification_date=datetime.now(),
                    expiration_date=datetime.now() + timedelta(days=365)
                )
                db_session.query.return_value.filter.return_value.first.return_value = mock_doc

                response = client.get("/api/v1/documents/1/status")
                assert response.status_code == 200
                assert response.json()["status"] == DocumentStatus.VERIFIED.value

def test_rate_limiting():
    """Test rate limiting functionality."""
    from ..api import rate_limiter

    # Test rate limiting
    user_id = "test_user"
    assert not rate_limiter.is_rate_limited(user_id)

    # Simulate multiple attempts
    for _ in range(10):
        rate_limiter.increment_attempts(user_id)

    assert rate_limiter.is_rate_limited(user_id)

if __name__ == '__main__':
    pytest.main(['-v'])
