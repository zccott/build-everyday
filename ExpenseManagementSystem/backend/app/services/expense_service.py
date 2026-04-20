from sqlalchemy.orm import Session
from app import models as Models, schemas
from app.schemas import ExpenseCreate, Expense


def create_expense(db: Session, expense: ExpenseCreate,
                   user_id: int) -> Expense:
    db_expense = Models.Expense(**expense.dict(), user_id=user_id)
    db.add(db_expense)
    db.commit()
    db.refresh(db_expense)
    return db_expense


def get_expenses(db: Session, user_id: int) -> list[Expense]:
    return db.query(Models.Expense).filter(
        Models.Expense.user_id == user_id).all()
