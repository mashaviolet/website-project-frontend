from flask import Blueprint, request, jsonify
from app.Models.gallery import Gallery
from app.extension import db

gallery_bp = Blueprint('gallery_bp', __name__)

# GET all gallery images
@gallery_bp.route('/gallery', methods=['GET'])
def get_gallery():
    images = Gallery.query.order_by(Gallery.created_at.desc()).all()
    result = [{"id": img.id, "image_url": img.image_url, "caption": img.caption} for img in images]
    return jsonify(result)

# POST add image
@gallery_bp.route('/gallery', methods=['POST'])
def add_image():
    data = request.json
    img = Gallery(image_url=data.get('image_url'), caption=data.get('caption'))
    db.session.add(img)
    db.session.commit()
    return jsonify({"message": "Image added successfully", "id": img.id})

# PUT update image
@gallery_bp.route('/gallery/<int:image_id>', methods=['PUT'])
def update_image(image_id):
    img = Gallery.query.get_or_404(image_id)
    data = request.json
    img.image_url = data.get('image_url', img.image_url)
    img.caption = data.get('caption', img.caption)
    db.session.commit()
    return jsonify({"message": "Image updated successfully"})

# DELETE image
@gallery_bp.route('/gallery/<int:image_id>', methods=['DELETE'])
def delete_image(image_id):
    img = Gallery.query.get_or_404(image_id)
    db.session.delete(img)
    db.session.commit()
    return jsonify({"message": "Image deleted successfully"})
