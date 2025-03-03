# Edukita Grading System - Frontend

## Overview
Edukita Grading System Frontend is a web interface that allows teachers to grade and provide feedback on student assignments. It is built using **React** with **TypeScript** and **Ant Design** for UI components.

## Features
- **Teacher Dashboard**
  - View a list of student assignments.
  - Open an assignment and provide feedback.
- **Student Dashboard**
  - Submit assignments for grading.
  - View grades and teacher feedback.
- **State Management**
  - Uses **Redux Toolkit** for managing application state.
- **Routing**
  - Implements **React Router** for navigation.

## Project Structure
```
/src
  ├── components/       # Reusable UI components
  ├── pages/            # Page-level components
  ├── store/            # Redux store configuration
  ├── routes/           # Application routing
  ├── utils/            # Utility functions
  ├── hooks/            # Custom React hooks
  ├── App.tsx           # Main application entry point
  ├── index.tsx         # Root rendering file
```

## Setup Instructions

### 1. Clone Repository
```sh
git clone https://github.com/user/edukita-frontend.git
cd edukita-frontend
```

### 2. Install Dependencies
```sh
npm install
```

### 3. Run the Application
```sh
npm start
```

## Running with Docker
```sh
docker-compose up --build
```

## Deployment with Kubernetes
### 1. Build & Push Images
```sh
docker build -t edukita-frontend .
docker tag edukita-frontend:latest your-docker-repo/edukita-frontend:latest
docker push your-docker-repo/edukita-frontend:latest
```

### 2. Apply Kubernetes Configurations
```sh
kubectl apply -f k8s/frontend-deployment.yaml
kubectl apply -f k8s/frontend-service.yaml
```

## Environment Variables
Create a `.env` file and configure the following:
```
REACT_APP_BACKEND_URL=http://localhost:3000
```

## Architecture Diagram
The frontend interacts with the backend API to fetch assignments and submit grades:
```
+----------------------+        +----------------------+
|      Browser       | -----> |      Frontend       |
+----------------------+        +----------------------+
                                      |
                                      V
                           +----------------------+
                           |      Backend API     |
                           +----------------------+
```
- The **browser** loads the React frontend.
- The **frontend** makes API calls to the **backend**.
- The **backend** processes requests and interacts with the database.

---

**Author:** Your Name | **Version:** 1.0.0

