from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from config import Config

db = SQLAlchemy()

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    db.init_app(app)
    # Enable CORS globally for all /api/* and /admin/* endpoints with credentials support and allow Content-Type, Authorization headers
    CORS(app, resources={
        r"/api/*": {"origins": "http://localhost:5173", "allow_headers": ["Content-Type", "Authorization"]},
        r"/admin/*": {"origins": "http://localhost:5173", "allow_headers": ["Content-Type", "Authorization"]}
    }, supports_credentials=True)

    from .routes import main
    app.register_blueprint(main)  

    return app
