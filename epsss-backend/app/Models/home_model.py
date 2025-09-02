# app/models/home.py
from app.extension import db


class HomeContent(db.Model):
    __tablename__ = 'home_content'

    id = db.Column(db.Integer, primary_key=True)
    welcome_text = db.Column(db.String(255), nullable=True)
    school_name = db.Column(db.String(255), nullable=True)
    motto = db.Column(db.String(255), nullable=True)
    headline = db.Column(db.String(255), nullable=True)  # legacy, can be used for section title
    intro_text = db.Column(db.Text, nullable=True)
    image_url = db.Column(db.String(255), nullable=True)  # hero image or slider image
    features = db.Column(db.JSON, nullable=True)  # list of {title, description, icon}
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    def __init__(self, welcome_text=None, school_name=None, motto=None, headline=None, intro_text=None, image_url=None, features=None):
        self.welcome_text = welcome_text
        self.school_name = school_name
        self.motto = motto
        self.headline = headline
        self.intro_text = intro_text
        self.image_url = image_url
        self.features = features or []
        