from sqlalchemy.orm import Session
from db.models import User
from utils.auth import get_password_hash

def get_user_by_username(db: Session, username: str):
    return db.query(User).filter(User.username == username).first()

def create_user(db: Session, user_data: dict):
    hashed_password = get_password_hash(user_data['password'])
    db_user = User(username=user_data['username'], hashed_password=hashed_password)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user
