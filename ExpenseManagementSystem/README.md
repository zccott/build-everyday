# 🧾 Expense Management System (ExpenseAI)

A production-ready full-stack application built during Week 1 of the #build-everyday challenge. This system helps users track expenses, analyze spending behavior, and manage budgets through a premium, glassmorphic interface.

## 🚀 Key Features

*   **Premium UX/UI**: Glassmorphism design system built with Vanilla CSS.
*   **Intelligent Dashboard**: Real-time analytics, spending trends, and category distribution charts.
*   **Robust Auth**: JWT-based authentication with secure password hashing.
*   **Expense Tracking**: Complete CRUD with advanced filtering and search.
*   **Financial Summary**: Automated calculation of savings rate and remaining balance.
*   **Profile Management**: Manage your income and personal details.

## 🛠️ Tech Stack

*   **Backend**: FastAPI, SQLAlchemy, SQLite (Development) / PostgreSQL (Production).
*   **Frontend**: React (Vite), TypeScript, Recharts, Lucide React, Framer Motion.
*   **DevOps**: Docker, Docker Compose, GitHub Actions.

---

## 🛠️ Installation & Setup

### Using Docker (Recommended)

1.  Clone the repository and navigate to the project:
    ```bash
    cd ExpenseManagementSystem
    ```
2.  Run with Docker Compose:
    ```bash
    docker-compose up --build
    ```
3.  Access the app at `http://localhost:5173`.

### Manual Setup

#### Backend
```bash
cd backend
python -m venv venv
source venv/Scripts/activate  # Windows: .\venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

#### Frontend
```bash
cd frontend
npm install
npm run dev
```

---

## 🔐 Environment Variables

Create a `.env` file in the `backend` directory:
```env
DATABASE_URL=sqlite:///./expenses.db
SECRET_KEY=your_super_secret_key
ALGORITHM=HS256
```

---

## 📸 Screenshots

*(Add screenshots here showing the Glassmorphism UI and Dashboard charts)*

---

## 🚧 Upcoming Improvements

*   [ ] PDF/CSV Data Export
*   [ ] Category-wise budget alerts
*   [ ] Recurring expense automation
*   [ ] PWA Support for offline usage
