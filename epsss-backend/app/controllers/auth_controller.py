

from flask import Blueprint, request, jsonify, session
from app.Models.admin import Admin
from app.Models import newsandevents, gallery, contact, aboutus_model
from app.extension import db
from functools import wraps
from http import HTTPStatus
from datetime import datetime, timedelta

auth_bp = Blueprint('auth_bp', __name__, url_prefix='/api/v1/auth')

# Decorator to protect routes
def admin_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        if not session.get('admin_id'):
            return jsonify({"message": "Admin login required"}), HTTPStatus.UNAUTHORIZED
        return f(*args, **kwargs)
    return decorated

# Recent activity (mocked for now)
@auth_bp.route('/recent-activity', methods=['GET'])
@admin_required
def recent_activity():
    # In a real app, fetch from a database table of activity logs
    now = datetime.utcnow()
    activity = [
        {"timestamp": (now - timedelta(minutes=5)).isoformat() + 'Z', "description": "Edited About Us page."},
        {"timestamp": (now - timedelta(minutes=15)).isoformat() + 'Z', "description": "Added new gallery image."},
        {"timestamp": (now - timedelta(hours=1)).isoformat() + 'Z', "description": "Published news article."},
        {"timestamp": (now - timedelta(hours=2)).isoformat() + 'Z', "description": "Updated admissions info."},
        {"timestamp": (now - timedelta(days=1)).isoformat() + 'Z', "description": "Replied to contact message."},
    ]
    return jsonify(activity), HTTPStatus.OK

# Decorator to protect routes
def admin_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        if not session.get('admin_id'):
            return jsonify({"message": "Admin login required"}), HTTPStatus.UNAUTHORIZED
        return f(*args, **kwargs)
    return decorated

# Register admin
@auth_bp.route('/register', methods=['POST'])
def register_user():
    data = request.json or {}
    username = data.get('username')
    password = data.get('password')
    email = data.get('email')
    contact = data.get('contact')

    if not username or not password or not email or not contact:
        return jsonify({'error': 'Username, password, email, and contact are required'}), HTTPStatus.BAD_REQUEST

    if Admin.query.filter_by(username=username).first():
        return jsonify({'error': 'Username already exists'}), HTTPStatus.BAD_REQUEST

    try:
        user = Admin(username=username, email=email, contact=contact)
        user.set_password(password)
        db.session.add(user)
        db.session.commit()
        return jsonify({
            'message': 'User registered successfully',
            'user': {'id': user.id, 'username': user.username}
        }), HTTPStatus.CREATED
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), HTTPStatus.INTERNAL_SERVER_ERROR

# Login
@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.json or {}
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({'error': 'Username and password required'}), HTTPStatus.BAD_REQUEST

    admin = Admin.query.filter_by(username=username).first()
    if admin and admin.check_password(password):
        session['admin_id'] = admin.id
        return jsonify({'message': 'Logged in successfully'}), HTTPStatus.OK

    return jsonify({'error': 'Invalid username or password'}), HTTPStatus.UNAUTHORIZED

# Current session info
@auth_bp.route('/me', methods=['GET'])
def me():
    admin_id = session.get('admin_id')
    if not admin_id:
        return jsonify({"error": "Unauthorized"}), HTTPStatus.UNAUTHORIZED
    user = Admin.query.get(admin_id)
    if not user:
        return jsonify({"error": "Unauthorized"}), HTTPStatus.UNAUTHORIZED
    return jsonify({
        'id': user.id,
        'username': user.username,
        'email': user.email,
        'contact': user.contact,
    }), HTTPStatus.OK

# Logout
@auth_bp.route('/logout', methods=['POST'])
@admin_required
def logout():
    session.pop('admin_id', None)
    return jsonify({'message': 'Logged out successfully'}), HTTPStatus.OK

# Get all admins
@auth_bp.route('/users', methods=['GET'])
@admin_required
def get_all_users():
    users = Admin.query.all()
    result = [{'id': u.id, 'username': u.username, 'email': u.email, 'contact': u.contact} for u in users]
    return jsonify(result), HTTPStatus.OK

# Simple admin stats (protected)
@auth_bp.route('/stats', methods=['GET'])
@admin_required
def admin_stats():
    total_admins = Admin.query.count()
    total_news = newsandevents.NewsAndEvents.query.count() if hasattr(newsandevents, 'NewsAndEvents') else 0
    total_gallery = gallery.Gallery.query.count() if hasattr(gallery, 'Gallery') else 0
    total_contacts = contact.Contact.query.count() if hasattr(contact, 'Contact') else 0
    total_pages = aboutus_model.AboutUs.query.count() if hasattr(aboutus_model, 'AboutUs') else 0
    return jsonify({
        'admins': total_admins,
        'news': total_news,
        'gallery': total_gallery,
        'messages': total_contacts,
        'pages': total_pages,
    }), HTTPStatus.OK

# Update admin
@auth_bp.route('/update/<int:user_id>', methods=['PUT'])
@admin_required
def update_user(user_id):
    user = Admin.query.get_or_404(user_id)
    data = request.json or {}

    user.username = data.get('username', user.username)
    user.email = data.get('email', user.email)
    user.contact = data.get('contact', user.contact)

    if data.get('password'):
        user.set_password(data.get('password'))

    try:
        db.session.commit()
        return jsonify({'message': 'User updated successfully'}), HTTPStatus.OK
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), HTTPStatus.INTERNAL_SERVER_ERROR

# Delete admin
@auth_bp.route('/delete/<int:user_id>', methods=['DELETE'])
@admin_required
def delete_user(user_id):
    user = Admin.query.get_or_404(user_id)
    try:
        db.session.delete(user)
        db.session.commit()
        return jsonify({'message': 'User deleted successfully'}), HTTPStatus.OK
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), HTTPStatus.INTERNAL_SERVER_ERROR
