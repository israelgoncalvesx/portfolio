from unittest.mock import patch

from app import create_app
from app.config import Config
from app.services.email_service import EmailService


class TestConfig(Config):
    TESTING = True
    RESEND_API_KEY = "re_test"
    RESEND_FROM_EMAIL = "Portfolio <onboarding@resend.dev>"
    CONTACT_TO_EMAIL = "israelgoncalvesx@gmail.com"


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


@patch("app.routes.api.ContactService.save")
@patch("app.routes.api.EmailService.send_contact", return_value="email-id")
def test_valid_contact_sends_email(send_contact, save_contact):
    client = create_app(TestConfig).test_client()
    message = {
        "name": "Visitante",
        "email": "visitante@example.com",
        "subject": "Oportunidade",
        "message": "Gostaria de conversar sobre um projeto.",
        "website": "",
    }

    response = client.post("/api/contact", json=message)

    assert response.status_code == 201
    assert response.json["success"] is True
    send_contact.assert_called_once()
    assert send_contact.call_args.kwargs["to_email"] == (
        "israelgoncalvesx@gmail.com"
    )
    save_contact.assert_called_once()


@patch(
    "app.services.email_service.resend.Emails.send",
    return_value={"id": "email-id"},
)
def test_email_service_builds_resend_message(resend_send):
    message = {
        "name": "Visitante",
        "email": "visitante@example.com",
        "subject": "Oportunidade",
        "message": "Gostaria de conversar sobre um projeto.",
    }

    email_id = EmailService.send_contact(
        message,
        api_key="re_test",
        from_email="Portfolio <contato@example.com>",
        to_email="israelgoncalvesx@gmail.com",
    )

    assert email_id == "email-id"
    payload = resend_send.call_args.args[0]
    assert payload["to"] == ["israelgoncalvesx@gmail.com"]
    assert payload["reply_to"] == "visitante@example.com"
