from sqlalchemy import column, Integer, String, Float, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime

from app.database import Base

class Expense(Base):
    __tablename__ = "expenses"

    id = column(Integer, primary_key=True, index=True)
    name = column(String, nullable=False)
    amount = column(Float, nullable=False)
    catagory = column(String, nullable=False)
    created_at = column(DateTime, default=datetime.utcnow)