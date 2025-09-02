# app/controllers/home.py
from flask import Blueprint, request, jsonify
from app.Models.home_model import HomeContent
from app.extension import db

home_bp = Blueprint('home_bp', __name__)

# Get home page content
@home_bp.route('/home', methods=['GET'])
def get_home_content():
    content = HomeContent.query.first()
    if not content:
        return jsonify({"message": "No content found"}), 404
    return jsonify({
        "welcome_text": content.welcome_text,
        "school_name": content.school_name,
        "motto": content.motto,
        "headline": content.headline,
        "intro_text": content.intro_text,
        "image_url": content.image_url,
        "features": content.features or []
    })

# Create home page content
@home_bp.route('/home', methods=['POST'])
def create_home_content():
    data = request.json
    content = HomeContent(
        welcome_text=data.get('welcome_text'),
        school_name=data.get('school_name'),
        motto=data.get('motto'),
        headline=data.get('headline'),
        intro_text=data.get('intro_text'),
        image_url=data.get('image_url'),
        features=data.get('features', [])
    )
    db.session.add(content)
    db.session.commit()
    return jsonify({"message": "Home content created successfully"})

# Update home page content
@home_bp.route('/home', methods=['PUT'])
def update_home_content():
    content = HomeContent.query.first()
    if not content:
        return jsonify({"message": "No content found"}), 404

    data = request.json
    content.welcome_text = data.get('welcome_text', content.welcome_text)
    content.school_name = data.get('school_name', content.school_name)
    content.motto = data.get('motto', content.motto)
    content.headline = data.get('headline', content.headline)
    content.intro_text = data.get('intro_text', content.intro_text)
    content.image_url = data.get('image_url', content.image_url)
    content.features = data.get('features', content.features)

    db.session.commit()
    return jsonify({"message": "Home content updated successfully"})
