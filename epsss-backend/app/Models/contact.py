from app.extension import db

class Contact(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    full_name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), nullable=False)
    subject = db.Column(db.String(150))
    message = db.Column(db.Text, nullable=False)
    phone_number = db.Column(db.String(20), nullable=False)
    date_sent = db.Column(db.DateTime, server_default=db.func.now())


    def __init__(self, full_name, email, subject,message,phone_number):
        self.full_name = full_name
        self.email = email
        self.subject = subject
        self.message = message
        self.phone_number = phone_number