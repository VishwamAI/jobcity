import pytest
from fastapi.testclient import TestClient
from src.backend_integration import app

client = TestClient(app)

def test_root_endpoint():
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"message": "Welcome to the Auto_Jobs_Applier_AIHawk API"}

def test_health_check_endpoint():
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json() == {"status": "healthy"}

def test_cors_headers():
    response = client.get("/", headers={"Origin": "http://example.com"})
    assert response.status_code == 200
    assert "access-control-allow-origin" in response.headers
    assert response.headers["access-control-allow-origin"] == "*"
    assert "access-control-allow-credentials" in response.headers
    assert response.headers["access-control-allow-credentials"] == "true"

def test_cors_preflight():
    response = client.options(
        "/",
        headers={
            "Origin": "http://example.com",
            "Access-Control-Request-Method": "GET",
            "Access-Control-Request-Headers": "X-Example",
        },
    )
    assert response.status_code == 200
    assert response.headers["access-control-allow-origin"] == "http://example.com"
    assert "GET" in response.headers["access-control-allow-methods"]
    assert "X-Example" in response.headers["access-control-allow-headers"]

def test_fastapi_app_instance():
    assert app.title == "FastAPI"
    assert app.version == "0.1.0"
