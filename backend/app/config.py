import os
from pathlib import Path


class Config:
    BASE_DIR = Path(__file__).resolve().parent
    DATA_DIR = BASE_DIR / "data"
    CONTACT_LOG_PATH = Path(
        os.getenv("CONTACT_LOG_PATH", BASE_DIR.parent / "instance" / "contact_messages.jsonl")
    )
    CORS_ORIGINS = [
        origin.strip()
        for origin in os.getenv("CORS_ORIGINS", "http://localhost:3000").split(",")
        if origin.strip()
    ]
    MAX_CONTENT_LENGTH = 32 * 1024
    JSON_SORT_KEYS = False
