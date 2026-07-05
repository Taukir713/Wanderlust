# 🏡 Wanderlust

**A full-stack Airbnb-inspired accommodation listing platform built using Node.js, Express.js, MongoDB, EJS, and Passport.js.**

Wanderlust allows users to discover vacation rentals, create property listings, upload images, leave reviews, and securely manage listings through an intuitive and responsive interface.

[![Node.js](https://img.shields.io/badge/Node.js-v22-339933?style=flat&logo=node.js)](https://nodejs.org/) 
[![Express](https://img.shields.io/badge/Express-v5-000000?style=flat&logo=express)](https://expressjs.com/) 
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248?style=flat&logo=mongodb)](https://www.mongodb.com/) 
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=flat&logo=javascript)](https://developer.mozilla.org/en-US/docs/Web/JavaScript) 
[![EJS](https://img.shields.io/badge/EJS-Template-B4CA65?style=flat)](https://ejs.co/) 
[![Passport.js](https://img.shields.io/badge/Passport.js-Authentication-34E27A?style=flat)](https://www.passportjs.org/)
[![License](https://img.shields.io/badge/License-MIT-green)](https://opensource.org/licenses/MIT)

---

## 🌐 Live Demo

**Application:**

> https://wanderlust-xnwr.onrender.com/listings

---

# 📖 About the Project

Wanderlust is an Airbnb-inspired web application developed to practice full-stack web development concepts and understand how modern accommodation platforms manage listings, user authentication, image uploads, reviews, and location-based information.

The project focuses on building a complete CRUD application while following clean backend architecture and real-world development practices.

---

# ✨ Features

## 🔐 Authentication

- User Registration
- User Login & Logout
- Session-based Authentication
- Protected Routes

## 🏠 Listings

- Create Property Listings
- Edit Listings
- Delete Listings
- View Listing Details

## 🖼️ Image Uploads

- Cloudinary Image Storage
- Multer Integration

## ⭐ Reviews

- Add Reviews
- Delete Reviews
- Rating System

## 📍 Location

- Interactive Maps
- Location-based Listings

## 🎨 User Interface

- Responsive Design
- Bootstrap UI
- Server-side Rendering using EJS

---

# 🏗️ Architecture

```text
Browser
      │
      ▼
Express Server
 ├── EJS Templates
 ├── REST Routes
 ├── Passport Authentication
 └── Business Logic
          │
          ▼
MongoDB Atlas
```

---

# 🛠️ Tech Stack

| Layer          | Technology                   |
| -------------- | ---------------------------- |
| Frontend       | HTML, CSS, Bootstrap, EJS    |
| Backend        | Node.js, Express.js          |
| Database       | MongoDB, Mongoose            |
| Authentication | Passport.js, Express Session |
| Image Storage  | Cloudinary, Multer           |
| Maps           | Leaflet                      |
| Deployment     | Render                       |

---

# 📂 Core Features

- Authentication & Authorization
- CRUD Operations
- Image Uploads
- Property Listings
- Reviews & Ratings
- Interactive Maps
- Flash Messages
- Server-side Validation
- Session Management

---

# 🚀 Installation

```bash
git clone https://github.com/Taukir713/Wanderlust.git

cd Wanderlust

npm install
```

Create a `.env` file

```env
ATLASDB_URL=YOUR_MONGODB_URI

SECRET=YOUR_SECRET

CLOUD_NAME=YOUR_CLOUDINARY_NAME

CLOUD_API_KEY=YOUR_API_KEY

CLOUD_API_SECRET=YOUR_API_SECRET
```

Run the project

```bash
npm start
```

---

# 🔒 Security

- Passport Local Authentication
- Express Session
- Server-side Validation
- Protected Routes

---

# 📚 What I Learned

Through this project I gained practical experience with:

- Express.js Routing
- MVC Architecture
- MongoDB & Mongoose
- Authentication using Passport.js
- Cloudinary Image Uploads
- CRUD Operations
- Session Management
- Error Handling
- Deployment using Render

---

# 👨‍💻 Author

**Taukir Rafique Shaikh**

- GitHub: https://github.com/Taukir713
- Email: shaikhtaukir713@gmail.com

---

# 📄 License

Licensed under the **MIT License**.

---

## ⭐ Support

If you found this project useful, consider giving it a **Star** on GitHub.
