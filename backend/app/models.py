from . import db

class User(db.Model):
    __tablename__ = 'tblusers'
    user_id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True, nullable=False)
    password_hash = db.Column(db.Text, nullable=False)
    role = db.Column(db.String(20), nullable=False)
    created_at = db.Column(db.DateTime, server_default=db.func.current_timestamp())
    status = db.Column(db.String(20), default='active')
    uploads = db.relationship('UploadResult', backref='uploader', lazy=True)
    flagged_reviews = db.relationship('ReviewQueue', foreign_keys='ReviewQueue.flagged_by', backref='flagger', lazy=True)
    reviewed_reviews = db.relationship('ReviewQueue', foreign_keys='ReviewQueue.reviewed_by', backref='reviewer', lazy=True)

class Criminal(db.Model):
    __tablename__ = 'tblcriminals'
    criminal_id = db.Column(db.Integer, primary_key=True)
    full_name = db.Column(db.String(100), nullable=False)
    photo_path = db.Column(db.Text, nullable=False)
    crime_type = db.Column(db.String(100))
    crime_grade = db.Column(db.String(10))
    location = db.Column(db.String(100))
    arrest_date = db.Column(db.Date)
    is_repeat_offender = db.Column(db.Boolean, default=False)
    face_embedding = db.Column(db.Text)  # Add this line to store the embedding as text
    matches = db.relationship('UploadResult', backref='matched_criminal', lazy=True)

class UploadResult(db.Model):
    __tablename__ = 'tblupload_results'
    upload_id = db.Column(db.Integer, primary_key=True)
    uploaded_by = db.Column(db.Integer, db.ForeignKey('tblusers.user_id'))
    image_path = db.Column(db.Text, nullable=False)
    match_confidence = db.Column(db.Float)
    matched_criminal_id = db.Column(db.Integer, db.ForeignKey('tblcriminals.criminal_id'))
    status = db.Column(db.String(30), default='pending')
    upload_time = db.Column(db.DateTime, server_default=db.func.current_timestamp())
    review_queues = db.relationship('ReviewQueue', backref='upload', lazy=True)

class ReviewQueue(db.Model):
    __tablename__ = 'tblreview_queue'
    review_id = db.Column(db.Integer, primary_key=True)
    upload_id = db.Column(db.Integer, db.ForeignKey('tblupload_results.upload_id'))
    flagged_by = db.Column(db.Integer, db.ForeignKey('tblusers.user_id'))
    reason = db.Column(db.Text)
    review_status = db.Column(db.String(20), default='pending')
    reviewed_by = db.Column(db.Integer, db.ForeignKey('tblusers.user_id'))
    review_time = db.Column(db.DateTime)
