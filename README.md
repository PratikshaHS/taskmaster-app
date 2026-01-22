# 🎯 TaskMaster - Full Stack Task Management Application

A modern, full-stack task management application built with React and Django, featuring user authentication, CRUD operations, and a clean, responsive UI.

---

## 🚀 Live Demo

- **Frontend (React):** [https://taskmaster-app-orcin.vercel.app/](https://taskmaster-app-orcin.vercel.app/)
- **Backend (Django API):** [https://taskmaster-backend-x592.onrender.com](https://taskmaster-backend-x592.onrender.com)
- **Admin Panel:** [https://taskmaster-backend-x592.onrender.com/admin/](https://taskmaster-backend-x592.onrender.com/admin/)

---

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Installation & Setup](#-installation--setup)
- [API Endpoints](#-api-endpoints)
- [Deployment](#-deployment)
- [Screenshots](#-screenshots)
- [Author](#-author)
- [License](#-license)

---

## ✨ Features

### User Management
- ✅ User Registration
- ✅ User Login/Logout
- ✅ JWT Token Authentication
- ✅ Protected Routes

### Task Management
- ✅ Create Tasks
- ✅ View All Tasks
- ✅ Edit Tasks
- ✅ Delete Tasks
- ✅ Mark Tasks as Complete/Incomplete
- ✅ User-specific Tasks (users can only see their own tasks)

### UI/UX
- ✅ Responsive Design
- ✅ Modern, Clean Interface
- ✅ Real-time Updates
- ✅ Loading States
- ✅ Error Handling

---

## 🛠 Tech Stack

### Frontend
- **Framework:** React 18.3
- **Build Tool:** Vite
- **Styling:** CSS3
- **HTTP Client:** Axios
- **Routing:** React Router DOM
- **Deployment:** Vercel

### Backend
- **Framework:** Django 5.1.4
- **API:** Django REST Framework
- **Authentication:** JWT (Simple JWT)
- **Database:** PostgreSQL
- **Deployment:** Render

### Development Tools
- **IDE:** Windsurf
- **Version Control:** Git & GitHub
- **API Testing:** Postman / Thunder Client

---

## 📁 Project Structure

```
TaskMaster/
├── frontend/                 # React Frontend
│   ├── public/
│   ├── src/
│   │   ├── components/      # React Components
│   │   │   ├── Register.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── TaskList.jsx
│   │   │   └── TaskForm.jsx
│   │   ├── api.js          # API Configuration
│   │   ├── App.jsx         # Main App Component
│   │   ├── App.css         # Styles
│   │   └── main.jsx        # Entry Point
│   ├── package.json
│   └── vite.config.js
│
├── backend/                 # Django Backend
│   ├── taskmaster_backend/ # Project Settings
│   │   ├── settings.py
│   │   ├── urls.py
│   │   └── wsgi.py
│   ├── tasks/              # Tasks App
│   │   ├── models.py       # Task Model
│   │   ├── serializers.py  # DRF Serializers
│   │   ├── views.py        # API Views
│   │   ├── urls.py         # URL Routes
│   │   └── admin.py        # Admin Configuration
│   ├── manage.py
│   └── requirements.txt
│
└── README.md               # This file
```

---

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- Python (v3.10 or higher)
- PostgreSQL (for production)
- Git

### Local Development Setup

#### 1. Clone the Repository
```bash
git clone https://github.com/YOUR_USERNAME/taskmaster-app.git
cd taskmaster-app
```

#### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On Mac/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run migrations
python manage.py migrate

# Create superuser (for admin access)
python manage.py createsuperuser

# Run development server
python manage.py runserver
```

Backend will run on: `http://127.0.0.1:8000`

#### 3. Frontend Setup

```bash
# Open new terminal
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Run development server
npm run dev
```

Frontend will run on: `http://localhost:5173`

---

## 🔌 API Endpoints

### Authentication Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/register/` | Register new user |
| POST | `/api/login/` | Login user |
| POST | `/api/logout/` | Logout user |

### Task Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/tasks/` | Get all user tasks | ✅ Yes |
| POST | `/api/tasks/` | Create new task | ✅ Yes |
| GET | `/api/tasks/{id}/` | Get specific task | ✅ Yes |
| PUT | `/api/tasks/{id}/` | Update task | ✅ Yes |
| DELETE | `/api/tasks/{id}/` | Delete task | ✅ Yes |

### Example API Request

**Register User:**
```bash
POST /api/register/
Content-Type: application/json

{
  "username": "pratiksha",
  "password": "SecurePass123"
}
```

**Create Task:**
```bash
POST /api/tasks/
Authorization: Bearer {token}
Content-Type: application/json

{
  "title": "Complete project documentation",
  "completed": false
}
```

---

## 🌐 Deployment

### Frontend (Vercel)

1. **Push code to GitHub**
2. **Connect Vercel to GitHub**
3. **Configure build settings:**
   - Framework: `Vite`
   - Root Directory: `frontend`
   - Build Command: `npm run build`
   - Output Directory: `dist`
4. **Deploy**

**Environment Variables:**
- No environment variables needed (API URL is hardcoded)

### Backend (Render)

1. **Create Web Service on Render**
2. **Connect to GitHub repository**
3. **Configure settings:**
   - Build Command: `pip install -r requirements.txt`
   - Start Command: `gunicorn taskmaster_backend.wsgi:application`
   - Root Directory: `backend`

**Environment Variables:**
```
DATABASE_URL=<your-postgresql-url>
SECRET_KEY=<your-django-secret-key>
DEBUG=False
ALLOWED_HOSTS=taskmaster-backend-x592.onrender.com
```

### Database (PostgreSQL on Render)

1. **Create PostgreSQL database on Render**
2. **Copy DATABASE_URL**
3. **Add to backend environment variables**

---

## 📸 Screenshots

### Login Page
![Login Page](https://via.placeholder.com/800x400?text=Login+Page)

### Task Dashboard
![Task Dashboard](https://via.placeholder.com/800x400?text=Task+Dashboard)

### Add Task
![Add Task](https://via.placeholder.com/800x400?text=Add+Task+Form)

---

## 🔐 Security Features

- ✅ JWT Token Authentication
- ✅ Password Hashing
- ✅ CORS Protection
- ✅ CSRF Protection
- ✅ SQL Injection Prevention (Django ORM)
- ✅ XSS Protection

---

## 🎯 Future Enhancements

- [ ] Task Categories/Tags
- [ ] Task Priority Levels
- [ ] Due Dates & Reminders
- [ ] Task Search & Filter
- [ ] Dark Mode
- [ ] Task Sharing/Collaboration
- [ ] Email Notifications
- [ ] Export Tasks (CSV/PDF)
- [ ] Mobile App (React Native)

---

## 🐛 Known Issues

- Backend may sleep after 15 minutes of inactivity (Render free tier)
- First request after sleep takes 30-60 seconds

---

## 📝 Development Notes

### Running Tests

**Backend:**
```bash
python manage.py test
```

**Frontend:**
```bash
npm run test
```

### Code Formatting

**Backend:**
```bash
black .
flake8
```

**Frontend:**
```bash
npm run lint
```

---

## 👨‍💻 Author

**Pratiksha**

- 📍 Location: Belgaum, Karnataka, India
- 💼 Project: Full Stack Task Management Application
- 🎓 Skills: React, Django, PostgreSQL, REST API
- 📅 Date: January 2026

### Connect with Me
- GitHub: https://github.com/PratikshaHS
- Email: pratikshahsamant@gmail.com

---

## 🙏 Acknowledgments

- Django Documentation
- React Documentation
- Vercel Platform
- Render Platform
- Windsurf IDE

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## ⭐ Show Your Support

Give a ⭐️ if this project helped you learn full-stack development!

---

## 📞 Support

If you have any questions or need help, feel free to open an issue or contact me directly.

---

**Made with ❤️ by Pratiksha**

**Last Updated:** January 22, 2026

---

## 🎉 Project Stats

- **Lines of Code:** ~2000+
- **Components:** 5+
- **API Endpoints:** 8
- **Development Time:** [Your time]
- **Status:** ✅ Live & Deployed
