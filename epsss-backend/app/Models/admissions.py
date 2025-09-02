from app.extension import db


import json

class AdmissionsContent(db.Model):
    __tablename__ = 'admissions_content'
    id = db.Column(db.Integer, primary_key=True)
    intro_text = db.Column(db.Text, nullable=False)
    requirements = db.Column(db.Text, nullable=True)  # Store as JSON string
    procedure = db.Column(db.Text, nullable=True)  # Store as JSON string (list of steps)
    fees_info = db.Column(db.Text, nullable=True)
    form_url = db.Column(db.String(255), nullable=True)
    fee_structure = db.Column(db.Text, nullable=True)  # JSON string
    fee_notes = db.Column(db.Text, nullable=True)  # New: JSON string (list of notes)
    important_dates = db.Column(db.Text, nullable=True)  # JSON string
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())
