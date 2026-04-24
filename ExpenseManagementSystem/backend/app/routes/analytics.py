from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func, extract
from datetime import datetime, timedelta
from typing import List, Dict

from app import models, schemas
from app.database import get_db
from app.services import auth_service

router = APIRouter(prefix="/analytics", tags=["Analytics"])

@router.get("/summary", response_model=schemas.Summary)
def get_financial_summary(
    db: Session = Depends(get_db),
    current_user: models.User = Depends(auth_service.get_current_user)
):
    now = datetime.utcnow()
    
    # Total expenses (all time)
    total_expenses = db.query(func.sum(models.Expense.amount)).filter(
        models.Expense.user_id == current_user.id
    ).scalar() or 0.0
    
    # Monthly expenses
    monthly_expenses = db.query(func.sum(models.Expense.amount)).filter(
        models.Expense.user_id == current_user.id,
        extract('month', models.Expense.date) == now.month,
        extract('year', models.Expense.date) == now.year
    ).scalar() or 0.0
    
    # Weekly expenses
    week_ago = now - timedelta(days=7)
    weekly_expenses = db.query(func.sum(models.Expense.amount)).filter(
        models.Expense.user_id == current_user.id,
        models.Expense.date >= week_ago
    ).scalar() or 0.0
    
    remaining_balance = current_user.salary - monthly_expenses
    savings_percentage = ((current_user.salary - monthly_expenses) / current_user.salary * 100) if current_user.salary > 0 else 0
    
    return {
        "total_expenses": total_expenses,
        "monthly_expenses": monthly_expenses,
        "weekly_expenses": weekly_expenses,
        "remaining_balance": max(0, remaining_balance),
        "savings_percentage": max(0, savings_percentage)
    }

@router.get("/trends")
def get_spending_trends(
    db: Session = Depends(get_db),
    current_user: models.User = Depends(auth_service.get_current_user)
):
    # Get last 6 months trend
    results = []
    for i in range(5, -1, -1):
        month_date = datetime.utcnow() - timedelta(days=i*30)
        month = month_date.month
        year = month_date.year
        
        amount = db.query(func.sum(models.Expense.amount)).filter(
            models.Expense.user_id == current_user.id,
            extract('month', models.Expense.date) == month,
            extract('year', models.Expense.date) == year
        ).scalar() or 0.0
        
        results.append({
            "month": month_date.strftime("%b"),
            "amount": amount
        })
    return results

@router.get("/category-distribution")
def get_category_distribution(
    db: Session = Depends(get_db),
    current_user: models.User = Depends(auth_service.get_current_user)
):
    # Get spending by category for current month
    now = datetime.utcnow()
    results = db.query(
        models.Category.name,
        models.Category.color,
        func.sum(models.Expense.amount).label("total")
    ).join(models.Expense).filter(
        models.Expense.user_id == current_user.id,
        extract('month', models.Expense.date) == now.month,
        extract('year', models.Expense.date) == now.year
    ).group_by(models.Category.name, models.Category.color).all()
    
    return [{"name": name, "color": color, "amount": amount} for name, color, amount in results]
