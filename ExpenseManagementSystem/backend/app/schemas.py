from pydantic import BaseModel, field
from datetime import datetime

class ExpenseCreate(BaseModel):
    name: str = field(..., description="The name of the expense", min_length=1)
    amount: float = field(..., description="The amount of the expense", gt=0)
    catagory: str = field(..., description="The category of the expense", min_length=1)

class ExpenseResponse(BaseModel):
    id: int
    name: str
    amount: float
    catagory: str
    created_at: datetime

    class Config:
        from_attributes = True