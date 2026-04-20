from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.schemas import ExpenseCreate, ExpenseResponse
from app.services import expense_service

router = APIRouter(prefix="/expenses", tags=["Expenses"])


@router.post("/", response_model=ExpenseResponse)
def create_expense(expense: ExpenseCreate, db: Session = Depends(get_db)):
    return expense_service.create_expense(db, expense)


@router.get("/", response_model=list[ExpenseResponse])
def get_expenses(db: Session = Depends(get_db)):
    return expense_service.get_all_expenses(db)