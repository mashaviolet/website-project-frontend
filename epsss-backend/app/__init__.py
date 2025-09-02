from flask import Flask, jsonify
from flask_cors import CORS
from app.extension import db, jwt, bcrypt, migrate
from app.Models import admin, newsandevents, gallery, contact, aboutus_model, admissions, home_model, activity_log
from app.controllers.auth_controller import auth_bp
from app.controllers.newsandevents_contoller import news_bp
from app.controllers.contact_controller import contact_bp
from app.controllers.gallery_controller import gallery_bp
from app.controllers.home_controller import home_bp
from app.controllers.aboutus_controller import about_bp
from app.controllers.admissions import admissions_bp
from app.controllers.programs import programs_bp

def create_app():
    app = Flask(__name__)
    app.config.from_object('config.Config')

    # Enable CORS for React dev server(s)
    allowed_origins = [
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "http://localhost:3001",
        "http://127.0.0.1:3001",
    ]
    CORS(
        app,
        resources={r"/api/*": {"origins": allowed_origins}},
        supports_credentials=True,
        allow_headers=["Content-Type", "Authorization"],
        expose_headers=["Content-Type", "Authorization"],
        methods=["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"]
    )

    # Optional cookie settings for local dev
    app.config.setdefault('SESSION_COOKIE_SAMESITE', 'Lax')
    app.config.setdefault('SESSION_COOKIE_SECURE', False)

    @app.get('/api/v1/health')
    def health_check():
        return jsonify({"ok": True}), 200
    
    db.init_app(app)
    migrate.init_app(app,db)
    jwt.init_app(app)
    bcrypt.init_app(app)

    app.register_blueprint(auth_bp)
    app.register_blueprint(news_bp)
    app.register_blueprint(gallery_bp)
    app.register_blueprint(contact_bp)
    app.register_blueprint(home_bp)
    app.register_blueprint(about_bp)
    app.register_blueprint(admissions_bp)
    app.register_blueprint(programs_bp)

    return app
