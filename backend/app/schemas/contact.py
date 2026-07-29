import re

EMAIL_PATTERN = re.compile(r"^[^@\s]+@[^@\s]+\.[^@\s]+$")
LIMITS = {"name": 100, "email": 254, "subject": 150, "message": 2000, "website": 200}


def validate_contact(payload: dict) -> tuple[dict, dict]:
    cleaned = {
        field: str(payload.get(field, "")).strip()
        for field in ("name", "email", "subject", "message", "website")
    }
    errors = {}

    for field in ("name", "email", "subject", "message"):
        if not cleaned[field]:
            errors[field] = "Campo obrigatório."
        elif len(cleaned[field]) > LIMITS[field]:
            errors[field] = f"Use no máximo {LIMITS[field]} caracteres."

    if cleaned["email"] and not EMAIL_PATTERN.match(cleaned["email"]):
        errors["email"] = "Informe um e-mail válido."

    if len(cleaned["website"]) > LIMITS["website"]:
        errors["website"] = "Campo inválido."

    return cleaned, errors
