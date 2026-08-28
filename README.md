# Full-Stack Authentication System 

A complete, secure, and highly interactive authentication system. This project explores
the integration of a React frontend with a Node.js backend, demonstrating seamless c
communication, state management and robust security practices (such as protected routes, and
Firebase re-authentication).

The goal of this project is to showcase a production-ready application with a polished user
experience.

### Key Features:

* **Secure Authentication:** User registration, login, and secure session management using Firebase
Authentication.
* **Advanced Profile Management:** Users can update their name, email, password, and upload or remove profile pictures (stored and managed via Cloudinary).
* **Account Deletion:** Secure account deletion flow requiring recent re-authentication directly within a modal.
* **Modern UI & Animations:** Fully responsive layout with smooth transitions, staggered form cascades, 
and interactive flow cards using Framer Motion and Tailwind CSS v4.
* **Theme Switching:** Persistent Dark/Light mode toggle saving user preferences.
* **Route Protection:** Implementation of Public and Protected routes to control access based on authentication state, avoiding layout shifts.

## How to Run 

The following instructions will help you set up a copy of the project on your local machine for development and testing purposes.

Before starting, make sure you have Node.js installed on your machine. Use the IDE of your preference to open the project.

When you are ready, open your terminal and clone the repository:

```
git clone https://github.com/aliek57/authSystem.git
```

## Initial Configuration

### Backend Setup (Node.js) 

* Navigate to the *backend* folder.
* Copy the *.env.example* file to *.env* (or create a new .env file).
* Create a cluster on *MongoDB Atlas* (or use an existing one) and get your connection string.
* Create a *Cloudinary* account to get your image upload credentials.
* Replace the variable values in your *.env* with your actual keys.

### Frontend Setup (React)

* Navigate to the *frontend* folder.
* Copy the *.env.example* file to *.env* (or create a new .env file).
* Create your Firebase Client configuration from your *Firebase Console*.
* Add the variables to your *.env* file.

### Installation

Follow these steps to set up your development environment

#### Frontend:

1. Navigate to the frontend folder:

```
cd frontend
```

2. Install all necessary dependencies:

```
npm install
```

3. After installation, start the development server:

```
npm run dev
```

#### Backend:

1. Open a new terminal tab and navigate to the backend folder:

```
cd backend
```

2. Install all necessary dependencies:

```
npm install
```

3. After installation, start the development server:

```
npm run dev
```

You are all set! The Authentication System is now running on your local machine

---

**Live Demo:** You can also view and interact with the live application here [Auth System Live Demo](https://auth-system-dun-one.vercel.app/)
