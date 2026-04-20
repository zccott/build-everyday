from pydantic import BaseModel, EmailStr
from typing import List, Optional
from datetime import datetime

# Auth Schemas


class UserBase(BaseModel):
    email: EmailStr
    full_name: Optional[str] = None
    salary: Optional[float] = 0.0


class UserCreate(UserBase):
    password: str


class UserUpdate(BaseModel):
    email: Optional[EmailStr] = None
    full_name: Optional[str] = None
    salary: Optional[float] = None
    password: Optional[str] = None


class User(UserBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True


class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    email: Optional[str] = None

# Category Schemas


class CategoryBase(BaseModel):
    name: str
    icon: Optional[str] = None
    color: Optional[str] = None


class CategoryCreate(CategoryBase):
    pass


class Category(CategoryBase):
    id: int
    user_id: Optional[int] = None

    class Config:
        from_attributes = True

# Expense Schemas


class ExpenseBase(BaseModel):
    name: str
    amount: float
    notes: Optional[str] = None
    date: Optional[datetime] = None
    category_id: int


class ExpenseCreate(ExpenseBase):
    pass


class ExpenseUpdate(BaseModel):
    name: Optional[str] = None
    amount: Optional[float] = None
    notes: Optional[str] = None
    date: Optional[datetime] = None
    category_id: Optional[int] = None


class Expense(ExpenseBase):
    id: int
    user_id: int
    date: datetime

    class Config:
        from_attributes = True

# Budget Schemas


class BudgetBase(BaseModel):
    limit: float
    month: int
    year: int
    category_id: int


class BudgetCreate(BudgetBase):
    pass


class Budget(BudgetBase):
    id: int
    user_id: int

    class Config:
        from_attributes = True

# Analytics Schemas


class Summary(BaseModel):
    total_expenses: float
    monthly_expenses: float
    weekly_expenses: float
    remaining_balance: float
    savings_percentage: float
