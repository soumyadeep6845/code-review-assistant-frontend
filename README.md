# AI Code Review Assistant

## 🚀 Overview
This is the **frontend** of the Code Review Assistant, a web-based AI-powered tool that reviews and suggests improvements for code snippets. The application provides a user-friendly interface for submitting code, viewing AI feedback, and improving coding practices.

## 📸 Application Screenshots

### 🔹 Authentication Page
![Auth](./screenshots/auth.png)

### 🔹 Home Screen
![Home](./screenshots/home.png)

### 🔹 Code Review in Action
![Review](./screenshots/codereview.png)
![Feedback](./screenshots/codefeedback.png)

### 🔹 Containerization (Docker)
![Docker](./screenshots/dockerfrontend.png)


## 🛠 Tech Stack
- **Framework:** React (TypeScript)
- **UI Library:** Tailwind CSS, HTML, CSS
- **State Management:** React (Context API)
- **API Communication:** Axios
- **Deployment:** Docker
> ℹ️ *Kubernetes may be used in the future for scalability.*

---

## 📦 Installation & Setup

### Prerequisites
- Node.js (>= 18.x)
- npm (or yarn)

### 1️⃣ Clone the Repository
```sh
git clone https://github.com/your-username/code-review-assistant-frontend.git
cd code-review-assistant-frontend
```

### 2️⃣ Install Dependencies
```sh
npm install  # or yarn install
```

### 3️⃣ Run the Development Server (Locally)
```sh
npm run dev  # or yarn dev
```
The app should now be running on **http://localhost:5173**.
>💡 Make sure the [backend](https://github.com/soumyadeep6845/code-review-assistant-backend) is up and running on http://localhost:8080.

---

## 🐳 Run with Docker

To build and run the application using **Docker**:

```sh
docker build -t code-review-frontend:dev .
docker run -p 5173:5173 code-review-frontend:dev
```
The app will be accessible at **http://localhost:5173**.

---

## 📌 Features

✅ Submit code snippets for AI-based review  
✅ View AI-generated feedback  
✅ Responsive and modern UI using Tailwind CSS  
✅ Secure API communication with the backend  
✅ Containerised using Docker  

---

## 📜 Folder Structure
```
 code-review-assistant-frontend/
 ┣  src/
 ┣  ┣  api/       # API components and integration
 ┣  ┣  assets/    # Visual assets
 ┣  ┣  pages/     # Application pages
 ┣  ┣  utils/     # Routes
 ┣  ┣  App.tsx    # Main application entry
 ┣  ┣  main.tsx   # React root file
 ┣  Dockerfile  # Docker configuration
 ┣  README.md
```

---

## 🎯 Contribution

If you'd like to contribute, feel free to **fork** the repository, create a **new branch**, and raise a **pull request** with changes you deem necessary!

## 💚 Found this project interesting?

If you found this project useful, then please consider leaving a ⭐ on [GitHub](https://github.com/soumyadeep6845/code-review-assistant-frontend). Thank you! 😄

## 👨 Project Maintained By

[Soumyadeep Das](https://www.linkedin.com/in/soumya0021/)
