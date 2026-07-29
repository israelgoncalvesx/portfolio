import os
from pathlib import Path

from dotenv import load_dotenv


load_dotenv(Path(__file__).resolve().parents[1] / ".env")


class Config:
    BASE_DIR = Path(__file__).resolve().parent
    DATA_DIR = BASE_DIR / "data"
    CONTACT_LOG_PATH = Path(
        os.getenv("CONTACT_LOG_PATH", BASE_DIR.parent / "instance" / "contact_messages.jsonl")
    )
    CONTACT_TO_EMAIL = os.getenv(
        "CONTACT_TO_EMAIL", "israelgoncalvesx@gmail.com"
    )
    RESEND_API_KEY = os.getenv("RESEND_API_KEY", "")
    RESEND_FROM_EMAIL = os.getenv(
        "RESEND_FROM_EMAIL", "Portfolio <onboarding@resend.dev>"
    )
    CORS_ORIGINS = [
        origin.strip()
        for origin in os.getenv("CORS_ORIGINS", "http://localhost:3000").split(",")
        if origin.strip()
    ]
    MAX_CONTENT_LENGTH = 32 * 1024
    JSON_SORT_KEYS = False
