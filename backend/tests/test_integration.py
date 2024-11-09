"""
Integration tests for frontend-backend interaction.
"""
import pytest
from fastapi.testclient import TestClient
from sqlalchemy.orm import Session
from unittest.mock import Mock, patch
import json
import os
from datetime import datetime

from src.core.auth.models import User
from src.core.identity_verification.models import VerifiedDocument
from src.core.job_platform.models import JobApplication
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
    """Create a test user with verified documents."""
    user = User(
        username="testuser",
        email="test@example.com",
        hashed_password="hashedpassword",
        is_active=True
    )
    db_session.add(user)
    db_session.commit()

    # Add verified document
    doc = VerifiedDocument(
        user_id=user.id,
        document_type="AADHAAR",
        status="VERIFIED",
        verification_date=datetime.utcnow()
    )
    db_session.add(doc)
    db_session.commit()

    return user

def test_user_registration_flow():
    """Test complete user registration flow."""
    # Test registration
    response = client.post(
        "/api/v1/auth/register",
        json={
            "username": "newuser",
            "email": "new@example.com",
            "password": "securepass123"
        }
    )
    assert response.status_code == 201
    assert "id" in response.json()

    # Test login with new user
    response = client.post(
        "/api/v1/auth/login",
        json={
            "username": "newuser",
            "password": "securepass123"
        }
    )
    assert response.status_code == 200
    assert "access_token" in response.json()

def test_document_verification_flow(test_user):
    """Test complete document verification flow."""
    # Login
    response = client.post(
        "/api/v1/auth/login",
        json={
            "username": test_user.username,
            "password": "testpassword123"
        }
    )
    token = response.json()["access_token"]
    headers = {"Authorization": f"Bearer {token}"}

    # Upload document
    test_doc = b"test document content"
    files = {"file": ("test.pdf", test_doc, "application/pdf")}
    response = client.post(
        "/api/v1/identity/documents/upload",
        headers=headers,
        files=files,
        data={"document_type": "AADHAAR"}
    )
    assert response.status_code == 202
    doc_id = response.json()["document_id"]

    # Check verification status
    response = client.get(
        f"/api/v1/identity/documents/{doc_id}/status",
        headers=headers
    )
    assert response.status_code == 200
    assert "status" in response.json()

def test_job_application_flow(test_user, db_session):
    """Test complete job application flow."""
    # Login
    response = client.post(
        "/api/v1/auth/login",
        json={
            "username": test_user.username,
            "password": "testpassword123"
        }
    )
    token = response.json()["access_token"]
    headers = {"Authorization": f"Bearer {token}"}

    # Submit job application
    job_data = {
        "platform": "linkedin",
        "job_id": "test123",
        "company": "Test Company",
        "position": "Software Engineer",
        "location": "Remote"
    }
    response = client.post(
        "/api/v1/jobs/apply",
        headers=headers,
        json=job_data
    )
    assert response.status_code == 201
    assert "application_id" in response.json()

    # Check application status
    app_id = response.json()["application_id"]
    response = client.get(
        f"/api/v1/jobs/applications/{app_id}",
        headers=headers
    )
    assert response.status_code == 200
    assert response.json()["status"] in ["PENDING", "SUBMITTED"]

def test_profile_update_flow(test_user):
    """Test profile update and verification flow."""
    # Login
    response = client.post(
        "/api/v1/auth/login",
        json={
            "username": test_user.username,
            "password": "testpassword123"
        }
    )
    token = response.json()["access_token"]
    headers = {"Authorization": f"Bearer {token}"}

    # Update profile
    profile_data = {
        "full_name": "Test User",
        "phone": "+1234567890",
        "skills": ["Python", "React", "FastAPI"],
        "experience": [
            {
                "company": "Previous Corp",
                "position": "Developer",
                "duration": "2 years"
            }
        ]
    }
    response = client.put(
        "/api/v1/users/profile",
        headers=headers,
        json=profile_data
    )
    assert response.status_code == 200

    # Verify profile update
    response = client.get(
        "/api/v1/users/profile",
        headers=headers
    )
    assert response.status_code == 200
    assert response.json()["full_name"] == profile_data["full_name"]
    assert response.json()["skills"] == profile_data["skills"]

def test_error_handling():
    """Test error handling in integrated flows."""
    # Test invalid login
    response = client.post(
        "/api/v1/auth/login",
        json={
            "username": "nonexistent",
            "password": "wrongpass"
        }
    )
    assert response.status_code == 401

    # Test unauthorized access
    response = client.get("/api/v1/jobs/applications")
    assert response.status_code == 401

    # Test invalid document upload
    response = client.post(
        "/api/v1/identity/documents/upload",
        files={"file": ("test.txt", b"invalid content", "text/plain")},
        data={"document_type": "INVALID"}
    )
    assert response.status_code in [401, 400]

def test_concurrent_operations(test_user):
    """Test handling of concurrent operations."""
    # Login multiple times
    tokens = []
    for _ in range(3):
        response = client.post(
            "/api/v1/auth/login",
            json={
                "username": test_user.username,
                "password": "testpassword123"
            }
        )
        tokens.append(response.json()["access_token"])

    # Simulate concurrent requests
    import asyncio
    import aiohttp

    async def make_concurrent_requests():
        async with aiohttp.ClientSession() as session:
            tasks = []
            for token in tokens:
                headers = {"Authorization": f"Bearer {token}"}
                task = session.get(
                    "http://testserver/api/v1/users/profile",
                    headers=headers
                )
                tasks.append(task)
            responses = await asyncio.gather(*tasks)
            return [r.status for r in responses]

    loop = asyncio.get_event_loop()
    status_codes = loop.run_until_complete(make_concurrent_requests())
    assert all(status == 200 for status in status_codes)

def test_frontend_api_integration():
    """Test frontend-specific API endpoints."""
    # Test health check endpoint
    response = client.get("/api/v1/health")
    assert response.status_code == 200

    # Test API documentation endpoint
    response = client.get("/docs")
    assert response.status_code == 200

    # Test OpenAPI schema endpoint
    response = client.get("/openapi.json")
    assert response.status_code == 200
    assert "paths" in response.json()

def test_cors_configuration():
    """Test CORS configuration for frontend integration."""
    headers = {
        "Origin": "http://localhost:3000",
        "Access-Control-Request-Method": "POST",
        "Access-Control-Request-Headers": "content-type",
    }

    # Test preflight request
    response = client.options(
        "/api/v1/auth/login",
        headers=headers
    )
    assert response.status_code == 200
    assert "access-control-allow-origin" in response.headers
    assert "access-control-allow-methods" in response.headers
    assert "access-control-allow-headers" in response.headers

def test_websocket_integration():
    """Test WebSocket integration for real-time updates."""
    from fastapi.testclient import TestClient
    from fastapi.websockets import WebSocket

    # Test WebSocket connection
    with client.websocket_connect("/ws/status") as websocket:
        # Send test message
        websocket.send_json({"type": "subscribe", "user_id": 1})

        # Receive response
        data = websocket.receive_json()
        assert "status" in data
        assert data["status"] == "connected"

        # Test status updates
        websocket.send_json({"type": "ping"})
        data = websocket.receive_json()
        assert data["type"] == "pong"
