
from flask import Blueprint, request, jsonify
from app.Models.admissions import AdmissionsContent
from app.extension import db
import json

admissions_bp = Blueprint('admissions_bp', __name__)

def serialize_content(content):
    return {
        "intro_text": content.intro_text,
        "requirements": json.loads(content.requirements) if content.requirements else {},
        "procedure": json.loads(content.procedure) if content.procedure else [],
        "fees_info": content.fees_info,
        "form_url": content.form_url,
        "fee_structure": json.loads(content.fee_structure) if content.fee_structure else [],
        "fee_notes": json.loads(content.fee_notes) if content.fee_notes else [],
        "important_dates": json.loads(content.important_dates) if content.important_dates else []
    }

# GET admissions page content
@admissions_bp.route('/admissions', methods=['GET'])
def get_admissions_content():
    content = AdmissionsContent.query.first()
    if not content:
        return jsonify({"message": "No content found"}), 404
    return jsonify(serialize_content(content))

# POST create admissions page content
@admissions_bp.route('/admissions', methods=['POST'])
def create_admissions_content():
    if AdmissionsContent.query.first():
        return jsonify({"message": "Content already exists. Use PUT to update."}), 400

    data = request.json
    content = AdmissionsContent(
        intro_text=data.get('intro_text'),
        requirements=json.dumps(data.get('requirements', {})),
        procedure=json.dumps(data.get('procedure', [])),
        fees_info=data.get('fees_info'),
        form_url=data.get('form_url'),
        fee_structure=json.dumps(data.get('fee_structure', [])),
        fee_notes=json.dumps(data.get('fee_notes', [])),
        important_dates=json.dumps(data.get('important_dates', []))
    )
    db.session.add(content)
    db.session.commit()
    return jsonify({"message": "Admissions content created successfully"})

# PUT update admissions page content
@admissions_bp.route('/admissions', methods=['PUT'])
def update_admissions_content():
    content = AdmissionsContent.query.first()
    if not content:
        return jsonify({"message": "No content found"}), 404

    data = request.json
    content.intro_text = data.get('intro_text', content.intro_text)
    content.requirements = json.dumps(data.get('requirements', json.loads(content.requirements) if content.requirements else {}))
    content.procedure = json.dumps(data.get('procedure', json.loads(content.procedure) if content.procedure else []))
    content.fees_info = data.get('fees_info', content.fees_info)
    content.form_url = data.get('form_url', content.form_url)
    content.fee_structure = json.dumps(data.get('fee_structure', json.loads(content.fee_structure) if content.fee_structure else []))
    content.fee_notes = json.dumps(data.get('fee_notes', json.loads(content.fee_notes) if content.fee_notes else []))
    content.important_dates = json.dumps(data.get('important_dates', json.loads(content.important_dates) if content.important_dates else []))
    db.session.commit()
    return jsonify({"message": "Admissions content updated successfully"})
