from flask import Blueprint, request, jsonify
from app.Models.programs import Program
from app.extension import db

programs_bp = Blueprint('programs_bp', __name__)

# GET all programs
@programs_bp.route('/programs', methods=['GET'])
def get_programs():
    programs = Program.query.all()
    result = []
    for p in programs:
        result.append({
            "id": p.id,
            "title": p.title,
            "description": p.description,
            "duration": p.duration,
            "requirements": p.requirements
        })
    return jsonify(result)

# POST create a new program
@programs_bp.route('/programs', methods=['POST'])
def create_program():
    data = request.json
    program = Program(
        title=data.get('title'),
        description=data.get('description'),
        duration=data.get('duration'),
        requirements=data.get('requirements')
    )
    db.session.add(program)
    db.session.commit()
    return jsonify({"message": "Program created successfully", "id": program.id})

# PUT update a program
@programs_bp.route('/programs/<int:program_id>', methods=['PUT'])
def update_program(program_id):
    program = Program.query.get_or_404(program_id)
    data = request.json
    program.title = data.get('title', program.title)
    program.description = data.get('description', program.description)
    program.duration = data.get('duration', program.duration)
    program.requirements = data.get('requirements', program.requirements)
    db.session.commit()
    return jsonify({"message": "Program updated successfully"})

# DELETE a program
@programs_bp.route('/programs/<int:program_id>', methods=['DELETE'])
def delete_program(program_id):
    program = Program.query.get_or_404(program_id)
    db.session.delete(program)
    db.session.commit()
    return jsonify({"message": "Program deleted successfully"})
