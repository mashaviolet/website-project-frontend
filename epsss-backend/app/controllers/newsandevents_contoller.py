from flask import Blueprint, request, jsonify
from app.status_code import HTTP_400_BAD_REQUEST, HTTP_201_CREATED, HTTP_500_INTERNAL_SERVER_ERROR, HTTP_200_OK
from app.Models.newsandevents import News
from app.extension import db

news_bp = Blueprint('news', __name__, url_prefix='/api/v1/news')

@news_bp.route('/', methods=['POST'])
def create_news():
    data = request.json or {}
    title = data.get('title')
    content = data.get('content')

    if not title or not content:
        return jsonify({'error': 'Title and content are required'}), HTTP_400_BAD_REQUEST

    try:
        news_item = News(title=title, content=content)
        db.session.add(news_item)
        db.session.commit()

        return jsonify({
            'message': 'News created successfully',
            'news': {'id': news_item.id, 'title': news_item.title}
        }), HTTP_201_CREATED

    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), HTTP_500_INTERNAL_SERVER_ERROR

@news_bp.route('/', methods=['GET'])
def get_news():
    try:
        news_list = News.query.all()
        return jsonify([
            {'id': n.id, 'title': n.title, 'content': n.content}
            for n in news_list
        ]), HTTP_200_OK
    except Exception as e:
        return jsonify({'error': str(e)}), HTTP_500_INTERNAL_SERVER_ERROR

@news_bp.route('/update/<int:news_id>', methods=['PUT'])
def update_news(news_id):
    news = News.query.get_or_404(news_id)
    data = request.json or {}

    news.title = data.get('title', news.title)
    news.content = data.get('content', news.content)

    try:
        db.session.commit()
        return jsonify({'message': 'News updated successfully'}), HTTP_200_OK
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), HTTP_500_INTERNAL_SERVER_ERROR

@news_bp.route('/delete/<int:news_id>', methods=['DELETE'])
def delete_news(news_id):
    news = News.query.get_or_404(news_id)
    try:
        db.session.delete(news)
        db.session.commit()
        return jsonify({'message': 'News deleted successfully'}), HTTP_200_OK
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), HTTP_500_INTERNAL_SERVER_ERROR
