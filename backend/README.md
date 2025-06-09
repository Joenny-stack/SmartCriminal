# Smart Criminal Identification System Backend

Flask-based RESTful API for facial recognition, criminal classification, and secure data management.

## Features
- Upload and match suspect facial images
- Retrieve and search criminal records
- Admin review and feedback
- PostgreSQL database integration
- CORS enabled for frontend communication

## Setup
1. Create a virtual environment (optional but recommended):
   ```powershell
   python -m venv venv
   .\venv\Scripts\Activate.ps1
   ```
2. Install dependencies:
   ```powershell
   pip install flask flask_sqlalchemy flask_cors psycopg2-binary
   ```
3. Set up PostgreSQL and update `DATABASE_URL` in your environment if needed.
4. Run the server:
   ```powershell
   python run.py
   ```

## Folder Structure
```
smart_crime_backend/
├── app/
│   ├── __init__.py
│   ├── routes.py
│   ├── models.py
├── config.py
├── run.py
```
