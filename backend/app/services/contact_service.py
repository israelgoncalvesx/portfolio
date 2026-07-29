import json
from datetime import datetime, timezone
from pathlib import Path


class ContactService:
    @staticmethod
    def save(message: dict, path: Path) -> None:
        path.parent.mkdir(parents=True, exist_ok=True)
        record = {**message, "received_at": datetime.now(timezone.utc).isoformat()}
        with path.open("a", encoding="utf-8") as file:
            file.write(json.dumps(record, ensure_ascii=False) + "\n")
        print(f"[contato] Nova mensagem de {message['name']} <{message['email']}>")
