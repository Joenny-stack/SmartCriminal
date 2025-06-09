import os
import cv2
import csv
import numpy as np
import psycopg2
from datetime import datetime
from tensorflow.keras.models import load_model

# Load the trained model
model = load_model('facial_model.h5')

def preprocess_image(img_path):
    img = cv2.imread(img_path)
    img = cv2.resize(img, (160, 160))
    img = img.astype('float32') / 255.0
    return np.expand_dims(img, axis=0)

def get_face_embedding(img_path):
    return model.predict(preprocess_image(img_path))[0]

# Load profile data from CSV into a dictionary
def load_criminal_profiles(csv_path):
    profiles = {}
    with open(csv_path, newline='') as f:
        reader = csv.DictReader(f)
        for row in reader:
            folder_name = row['name'].strip().replace(' ', '_')
            profiles[folder_name.lower()] = row
    return profiles

# Connect to database
conn = psycopg2.connect(
    dbname='smartcrime_db',
    user='postgres',
    password='admin',
    host='localhost',
    port=5432
)
cursor = conn.cursor()

# Mapping for crime_grade to match DB constraint
CRIME_GRADE_MAP = {
    'high': 'A',
    'moderate': 'B',
    'low': 'C'
}

def insert_criminal(profile, img_path, embedding):
    cursor.execute("""
        INSERT INTO tblcriminals (
            full_name, photo_path, crime_type, crime_grade, 
            location, arrest_date, is_repeat_offender, face_embedding
        ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
    """, (
        profile['name'].replace('_', ' '),
        img_path,
        profile['crime_type'],
        CRIME_GRADE_MAP.get(profile['crime_grade'].lower(), profile['crime_grade'].lower()),
        profile['location'],
        profile['arrest_date'],
        profile['is_repeat_offender'].lower() == 'true',
        ",".join(str(float(x)) for x in embedding)  # Store as comma-separated string
    ))
    conn.commit()
    print(f"[✓] Saved: {profile['name']}")

# Main processing function
def process_criminal_images(root_dir, csv_path):
    profiles = load_criminal_profiles(csv_path)

    for folder in os.listdir(root_dir):
        folder_path = os.path.join(root_dir, folder)
        if os.path.isdir(folder_path):
            key = folder.lower()
            if key in profiles:
                images = [f for f in os.listdir(folder_path) if f.lower().endswith(('.jpg', '.jpeg', '.png'))]
                if images:
                    img_path = os.path.join(folder_path, images[0])
                    embedding = get_face_embedding(img_path)
                    insert_criminal(profiles[key], img_path, embedding)
            else:
                print(f"[!] No profile found for folder: {folder}")

# Run it
process_criminal_images("../../images", "../criminal_profiles.csv")
