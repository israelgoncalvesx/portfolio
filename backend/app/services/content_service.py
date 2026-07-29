import json
from functools import lru_cache

from flask import current_app


class ContentService:
    """Abstrai a fonte de conteúdo para facilitar uma futura troca por PostgreSQL."""

    @staticmethod
    @lru_cache(maxsize=16)
    def _read(path: str):
        with open(path, encoding="utf-8") as file:
            return json.load(file)

    @classmethod
    def get(cls, resource: str):
        path = current_app.config["DATA_DIR"] / f"{resource}.json"
        return cls._read(str(path))
