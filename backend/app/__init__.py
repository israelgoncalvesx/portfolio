from flask import Flask, jsonify
from flask_cors import CORS

from .config import Config
from .routes.api import api


def create_app(config_class: type[Config] = Config) -> Flask:
    app = Flask(__name__)
    app.config.from_object(config_class)
    CORS(app, resources={r"/api/*": {"origins": app.config["CORS_ORIGINS"]}})
    app.register_blueprint(api, url_prefix="/api")

    @app.errorhandler(404)
    def not_found(_error):
        return jsonify({"success": False, "data": None, "error": "Rota não encontrada."}), 404

    @app.errorhandler(405)
    def method_not_allowed(_error):
        return jsonify({"success": False, "data": None, "error": "Método não permitido."}), 405

    @app.errorhandler(500)
    def internal_error(_error):
        return jsonify({"success": False, "data": None, "error": "Erro interno do servidor."}), 500

    return app
