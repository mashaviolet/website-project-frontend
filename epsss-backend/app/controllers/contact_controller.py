from flask import Blueprint, request, jsonify
from app.status_code import HTTP_400_BAD_REQUEST, HTTP_201_CREATED, HTTP_500_INTERNAL_SERVER_ERROR, HTTP_200_OK
from app.Models.contact import Contact
from app.extension import db

contact_bp = Blueprint('contact', __name__, url_prefix='/api/v1/contact')

@contact_bp.route('/', methods=['POST'])
def create_message():
    data = request.json or {}
    full_name = data.get('full_name')
    email = data.get('email')
    subject = data.get('subject')
    message = data.get('message')
    phone_number = data.get('phone_number')

    if not full_name or not email or not subject or not message or not phone_number:
        return jsonify({'error': 'Full_name, email, subject, phone_number and message are required'}), HTTP_400_BAD_REQUEST

    try:
        new_message = Contact(full_name=full_name, email=email, subject=subject, message=message, phone_number=phone_number)
        db.session.add(new_message)
        db.session.commit()

        return jsonify({
            'message': 'Message sent successfully',
            'contact': {'id': new_message.id, 'full_name': new_message.full_name}
        }), HTTP_201_CREATED

    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), HTTP_500_INTERNAL_SERVER_ERROR

@contact_bp.route('/', methods=['GET'])
def get_messages():
    try:
        messages = Contact.query.all()
        return jsonify([
            {'id': m.id, 'full_name': m.full_name, 'email': m.email, 'subject': m.subject, 'message': m.message ,'phone_number': m.phone_number}
            for m in messages
        ]), HTTP_200_OK
    except Exception as e:
        return jsonify({'error': str(e)}), HTTP_500_INTERNAL_SERVER_ERROR

@contact_bp.route('/update/<int:contact_id>', methods=['PUT'])
def update_contact(contact_id):
    contact = Contact.query.get_or_404(contact_id)
    data = request.get_json or {}

    print("DEBUG: Received data =>", data)  

    if not data:
        return jsonify({'error': 'No JSON received or bad Content-Type'}), 400


    contact.full_name = data.get('full_name', contact.full_name)
    contact.email = data.get('email', contact.email)
    contact.subject = data.get('subject', contact.subject)
    contact.message = data.get('message', contact.message)
    contact.phone_number = data.get('phone_number',contact.phone_number)


    try:
        db.session.commit()
        return jsonify({'message': 'Contact message updated successfully'}), HTTP_200_OK
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), HTTP_500_INTERNAL_SERVER_ERROR

@contact_bp.route('/delete/<int:contact_id>', methods=['DELETE'])
def delete_contact(contact_id):
    contact = Contact.query.get_or_404(contact_id)
    try:
        db.session.delete(contact)
        db.session.commit()
        return jsonify({'message': 'Contact message deleted successfully'}), HTTP_200_OK
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), HTTP_500_INTERNAL_SERVER_ERROR
