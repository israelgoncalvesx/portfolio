import resend


class EmailService:
    @staticmethod
    def send_contact(
        message: dict,
        *,
        api_key: str,
        from_email: str,
        to_email: str,
    ) -> str:
        if not api_key or not from_email or not to_email:
            raise ValueError("Configuração do Resend incompleta.")

        resend.api_key = api_key
        result = resend.Emails.send(
            {
                "from": from_email,
                "to": [to_email],
                "reply_to": message["email"],
                "subject": f"[Portfólio] {message['subject']}",
                "text": (
                    f"Nova mensagem enviada pelo portfólio\n\n"
                    f"Nome: {message['name']}\n"
                    f"E-mail: {message['email']}\n"
                    f"Assunto: {message['subject']}\n\n"
                    f"Mensagem:\n{message['message']}"
                ),
            }
        )
        return result["id"]
