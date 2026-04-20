from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from sqlalchemy import and_, extract
from typing import List, Optional
from datetime import datetime

from app import models, schemas
from app.database import get_db
from app.services import auth_service

router = APIRouter(prefix="/expenses", tags=["Expenses"])

@router.post("/", response_model=schemas.Expense)
def create_expense(
    expense: schemas.ExpenseCreate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(auth_service.get_current_user)
):
    # Verify category exists
    category = db.query(models.Category).filter(
        (models.Category.id == expense.category_id) &
        ((models.Category.user_id == None) | (models.Category.user_id == current_user.id))
    ).first()
    
    if not category:
        raise HTTPException(status_code=404, detail="Category not found")

    db_expense = models.Expense(
        **expense.dict(),
        user_id=current_user.id
    )
    if not db_expense.date:
        db_expense.date = datetime.utcnow()
        
    db.add(db_expense)
    db.commit()
    db.refresh(db_expense)
    return db_expense

@router.get("/", response_model=List[schemas.Expense])
def get_expenses(
    skip: int = 0,
    limit: int = 100,
    category_id: Optional[int] = None,
    month: Optional[int] = None,
    year: Optional[int] = None,
    search: Optional[str] = None,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(auth_service.get_current_user)
):
    query = db.query(models.Expense).filter(models.Expense.user_id == current_user.id)
    
    if category_id:
        query = query.filter(models.Expense.category_id == category_id)
    if month:
        query = query.filter(extract('month', models.Expense.date) == month)
    if year:
        query = query.filter(extract('year', models.Expense.date) == year)
    if search:
        query = query.filter(
            (models.Expense.name.ilike(f"%{search}%")) |
            (models.Expense.notes.ilike(f"%{search}%"))
        )
        
    return query.order_by(models.Expense.date.desc()).offset(skip).limit(limit).all()

@router.put("/{expense_id}", response_model=schemas.Expense)
def update_expense(
    expense_id: int,
    expense_update: schemas.ExpenseUpdate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(auth_service.get_current_user)
):
    db_expense = db.query(models.Expense).filter(
        models.Expense.id == expense_id,
        models.Expense.user_id == current_user.id
    ).first()
    
    if not db_expense:
        raise HTTPException(status_code=404, detail="Expense not found")
    
    update_data = expense_update.dict(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_expense, key, value)
        
    db.commit()
    db.refresh(db_expense)
    return db_expense

@router.delete("/{expense_id}")
def delete_expense(
    expense_id: int,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(auth_service.get_current_user)
):
    db_expense = db.query(models.Expense).filter(
        models.Expense.id == expense_id,
        models.Expense.user_id == current_user.id
    ).first()
    
    if not db_expense:
        raise HTTPException(status_code=404, detail="Expense not found")
        
    db.delete(db_expense)
    db.commit()
    return {"message": "Expense deleted successfully"}