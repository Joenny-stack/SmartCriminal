
# Smart Criminal Identification System – Frontend Requirements

**Project Name:** Smart Criminal Identification System  
**Frontend Framework:** React.js  
**Backend API Base URL:** `http://localhost:5000/api`  
**Purpose:** Provide an intuitive web interface for police officers and administrators to upload facial images, view recognition results, manage user access, and review flagged results.

---

## 👥 User Roles

### Officer
- Secure login
- Upload facial images of suspects
- View match results
- Access upload history

### Administrator
- All officer capabilities
- View and resolve flagged recognition results
- Manage users (view, activate, deactivate)

---

## 📄 Core Features & Pages

### 1. Login Page (`/login`)
- Username and password fields
- Secure authentication (JWT-based)
- Redirects to user dashboard

### 2. Officer Dashboard (`/dashboard`)
- Welcome message with username
- Quick links to:
  - Upload new image
  - View upload history

### 3. Upload Page (`/upload`)
- Image upload form with preview
- Call to `/api/match` endpoint
- Displays:
  - Match result (matched / not matched)
  - Confidence score
  - Matched criminal record (if found)

### 4. Upload History Page (`/history`)
- Table of previous uploads:
  - Thumbnail
  - Date/time
  - Match status
  - Confidence
  - Link to full result

### 5. Admin Panel (`/admin`)
- **Review Queue Tab**
  - Flagged low-confidence matches
  - Approve/reject buttons
- **User Management Tab**
  - View users
  - Activate/deactivate buttons
  - Optional: Add user functionality

---

## 🔌 API Endpoints

| Action               | Method | Endpoint                     | Description                             |
|----------------------|--------|------------------------------|-----------------------------------------|
| Login                | POST   | `/login`                     | Authenticate and return JWT             |
| Upload Image         | POST   | `/match`                     | Submit image and receive match results  |
| Get Upload History   | GET    | `/uploads`                   | List user's uploads                     |
| Get Review Queue     | GET    | `/admin/reviews`             | Admin fetches pending reviews           |
| Approve/Reject Match | POST   | `/admin/review/<id>`         | Resolve a review                        |
| Get Users            | GET    | `/admin/users`               | List all users                          |
| Toggle User Status   | POST   | `/admin/users/<id>/status`   | Enable/disable a user account           |

---

## ⚙️ Tech Stack & Tools

- **Frontend:** React.js (18+)
- **State Management:** React Context API or Redux (optional)
- **Styling:** Tailwind CSS preferred
- **Networking:** Axios or Fetch API
- **Routing:** React Router
- **Auth:** JWT stored in localStorage

---

## 📁 Suggested Project Structure

```
src/
├── components/
│   ├── Navbar.js
│   ├── UploadForm.js
│   ├── ResultCard.js
│   └── HistoryTable.js
├── pages/
│   ├── Login.js
│   ├── Dashboard.js
│   ├── Upload.js
│   ├── History.js
│   └── Admin.js
├── context/
│   └── AuthContext.js
├── api/
│   └── index.js
├── App.js
└── index.js
```

---

## 🔐 Security & Validation

- JWT authentication required for all routes
- Role-based access control for admin functionality
- File upload validation: format, size
- Error handling and session expiration management

---

## ✅ Completion Criteria

- Officer can log in, upload image, and receive match results
- Admin can manage users and review flagged matches
- System is responsive and secure
- All API calls are correctly integrated
