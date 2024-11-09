from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Boolean
from sqlalchemy.orm import relationship
from ..base import Base
from datetime import datetime, UTC

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=lambda: datetime.now(UTC))

    documents = relationship("VerifiedDocument", back_populates="user")
    sessions = relationship("UserSession", back_populates="user")
    credentials = relationship("UserCredential", back_populates="user")

class UserSession(Base):
    __tablename__ = "user_sessions"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    token = Column(String)
    expires_at = Column(DateTime)
    created_at = Column(DateTime, default=lambda: datetime.now(UTC))

    user = relationship("User", back_populates="sessions")

class SecurityEvent(Base):
    __tablename__ = "security_events"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    event_type = Column(String)
    description = Column(String)
    created_at = Column(DateTime, default=lambda: datetime.now(UTC))

class FailedLoginAttempt(Base):
    __tablename__ = "failed_login_attempts"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, index=True)
    attempt_count = Column(Integer, default=1)
    last_attempt = Column(DateTime, default=lambda: datetime.now(UTC))

class PasswordReset(Base):
    __tablename__ = "password_resets"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    token = Column(String, unique=True)
    expires_at = Column(DateTime)
    created_at = Column(DateTime, default=lambda: datetime.now(UTC))

class UserCredential(Base):
    __tablename__ = "user_credentials"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    platform = Column(String)  # e.g., "linkedin", "indeed", "google"
    credential_type = Column(String)  # e.g., "oauth_token", "api_key"
    credential_value = Column(String)  # encrypted credential value
    credential_metadata = Column(String, nullable=True)  # Additional platform-specific data
    expires_at = Column(DateTime, nullable=True)
    created_at = Column(DateTime, default=lambda: datetime.now(UTC))
    updated_at = Column(DateTime, default=lambda: datetime.now(UTC), onupdate=lambda: datetime.now(UTC))

    user = relationship("User", back_populates="credentials")

    def __repr__(self):
        return f"<UserCredential(user_id={self.user_id}, platform={self.platform})>"
