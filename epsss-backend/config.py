# creating a class called config
import os
class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY', 'dev_key')
    SQLALCHEMY_DATABASE_URI = os.environ.get(
        'SQLALCHEMY_DATABASE_URI',
        'mysql+pymysql://root:@localhost/ENTEBBE_PARENTS'
    )
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    JWT_SECRET_KEY = os.environ.get('JWT_SECRET_KEY', 'jwt-secret-key')

    # Secure cookie settings for production
    SESSION_COOKIE_SECURE = True         # Only send cookies over HTTPS
    SESSION_COOKIE_HTTPONLY = True       # Prevent JavaScript access
    SESSION_COOKIE_SAMESITE = 'Lax'      # Protect against CSRF (use 'Strict' for more security)
