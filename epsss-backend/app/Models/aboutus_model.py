from app.extension import db

class AboutContent(db.Model):
    __tablename__ = 'about_content'
    
    id = db.Column(db.Integer, primary_key=True)
    overview = db.Column(db.Text, nullable=False)
    vision = db.Column(db.Text, nullable=True)
    mission = db.Column(db.Text, nullable=True)
    image_url = db.Column(db.String(255), nullable=True)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())
