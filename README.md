# 🧑‍💼 User Management System

## 📖 Overview

This is a full-stack **User Management System** with a React frontend and a Node.js/Express backend (assumed to be running on `http://localhost:5000/api/`).  
It provides essential user CRUD operations and authentication.

---

## ✨ Features

- ✅ Create new users
- 📋 View a list of all users
- ✏️ Update user details
- ❌ Delete users
- 🔐 User authentication (Login with token)

---

## 🛠️ Technologies Used

### 🔗 Frontend

- React
- Tailwind CSS

### ⚙️ Backend _(Assumed API)_

- Node.js
- Express

### 💾 Database _(Assumed)_

- MongoDB (or any other database supported by the API)

---

## 🚀 Installation & Setup

### ✅ Prerequisites

- Node.js & npm installed
- Backend API running at: `http://localhost:5000/api/`

---

### 📥 Clone the Repository

```bash
git clone <your-repo-url>
cd user-management-system
```

---

### 📦 Install Dependencies

```bash
npm install
```

---

## 🐳 Run with Docker Compose

Docker Compose helps us run the **frontend**, **backend**, and **MySQL database** together in isolated containers using one command.

### ▶️ Start the Entire App

```bash
docker-compose up --build
```

### 🛑 Stop All Containers

```bash
docker-compose down
```

> 💡 Add the `-v` flag to also remove volumes (DB data):
>
> ```bash
> docker-compose down -v
> ```

---

## ⚙️ Docker Compose Pipeline Explained

Your `docker-compose.yml` file defines **3 core services**:

### 1. **Backend (Node.js/Express)**

- Built from the `./backend/Dockerfile`
- Connects to the `mysql` container using host `mysql` (thanks to internal Docker DNS)
- Exposes port `5000`

### 2. **Frontend (React + Vite)**

- Built from the `./frontend/Dockerfile`
- Connects to backend via `http://backend:5000/api` (internal Docker network)
- Exposes port `3000`

### 3. **Database (MySQL)**

- Uses the official MySQL Docker image
- Persists data using a volume
- Exposes port `3306` for local tools like MySQL Workbench

---

## 🛠️ Dev Pipeline with Docker

Here’s how the full development pipeline works using Docker Compose:

```
# 1. Build and start services
$ docker-compose up --build

# 2. Backend container runs:
- Installs dependencies
- Connects to MySQL
- Starts the Express server on port 5000

# 3. Frontend container runs:
- Installs dependencies
- Starts React/Vite server on port 3000
- Fetches data from the backend

# 4. MySQL container:
- Starts MySQL server
- Initializes DB if needed using volumes/scripts

# 5. You visit http://localhost:3000 to use the app
```

---

## 🔁 Live Updates (Optional)

If you're actively developing, use **bind mounts** in `docker-compose.yml` so changes in your code reflect immediately without rebuilding.

In your `docker-compose.yml`:

```yaml
volumes:
  - ./frontend:/app
  - ./backend:/app
```

Also make sure `frontend/Dockerfile` and `backend/Dockerfile` are dev-friendly (e.g., using `nodemon` in backend).

---

## 📦 Production Pipeline (Overview)

When you're ready to deploy:

1. **Build static frontend** and serve it with NGINX (optional).
2. **Backend runs as an API service**, production-ready with `.env` configs.
3. Use **Docker Compose or Kubernetes** for orchestration in cloud.
4. Deploy with **Render, Railway, DigitalOcean**, etc., or use **CI/CD** with GitHub Actions.

> Let me know if you want a production-ready Docker setup with NGINX or a CI/CD pipeline template!

---
