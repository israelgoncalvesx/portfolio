from app import create_app
from app.config import Config


class TestConfig(Config):
    TESTING = True


def test_health():
    client = create_app(TestConfig).test_client()
    response = client.get("/api/health")
    assert response.status_code == 200
    assert response.json["data"]["status"] == "ok"


def test_content_routes():
    client = create_app(TestConfig).test_client()
    for route in ("profile", "skills", "projects", "experiences", "education", "social-links"):
        response = client.get(f"/api/{route}")
        assert response.status_code == 200
        assert response.json["success"] is True


def test_invalid_contact():
    client = create_app(TestConfig).test_client()
    response = client.post("/api/contact", json={"name": "Israel"})
    assert response.status_code == 422
    assert "email" in response.json["data"]["fields"]
