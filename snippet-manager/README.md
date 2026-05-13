# ✨ Glassmorphism Snippet Manager

A premium, full-stack code snippet management application built with a modern glassmorphism aesthetic. Organize, store, and access your code snippets with style.

![Preview](https://img.shields.io/badge/UI-Glassmorphism-pink?style=for-the-badge)
![Backend](https://img.shields.io/badge/Backend-FastAPI-009688?style=for-the-badge&logo=fastapi)
![Frontend](https://img.shields.io/badge/Frontend-React-61DAFB?style=for-the-badge&logo=react)
![Auth](https://img.shields.io/badge/Auth-JWT-black?style=for-the-badge&logo=jsonwebtokens)

## 🚀 Overview

This project is a high-performance snippet manager that prioritizes both developer experience and visual excellence. It features a robust FastAPI backend and a dynamic React frontend, all orchestrated with Docker.

### Key Features
*   🔐 **Secure Authentication**: User registration and login powered by JWT and Bcrypt.
*   📝 **Snippet CRUD**: Create, read, update, and delete code snippets with ease.
*   🌈 **Syntax Highlighting**: (Coming Soon) Support for multiple programming languages.
*   🎨 **Glassmorphism UI**: A sleek, translucent interface with vibrant gradients and smooth micro-animations.
*   🐳 **Containerized**: Fully dockerized for seamless deployment and development.

---

## 📂 Project Structure

```text
snippet-manager/
├── backend/            # FastAPI source code & database logic
├── frontend/           # React + Vite + TypeScript frontend
├── docker-compose.yml  # Orchestration for full-stack deployment
└── README.md           # This file
```

---

## 🛠️ Quick Start

The easiest way to run the entire stack is using Docker Compose.

### Prerequisites
*   Docker & Docker Compose
*   (Optional) Python 3.10+ & Node.js 18+ for local development

### Deployment

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/rahul-aot/build-everyday.git
    cd build-everyday/snippet-manager
    ```

2.  **Configure Environment**:
    *   Create `.env` files in both `backend/` and `frontend/` based on their respective `sample.env` files.

3.  **Run with Docker Compose**:
    ```bash
    docker-compose up --build
    ```

4.  **Access the application**:
    *   **Frontend**: [http://localhost:5173](http://localhost:5173)
    *   **Backend API**: [http://localhost:8000](http://localhost:8000)
    *   **Interactive Docs**: [http://localhost:8000/docs](http://localhost:8000/docs)

---

## 🛡️ Backend Details

The backend is built with **FastAPI** and **SQLite**, ensuring speed and simplicity. It uses **SQLAlchemy** for ORM and **Pydantic** for data validation.

*   **Location**: `./backend`
*   **Documentation**: [Backend README](./backend/README.md)

## 🎨 Frontend Details

The frontend is a **React** application built with **Vite** and **TypeScript**. It utilizes **Vanilla CSS** for its custom glassmorphism design system.

*   **Location**: `./frontend`
*   **Documentation**: [Frontend README](./frontend/README.md)

---

## 📜 License

This project is part of the `build-everyday` repository and is open-source.
