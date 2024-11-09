import pytest
from datetime import datetime
from src.core.identity_verification.models import VerifiedDocument, DocumentAuditLog, VerificationAttempt
from src.core.auth.models import User

def test_verified_document_creation(db_session):
    user = User(email="test@example.com")
    db_session.add(user)
    db_session.commit()

    document = VerifiedDocument(
        user_id=user.id,
        document_type="passport",
        document_number="ABC123",
        status="pending"
    )
    db_session.add(document)
    db_session.commit()

    assert document.id is not None
    assert document.user_id == user.id
    assert document.document_type == "passport"
