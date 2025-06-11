from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from config import Config

db = SQLAlchemy()

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    db.init_app(app)

    # Apply CORS to all /api/* routes
    CORS(app, resources={
        r"/api/*": {
            "origins": "*",
            "allow_headers": ["Content-Type", "Authorization"],
            "supports_credentials": True
        }
    })

    from .routes import main
    app.register_blueprint(main, url_prefix='/api')  # All routes prefixed with /api

    return app
