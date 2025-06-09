from flask import Blueprint, request, jsonify, current_app, send_from_directory
from werkzeug.security import check_password_hash
from .models import User, UploadResult, ReviewQueue, Criminal
from sqlalchemy.orm import joinedload
from sqlalchemy import or_
from . import db
import jwt
import datetime
import os
from werkzeug.utils import secure_filename
from app.model_loader import model
from app.utils import preprocess_image, get_criminal_embeddings, match_face
from flask_cors import cross_origin
import traceback

main = Blueprint('main', __name__)

UPLOAD_FOLDER = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'uploads'))
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@main.route('/')
def home():
    return jsonify({'message': 'Smart Criminal ID API is running.'})

@main.route('/api/login', methods=['POST', 'OPTIONS'])
def login():
    if request.method == 'OPTIONS':
        return '', 200

    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    if not username or not password:
        return jsonify({'error': 'Username and password required.'}), 400
    user = User.query.filter_by(username=username).first()
    if user and check_password_hash(user.password_hash, password):
        token = jwt.encode({
            'user_id': user.user_id,
            'username': user.username,
            'role': user.role,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=12)
        }, current_app.config.get('SECRET_KEY', 'dev_secret'), algorithm='HS256')
        return jsonify({'token': token, 'user_id': user.user_id, 'username': user.username, 'role': user.role}), 200
    return jsonify({'error': 'Invalid username or password.'}), 401

@main.route("/api/match", methods=["POST", "OPTIONS"])
def match():
    if request.method == "OPTIONS":
        return '', 200

    if "image" not in request.files:
        return jsonify({"error": "No image uploaded"}), 400

    file = request.files["image"]
    filename = secure_filename(file.filename)
    filepath = os.path.join(UPLOAD_FOLDER, filename)
    file.save(filepath)

    try:
        preprocessed = preprocess_image(filepath)
        embedding = model.predict(preprocessed)[0]

        # Extract user_id from JWT
        auth_header = request.headers.get('Authorization', '')
        token = auth_header.replace('Bearer ', '')
        user_id = None
        if token:
            payload = jwt.decode(token, current_app.config.get('SECRET_KEY', 'dev_secret'), algorithms=['HS256'])
            user_id = payload.get('user_id')

        db_embeddings = get_criminal_embeddings()
        result = match_face(embedding, db_embeddings)

        # Save upload result to DB
        # Only save if a file was uploaded and processed
        confidence_val = result.get('confidence')
        if confidence_val is None:
            confidence_val = 0.0
        if filename and os.path.exists(filepath):
            upload_result = UploadResult(
                uploaded_by=user_id,
                image_path=os.path.join('uploads', filename),
                match_confidence=confidence_val,
                matched_criminal_id=result['criminal']['criminal_id'] if result.get('match') and result.get('criminal') else None,
                status='matched' if result.get('match') else 'no_match'
            )
            db.session.add(upload_result)
            db.session.commit()

            # Add upload_id to response
            response = dict(result)
            response['upload_id'] = upload_result.upload_id
            response['image_path'] = upload_result.image_path
            return jsonify(response)
        else:
            return jsonify({'error': 'Image upload failed.'}), 500
    except Exception as e:
        print("[ERROR] /api/match exception:")
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500

@main.route('/admin/reviews', methods=['GET', 'OPTIONS'])
@cross_origin(origins="http://localhost:5173")
def get_admin_reviews():
    if request.method == 'OPTIONS':
        return '', 200
    # Get all pending reviews, join with uploads, users, and criminals
    reviews = (
        ReviewQueue.query
        .filter_by(review_status='pending')
        .options(
            joinedload(ReviewQueue.upload).joinedload(UploadResult.matched_criminal),
            joinedload(ReviewQueue.flagger)
        )
        .all()
    )
    result = []
    for r in reviews:
        upload = r.upload
        criminal = upload.matched_criminal if upload else None
        # Always return a float for match_confidence
        match_conf = 0.0
        if upload and upload.match_confidence is not None:
            try:
                match_conf = float(upload.match_confidence)
            except Exception:
                match_conf = 0.0
        result.append({
            'review_id': r.review_id,
            'upload_id': r.upload_id,
            'flagged_by': r.flagged_by,
            'flagger_username': r.flagger.username if r.flagger else None,
            'reason': r.reason,
            'review_status': r.review_status,
            'image_path': upload.image_path if upload else None,
            'match_confidence': match_conf,
            'matched_criminal': {
                'criminal_id': criminal.criminal_id if criminal else None,
                'full_name': criminal.full_name if criminal else None,
                'crime_type': criminal.crime_type if criminal else None,
                'location': criminal.location if criminal else None,
                'arrest_date': criminal.arrest_date.isoformat() if criminal and criminal.arrest_date else None,
                'photo_path': criminal.photo_path if criminal else None,
            } if criminal else None
        })
    return jsonify(result)

@main.route('/admin/review/<int:id>', methods=['POST'])
def review_action(id):
    data = request.get_json()
    action = data.get('action')  # 'approve' or 'reject'
    reviewer_id = data.get('reviewed_by')
    review = ReviewQueue.query.get(id)
    if not review or review.review_status != 'pending':
        return jsonify({'error': 'Review not found or already processed'}), 404
    if action not in ['approve', 'reject']:
        return jsonify({'error': 'Invalid action'}), 400
    review.review_status = 'approved' if action == 'approve' else 'rejected'
    review.reviewed_by = reviewer_id
    review.review_time = datetime.datetime.utcnow()
    # Optionally update UploadResult status
    if review.upload:
        review.upload.status = 'approved' if action == 'approve' else 'rejected'
    db.session.commit()
    return jsonify({'success': True})

@main.route('/admin/users', methods=['GET'])
def get_admin_users():
    users = User.query.all()
    result = []
    for u in users:
        result.append({
            'user_id': u.user_id,
            'username': u.username,
            'role': u.role,
            'status': u.status,
            'created_at': u.created_at.isoformat() if u.created_at else None
        })
    return jsonify(result)

@main.route('/admin/users/<int:id>/status', methods=['POST'])
def toggle_user_status(id):
    user = User.query.get(id)
    if not user:
        return jsonify({'error': 'User not found'}), 404
    user.status = 'suspended' if user.status == 'active' else 'active'
    db.session.commit()
    return jsonify({'user_id': user.user_id, 'status': user.status})

@main.route('/admin/reviews', methods=['POST', 'OPTIONS'])
@cross_origin(origins="http://localhost:5173")
def admin_review():
    if request.method == 'OPTIONS':
        return '', 200
    data = request.get_json()
    flagged_by = data.get('flagged_by')
    reason = data.get('reason')
    confidence = data.get('confidence')
    status = data.get('status')
    # For now, we do not handle the image upload here, just the review queue
    # Create a new ReviewQueue entry (status: pending)
    review = ReviewQueue(
        flagged_by=flagged_by,
        reason=reason,
        review_status='pending',
        review_time=None,
        # Save upload_id if provided
        upload_id=data.get('upload_id')
    )
    db.session.add(review)
    db.session.commit()
    # Optionally, save confidence and status in UploadResult if upload_id is provided
    upload_id = data.get('upload_id')
    if upload_id:
        upload = UploadResult.query.get(upload_id)
        if upload:
            if confidence is not None:
                upload.match_confidence = confidence
            if status is not None:
                upload.status = status
            db.session.commit()
    return jsonify({'success': True, 'review_id': review.review_id})

@main.route('/uploads/<path:filename>')
def uploaded_file(filename):
    return send_from_directory(UPLOAD_FOLDER, filename)
