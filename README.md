# Code Review Assistant

## 🚀 Overview
This is the **frontend** of the Code Review Assistant, a web-based AI-powered tool that reviews and suggests improvements for code snippets. The application provides a user-friendly interface for submitting code, viewing AI feedback, and improving coding practices.

## 🛠 Tech Stack
- **Framework:** React (TypeScript)
- **UI Library:** Tailwind CSS
- **State Management:** React (Context API)
- **API Communication:** Axios
- **Deployment:** Docker, Kubernetes

## 📦 Installation & Setup
### Prerequisites
- Node.js (>= 18.x)
- npm or yarn

### 1️⃣ Clone the Repository
```sh
git clone https://github.com/your-username/code-review-assistant-frontend.git
cd code-review-assistant-frontend
```

### 2️⃣ Install Dependencies
```sh
npm install  # or yarn install
```

### 3️⃣ Set Up Environment Variables
Create a `.env` file in the root directory and configure the following:
```env
VITE_API_BASE_URL=http://localhost:8080/api  # Change this to your backend URL
```

### 4️⃣ Run the Development Server
```sh
npm run dev  # or yarn dev
```
The app should now be running on `http://localhost:5173`.

## 📌 Features
✅ Submit code snippets for AI-based review\
✅ View AI-generated feedback\
✅ Responsive and modern UI using Tailwind CSS\
✅ Secure API communication with the backend

## 📜 Folder Structure
```
📂 src
 ┣ 📂 components   # Reusable UI components
 ┣ 📂 pages        # Application pages
 ┣ 📂 services     # API calls and integrations
 ┣ 📜 App.tsx      # Main application entry
 ┣ 📜 main.tsx     # React root file
```

## 📌 Build & Deployment
### Build the Application
```sh
npm run build  # or yarn build
```

### Deploy with Docker
```sh
docker build -t code-review-frontend .
docker run -p 3000:3000 code-review-frontend
```

### Kubernetes Deployment
Update your `deployment.yaml` and apply:
```sh
kubectl apply -f deployment.yaml
```

## 🎯 Contribution
If you'd like to contribute, feel free to **fork** the repository and raise a PR with necessary changes.

## 💚 Found this project interesting?
If you found this project useful, then please consider leaving a :star: on Github. Thank you! 😄

## 👨 Project Maintained By
[Soumyadeep Das](https://www.linkedin.com/in/soumya0021/)

---
🚀 Happy Coding! 🎉

