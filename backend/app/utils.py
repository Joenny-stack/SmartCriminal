import cv2
import numpy as np
from scipy.spatial.distance import cosine
import psycopg2

IMG_SIZE = (160, 160)

def preprocess_image(img_path):
    img = cv2.imread(img_path)
    img = cv2.resize(img, IMG_SIZE)
    img = img / 255.0
    return np.expand_dims(img, axis=0)

def get_criminal_embeddings():
    conn = psycopg2.connect(
        dbname="smartcrime_db",
        user="postgres",
        password="admin",
        host="localhost"
    )
    cursor = conn.cursor()
    cursor.execute("SELECT criminal_id, full_name, crime_type, crime_grade, face_embedding FROM tblcriminals WHERE face_embedding IS NOT NULL")
    results = cursor.fetchall()
    cursor.close()
    conn.close()
    processed = []
    for criminal_id, full_name, crime_type, crime_grade, face_embedding in results:
        # Convert comma-separated string to 1-D numpy array
        emb = np.array([float(x) for x in face_embedding.split(',')], dtype=np.float32)
        processed.append((criminal_id, full_name, crime_type, crime_grade, emb))
    return processed

def match_face(embedding, db_embeddings, threshold=0.5):
    best_score = float("inf")
    best_match = None

    for criminal_id, name, crime_type, grade, db_emb in db_embeddings:
        score = float(cosine(embedding, db_emb))  # Ensure score is a Python float
        if score < best_score:
            best_score = score
            best_match = (criminal_id, name, crime_type, grade)

    if best_score < threshold:
        return {
            "match": True,
            "confidence": round(1 - float(best_score), 3),
            "criminal": {
                "criminal_id": best_match[0],
                "full_name": best_match[1],
                "crime_type": best_match[2],
                "crime_grade": best_match[3]
            }
        }
    return { "match": False, "confidence": round(1 - float(best_score), 3) }
