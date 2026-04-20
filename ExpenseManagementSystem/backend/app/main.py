from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import engine, Base
from app.routes import auth, expense, category, analytics

# Create tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Expense Management API")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # In production, specify the frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(expense.router)
app.include_router(category.router)
app.include_router(analytics.router)

@app.get("/")
def read_root():
    return {"message": "Expense Management System API is running"}