# ⚙️ Snippet Manager Backend

The power behind the Snippet Manager. A high-performance, asynchronous API built with FastAPI.

## 🛠️ Tech Stack

*   **Framework**: [FastAPI](https://fastapi.tiangolo.com/)
*   **Database**: SQLite (Development) / PostgreSQL (Ready)
*   **ORM**: [SQLAlchemy](https://www.sqlalchemy.org/)
*   **Authentication**: JWT (JSON Web Tokens) with `passlib` (Bcrypt)
*   **Validation**: [Pydantic v2](https://docs.pydantic.dev/)

## 🚀 Getting Started

### Local Development (without Docker)

1.  **Create a Virtual Environment**:
    ```bash
    python -m venv venv
    source venv/bin/activate  # On Windows: venv\Scripts\activate
    ```

2.  **Install Dependencies**:
    ```bash
    pip install -r requirements.txt
    ```

3.  **Environment Variables**:
    Copy `sample.env` to `.env` and configure your `SECRET_KEY`.

4.  **Run the Server**:
    ```bash
    uvicorn main:app --reload
    ```

### API Documentation

Once the server is running, explore the interactive documentation:
*   **Swagger UI**: [http://localhost:8000/docs](http://localhost:8000/docs)
*   **ReDoc**: [http://localhost:8000/redoc](http://localhost:8000/redoc)

## 📁 Architecture

*   `main.py`: Entry point and middleware configuration.
*   `routes/`: API endpoint definitions (Auth, Snippets).
*   `schemas/`: Pydantic models for request/response validation.
*   `services/`: Business logic and database interactions.
*   `db/`: Database configuration and session management.
*   `utils/`: Helper functions (Auth, Security).

## 🔒 Security

*   Passwords are never stored in plain text (Bcrypt hashing).
*   API endpoints are protected via JWT Bearer tokens.
*   CORS is configured to allow requests from the specific frontend origin.
