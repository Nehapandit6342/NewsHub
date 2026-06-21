# 📰 NewsHub - Full Stack News Application

NewsHub is a full-stack news platform built using **React (frontend)** and **Node.js + Express + PostgreSQL (backend)**.  
It allows users to read, manage, and publish news articles with authentication and admin control.

---

## 🚀 Features

### 👨‍💻 Frontend

- Responsive UI built with React
- Article listing and detail pages
- Category-based filtering
- User login and authentication UI
- API integration with backend

### ⚙️ Backend

- RESTful API using Express.js
- JWT Authentication
- CRUD operations for articles
- Category management
- PostgreSQL database integration
- Secure environment configuration

---

## 🛠️ Tech Stack

### Frontend

- React.js
- Axios
- React Router DOM
- CSS / Tailwind (if used)

### Backend

- Node.js
- Express.js
- PostgreSQL
- JWT
- bcrypt
- dotenv
- cors

---

## 📁 Project Structure

newshub-frontend/
│
├── public/
│ ├── favicon.svg
│ ├── icons.svg
│
├── src/
│ │
│ ├── api/
│ │ ├── axios.js
│ │ ├── auth.api.js
│ │ ├── article.api.js
│ │ ├── admin.api.js
│ │ ├── comment.api.js
│ │ └── editor.api.js
│ │
│ ├── assets/
│ │ ├── hero.png
│ │ ├── react.svg
│ │ └── vite.svg
│ │
│ ├── components/
│ │ ├── common/
│ │ │ └── loader.jsx
│ │ │
│ │ ├── layout/
│ │ │ ├── Navbar.jsx
│ │ │ ├── Footer.jsx
│ │ │ └── PublicLayout.jsx
│ │ │
│ │ └── news/
│ │ ├── ArticleCard.jsx
│ │ ├── ArticleMeta.jsx
│ │ ├── FeaturedArticles.jsx
│ │ ├── SecondaryStories.jsx
│ │ └── Sidebar.jsx
│ │
│ ├── features/
│ │ ├── admin/
│ │ │ ├── hooks/
│ │ │ ├── pages/
│ │ │ ├── layout/
│ │ │ └── services/
│ │ │
│ │ ├── articles/
│ │ │ ├── components/
│ │ │ ├── hooks/
│ │ │ ├── services/
│ │ │ └── validations/
│ │ │
│ │ ├── auth/
│ │ │ ├── hooks/
│ │ │ └── pages/
│ │ │
│ │ └── comments/
│ │ └── components/
│ │
│ ├── hooks/
│ │ └── useDebounce.js
│ │
│ ├── pages/
│ │ ├── Home.jsx
│ │ ├── ArticlePage.jsx
│ │ ├── CategoryPage.jsx
│ │ └── Unauthorized.jsx
│ │
│ ├── routes/
│ │ └── ProtectedRoute.jsx
│ │
│ ├── utils/
│ │ ├── formatDate.js
│ │ ├── timeAgo.js
│ │ ├── token.js
│ │ └── quillConfig.js
│ │
│ ├── App.jsx
│ ├── main.jsx
│ ├── App.css
│ └── index.css
│
├── package.json
├── vite.config.js
└── README.md
newshub-backend
├───src
│ │ app.js
│ │ server.js
│ │  
│ ├───config
│ │ db.js
│ │ multer.js
│ │  
│ ├───controllers
│ │ │ articleController.js
│ │ │ auth.controller.js
│ │ │ commentController.js
│ │ │ editor.controller.js
│ │ │  
│ │ └───admin
│ │ adminCommentController.js
│ │  
│ ├───middleware
│ │ admin.middleware.js
│ │ auth.middleware.js
│ │ error.middleware.js
│ │ role.middleware.js
│ │ upload.middleware.js
│ │  
│ ├───models
│ │ article.model.js
│ │ auth.model.js
│ │  
│ ├───routes
│ │ admin.routes.js
│ │ adminComment.routes.js
│ │ article.routes.js
│ │ auth.routes.js
│ │ comment.routes.js
│ │ editor.routes.js
│ │  
│ ├───services
│ │ articleService.js
│ │ auth.service.js
│ │ editor.service.js
│ │  
│ └───utils
│ response.js
│  
└───uploads

---

## ⚙️ Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/your-username/NewsHub.git
cd NewsHub

⚙️ Backend Setup
cd newshub-backend
npm install

//Create .env
PORT=5000

DB_HOST=localhost
DB_USER=your_username
DB_PASSWORD=your_password
DB_NAME=newshub

JWT_SECRET=your_secret

Run backend
npm run dev
🎨 Frontend Setup
cd newshub-frontend
npm install
npm start
🔗 API Connection

Frontend connects to backend via:

http://localhost:5000/api
🗄️ Database Setup
Install PostgreSQL
Create database:
CREATE DATABASE newshub;
🤝 Collaboration Workflow
main → stable production code
dev → development branch
feature branches → for new features
⚠️ Security Notes
.env is NOT pushed to GitHub
API keys and DB credentials are kept private
👨‍💻 Author

Developed by Neha Pandit ✨
Internship Project - NewsHub Full Stack Application
```
