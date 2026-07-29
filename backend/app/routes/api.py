from flask import Blueprint, current_app, jsonify, request

from ..schemas.contact import validate_contact
from ..services.content_service import ContentService
from ..services.contact_service import ContactService
from ..services.email_service import EmailService

api = Blueprint("api", __name__)


def response(data=None, error=None, status=200):
    return jsonify({"success": error is None, "data": data, "error": error}), status


@api.get("/health")
def health():
    return response({"status": "ok", "service": "portfolio-api"})


@api.get("/profile")
def profile():
    return response(ContentService.get("profile"))


@api.get("/skills")
def skills():
    return response(ContentService.get("skills"))


@api.get("/projects")
def projects():
    return response(ContentService.get("projects"))


@api.get("/experiences")
def experiences():
    return response(ContentService.get("experiences"))


@api.get("/education")
def education():
    return response(ContentService.get("education"))


@api.get("/social-links")
def social_links():
    return response(ContentService.get("social_links"))


@api.get("/featured-research")
def featured_research():
    return response(ContentService.get("featured_research"))


@api.post("/contact")
def contact():
    payload = request.get_json(silent=True)
    if not isinstance(payload, dict):
        return response(error="Envie um corpo JSON válido.", status=400)

    cleaned, errors = validate_contact(payload)
    if errors:
        return response({"fields": errors}, "Revise os campos informados.", 422)

    if cleaned.pop("website", ""):
        return response({"message": "Mensagem recebida. Obrigado!"}, status=201)

    try:
        EmailService.send_contact(
            cleaned,
            api_key=current_app.config["RESEND_API_KEY"],
            from_email=current_app.config["RESEND_FROM_EMAIL"],
            to_email=current_app.config["CONTACT_TO_EMAIL"],
        )
    except ValueError:
        current_app.logger.error("Resend não está configurado.")
        return response(
            error="O envio de mensagens está temporariamente indisponível.",
            status=503,
        )
    except Exception:
        current_app.logger.exception("Falha ao enviar mensagem pelo Resend.")
        return response(
            error="Não foi possível enviar a mensagem. Tente novamente mais tarde.",
            status=502,
        )

    ContactService.save(cleaned, current_app.config["CONTACT_LOG_PATH"])
    return response(
        {"message": "Mensagem recebida. Responderei assim que possível."}, status=201
    )
