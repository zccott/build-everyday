from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app import models, schemas
from app.database import get_db
from app.services import auth_service

router = APIRouter(prefix="/categories", tags=["Categories"])

DEFAULT_CATEGORIES = [
    {"name": "Food", "icon": "utensils", "color": "#FF6B6B"},
    {"name": "Travel", "icon": "plane", "color": "#4D96FF"},
    {"name": "Bills", "icon": "receipt", "color": "#FFD93D"},
    {"name": "Shopping", "icon": "shopping-cart", "color": "#6BCB77"},
    {"name": "Health", "icon": "heart", "color": "#FF8AAE"},
    {"name": "Others", "icon": "box", "color": "#9E9E9E"}
]

@router.get("/", response_model=List[schemas.Category])
def get_categories(
    db: Session = Depends(get_db),
    current_user: models.User = Depends(auth_service.get_current_user)
):
    # Return global categories (user_id is null) plus user's custom ones
    return db.query(models.Category).filter(
        (models.Category.user_id == None) | (models.Category.user_id == current_user.id)
    ).all()

@router.post("/", response_model=schemas.Category)
def create_category(
    category: schemas.CategoryCreate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(auth_service.get_current_user)
):
    db_category = models.Category(
        **category.dict(),
        user_id=current_user.id
    )
    db.add(db_category)
    db.commit()
    db.refresh(db_category)
    return db_category

@router.post("/seed", tags=["Internal"])
def seed_categories(db: Session = Depends(get_db)):
    # Check if we already have categories
    existing = db.query(models.Category).filter(models.Category.user_id == None).count()
    if existing > 0:
        return {"message": "Categories already seeded"}
    
    for cat in DEFAULT_CATEGORIES:
        db_cat = models.Category(**cat, user_id=None)
        db.add(db_cat)
    
    db.commit()
    return {"message": "Default categories seeded successfully"}
