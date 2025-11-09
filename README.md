# 🎓 EduBook - College Booking & Admission Portal

A comprehensive web application for exploring colleges, their facilities, and managing admissions with user authentication and a review system.

---

## 🌐 Live Demo
👉 [Visit EduBook Live](https://college-booking-application-46xf.vercel.app)

---

## 🌟 Features

### 🔐 Authentication System
- Email/Password Registration & Login  
- Google Authentication (Social login)  
- Password Reset Functionality  
- Protected Routes – College details and reviews require login  

---

### 🏫 College Management
- **College Search** – Search colleges by name  
- **College Cards** – Display key information with images  
- **Detailed College Views** – Comprehensive college profiles  
- **College Gallery** – Graduate group photos and campus images  
- **Research Papers** – Links to student research work  

---

### 📝 Admission System
- Online Admission Form with multiple fields  
- **My College Section** – Track your admissions  
- **Review System** – Rate and review colleges  
- **Real-time Updates** – Reviews appear on the home page  

---

## 🛠️ Tech Stack

### Frontend
- React with React Router for navigation  
- Tailwind CSS for styling  
- Firebase Authentication (Email/Password & Google)  
- Context API for state management  
- React Icons for beautiful icons  

### Backend
- Node.js with Express.js  
- MongoDB for database  
- Mongoose ODM  
- JWT for authentication  
- bcrypt for password hashing  

---

## 🚀 Installation & Setup

### 🧩 Prerequisites
- Node.js (v16 or higher)  
- MongoDB (local or Atlas)  
- Firebase Project (for authentication)  

---

### 1️⃣ Clone the Repository
```bash
git clone <repository-url>
cd college-booking-app
```

---

### 2️⃣ Backend Setup
```bash
cd college-booking-server
npm install
```

Create a `.env` file inside the backend directory:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/college-portal
JWT_SECRET=your_jwt_secret_here
FIREBASE_API_KEY=your_firebase_api_key
NODE_ENV=development
```

Run the backend:
```bash
npm run dev
```

---

### 3️⃣ Frontend Setup
```bash
cd college-booking-client
npm install
```

Create a `.env` file inside the frontend directory:
```env
VITE_apiKey=
VITE_authDomain=
VITE_projectId=
VITE_storageBucket=
VITE_messagingSenderId=
VITE_appId=
VITE_measurementId=
```

Run the frontend:
```bash
npm run dev
```

---

## ⚡ Running the Application

### Development Mode
```bash
# Start backend (runs on http://localhost:5000)
cd college-booking-server
npm run dev

# Start frontend (runs on http://localhost:3000)
cd college-booking-client
npm run dev
```

### Production Build
```bash
cd college-booking-client
npm run build
```

---

## 🗺️ Route Structure

### Public Routes (No Login Required)
- ✅ Home (`/`)
- ✅ Colleges (`/colleges`)
- ✅ Login (`/login`)
- ✅ Register (`/register`)
- ✅ 404 Page (`*`)

### Private Routes (Login Required)
- 🔒 College Details (`/colleges/:id`)
- 🔒 Admission (`/admission`)
- 🔒 My College (`/my-college`)
- 🔒 Profile (`/profile`)

---

## 🏗️ Route Structure Details

### Main Layout Wrapper
All routes are wrapped with **MainLayout**, which provides:
- Navigation bar  
- Footer  
- Consistent styling  
- Authentication context  

### Private Route Implementation
The **PrivateRoute** component protects sensitive routes by:
- Checking user authentication status  
- Redirecting to login if not authenticated  
- Preserving intended destination for post-login redirect  

---

## 🤝 Contributing

1. Fork the repository  
2. Create your feature branch  
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. Commit your changes  
   ```bash
   git commit -m 'Add some AmazingFeature'
   ```
4. Push to the branch  
   ```bash
   git push origin feature/AmazingFeature
   ```
5. Open a Pull Request  

---

## 📄 License
This project is licensed under the **MIT License**.

---

## 👨‍💻 Developer
**Joy Halder** – Full Stack Developer  

📧 Email: [joyhalder00113355@gmail.com](mailto:joyhalder00113355@gmail.com)


⭐ **If you like this project, don’t forget to star the repo!**
