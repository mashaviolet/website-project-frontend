
from flask import Blueprint, request, jsonify
from app.Models.aboutus_model import AboutContent
from app.extension import db
from app.utils.activity import log_activity

about_bp = Blueprint('about_bp', __name__)

# GET about page content
@about_bp.route('/about', methods=['GET'])
def get_about_content():
    content = AboutContent.query.first()
    if not content:
        return jsonify({"message": "No content found"}), 404
    return jsonify({
        "overview": content.overview,
        "vision": content.vision,
        "mission": content.mission,
        "image_url": content.image_url
    })

# POST create about page content
@about_bp.route('/about', methods=['POST'])
def create_about_content():
    if AboutContent.query.first():
        return jsonify({"message": "Content already exists. Use PUT to update."}), 400

    data = request.json
    content = AboutContent(
        overview=data.get('overview'),
        vision=data.get('vision'),
        mission=data.get('mission'),
        image_url=data.get('image_url')
    )
    db.session.add(content)
    db.session.commit()
    log_activity("Created About Us content")
    return jsonify({"message": "About Us content created successfully"})

# PUT update about page content
@about_bp.route('/about', methods=['PUT'])
def update_about_content():
    content = AboutContent.query.first()
    if not content:
        return jsonify({"message": "No content found"}), 404

    data = request.json
    content.overview = data.get('overview', content.overview)
    content.vision = data.get('vision', content.vision)
    content.mission = data.get('mission', content.mission)
    content.image_url = data.get('image_url', content.image_url)
    
    db.session.commit()
    log_activity("Updated About Us content")
    return jsonify({"message": "About Us content updated successfully"})
