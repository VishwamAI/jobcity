import pytest
from datetime import datetime
from src.core.auth.models import User, UserCredential, UserSession

def test_user_credential_creation(db_session):
    user = User(email="test@example.com")
    db_session.add(user)
    db_session.commit()

    credential = UserCredential(
        user_id=user.id,
        platform="linkedin",
        credential_type="oauth_token",
        credential_value="test_token",
        credential_metadata="test_metadata"
    )
    db_session.add(credential)
    db_session.commit()

    assert credential.id is not None
    assert credential.user_id == user.id
    assert credential.platform == "linkedin"
