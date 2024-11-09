"""
Security-focused tests for authentication and middleware.
"""
import pytest
from datetime import datetime, timedelta
from fastapi import FastAPI
from fastapi.testclient import TestClient
from sqlalchemy.orm import Session
from unittest.mock import Mock, patch
import jwt
import os
from ..jwt_handler import JWTHandler
from ..models import User, UserSession, SecurityEvent, FailedLoginAttempt
from ..middleware import SecurityMiddleware, RateLimiter
from ...database import get_db

# Test data
TEST_USER_DATA = {
    "username": "testuser",
    "email": "test@example.com",
    "password": "SecurePass123!",
    "full_name": "Test User"
}

@pytest.fixture
def app():
    """Create test FastAPI application."""
    app = FastAPI()
    return app

@pytest.fixture
def client(app):
    """Create test client."""
    return TestClient(app)

@pytest.fixture
def db_session():
    """Create test database session."""
    return Mock(spec=Session)

@pytest.fixture
def jwt_handler():
    """Create JWT handler instance."""
    return JWTHandler()

class TestJWTAuthentication:
    """Test JWT token generation and validation."""

    def test_token_generation(self, jwt_handler):
        """Test access token generation."""
        token = jwt_handler.create_access_token({"sub": "testuser"})
        assert token
        decoded = jwt_handler.decode_token(token)
        assert decoded["sub"] == "testuser"
        assert decoded["type"] == "access"

    def test_refresh_token(self, jwt_handler):
        """Test refresh token generation and usage."""
        refresh_token = jwt_handler.create_refresh_token({"sub": "testuser"})
        assert refresh_token
        decoded = jwt_handler.decode_token(refresh_token)
        assert decoded["sub"] == "testuser"
        assert decoded["type"] == "refresh"

    def test_token_expiration(self, jwt_handler):
        """Test token expiration."""
        token = jwt_handler.create_access_token(
            {"sub": "testuser"},
            expires_delta=timedelta(seconds=1)
        )
        import time
        time.sleep(2)
        with pytest.raises(Exception):
            jwt_handler.decode_token(token)

    def test_invalid_token(self, jwt_handler):
        """Test invalid token handling."""
        with pytest.raises(Exception):
            jwt_handler.decode_token("invalid.token.here")

class TestUserSecurity:
    """Test user security features."""

    def test_password_hashing(self, db_session):
        """Test secure password hashing."""
        user = User(
            username=TEST_USER_DATA["username"],
            email=TEST_USER_DATA["email"]
        )
        user.password = TEST_USER_DATA["password"]

        assert user.hashed_password != TEST_USER_DATA["password"]
        assert user.verify_password(TEST_USER_DATA["password"])

    def test_password_verification(self, db_session):
        """Test password verification."""
        user = User(
            username=TEST_USER_DATA["username"],
            email=TEST_USER_DATA["email"]
        )
        user.password = TEST_USER_DATA["password"]

        assert user.verify_password(TEST_USER_DATA["password"])
        assert not user.verify_password("wrongpassword")

    def test_failed_login_attempts(self, db_session):
        """Test failed login attempt tracking."""
        attempt = FailedLoginAttempt.get_or_create(
            db_session,
            TEST_USER_DATA["username"],
            "127.0.0.1"
        )

        # Test attempt counting
        for _ in range(4):
            attempt.increment(db_session)
        assert not attempt.should_block()

        # Test blocking after 5 attempts
        attempt.increment(db_session)
        assert attempt.should_block()

class TestSecurityMiddleware:
    """Test security middleware functionality."""

    def test_rate_limiting(self, app, client):
        """Test rate limiting functionality."""
        app.add_middleware(
            SecurityMiddleware,
            rate_limit_requests=2,
            rate_limit_window=1
        )

        @app.get("/test")
        async def test_endpoint():
            return {"message": "test"}

        # Make requests
        response1 = client.get("/test")
        response2 = client.get("/test")
        response3 = client.get("/test")

        assert response1.status_code == 200
        assert response2.status_code == 200
        assert response3.status_code == 429

    def test_security_headers(self, app, client):
        """Test security headers are properly set."""
        app.add_middleware(SecurityMiddleware)

        @app.get("/test")
        async def test_endpoint():
            return {"message": "test"}

        response = client.get("/test")
        headers = response.headers

        assert headers["X-Content-Type-Options"] == "nosniff"
        assert headers["X-Frame-Options"] == "DENY"
        assert headers["X-XSS-Protection"] == "1; mode=block"
        assert "Strict-Transport-Security" in headers
        assert "Content-Security-Policy" in headers

    def test_ip_blocking(self, app, client):
        """Test IP blocking functionality."""
        middleware = SecurityMiddleware(app, rate_limit_requests=1)
        middleware._block_ip("127.0.0.1")

        assert middleware._is_ip_blocked("127.0.0.1")
        assert not middleware._is_ip_blocked("127.0.0.2")

class TestRateLimiter:
    """Test rate limiter functionality."""

    @pytest.mark.asyncio
    async def test_rate_limiting(self):
        """Test rate limiting logic."""
        limiter = RateLimiter(max_requests=2, window_seconds=1)

        assert await limiter.is_allowed("test_key")
        assert await limiter.is_allowed("test_key")
        assert not await limiter.is_allowed("test_key")

    @pytest.mark.asyncio
    async def test_window_reset(self):
        """Test rate limit window reset."""
        limiter = RateLimiter(max_requests=1, window_seconds=1)

        assert await limiter.is_allowed("test_key")
        assert not await limiter.is_allowed("test_key")

        # Wait for window reset
        import asyncio
        await asyncio.sleep(1)
        assert await limiter.is_allowed("test_key")

class TestSecurityEvents:
    """Test security event logging."""

    def test_security_event_logging(self, db_session):
        """Test security event creation and querying."""
        event = SecurityEvent(
            event_type="LOGIN_ATTEMPT",
            ip_address="127.0.0.1",
            user_agent="test-agent",
            details="Failed login attempt",
            severity="WARNING"
        )
        db_session.add(event)
        db_session.commit()

        logged_event = db_session.query(SecurityEvent).first()
        assert logged_event.event_type == "LOGIN_ATTEMPT"
        assert logged_event.severity == "WARNING"

if __name__ == "__main__":
    pytest.main(["-v"])
