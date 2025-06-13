# Food Donation System

A full-stack MERN-based web application built to minimize food waste and ensure food reaches those in need. The system connects **donors** with **recipients**, facilitating smooth campaign creation, meal applications, real-time communication, and tracking — all within a secure and intuitive environment.

---

## Features

### Authentication & Session Management
- JWT-based login system with access and refresh tokens
- Secure token refresh flow via HTTP-only cookies
- Automatic session handling with toast notifications
- Public and protected route distinction

### Donor Panel
- Create and manage food donation campaigns
- Accept or reject recipient requests
- Real-time chat with recipients for **associated campaigns only**
- View donation history
- Edit personal donor profile

### Recipient Panel
- Browse all available food donation campaigns
- Apply for meals easily
- Real-time chat with associated donors **after applying**
- Track application status (active, granted, etc.)
- View and update recipient profile

### Real-Time Chat (Socket.IO)
- One-to-one messaging between donor and recipient
- Chat enabled only for:
  - Donor’s **own campaigns**
  - Recipients who applied/granted
- Auto-deletion of chats after **7 days** via cron job

### Smart Access Logic
- Donors can't chat or accept requests for others' campaigns
- Chat and actions only available for relevant users
- Unmatched routes handled by a `NotFound` page without unnecessary errors


##  Tech Stack

### Frontend
- **React.js** (Hooks + Router v6)
- **React Toastify** for notifications
- **Custom CSS**
- **Socket.IO client**

### Backend
- **Node.js + Express.js**
- **MongoDB + Mongoose**
- **Socket.IO** for real-time messaging
- **JWT** for authentication
- **Cron jobs** for chat cleanup

---

## Installation

### 1. Clone the repository

  - git clone https://github.com/salwaaliakbar/FoodDonation.git
  - cd food-donation-system

### 2. Backend setup
  - cd backend
  - npm install
  - add .env file
    - MONGO_URI=ADD_YOUR_MONGOURL
    - JWT_SECRET=ADD_YOUR_JWT_SECRET
    - REFRESH_SECRET=ADD_YOUR_REFRESH_TOKEN_SECRET
    - EMAIL_USER=ADD_YOUR_EMAIL
    - EMAIL_PASS=ADD_YOUR_EMAIL_PASSKEY
  - npm run dev

### 3. Frontnd setup
  - cd frontend
  - npm install
  - npm run dev
