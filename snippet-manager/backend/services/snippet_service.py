from sqlalchemy.orm import Session
from db.models import Snippet
from typing import Optional

def create_snippet(db: Session, snippet_data: dict, owner_id: int):
    db_snippet = Snippet(**snippet_data, owner_id=owner_id)
    db.add(db_snippet)
    db.commit()
    db.refresh(db_snippet)
    return db_snippet.id

def get_snippets(db: Session, owner_id: int, search: Optional[str] = None):
    query = db.query(Snippet).filter(Snippet.owner_id == owner_id)
    if search:
        query = query.filter(Snippet.title.contains(search))
    return query.all()


def get_snippet_by_id(db: Session, snippet_id: int):
    return db.query(Snippet).filter(Snippet.id == snippet_id).first()

def update_snippet(db: Session, snippet_id: int, data: dict):
    db_snippet = db.query(Snippet).filter(Snippet.id == snippet_id).first()
    if not db_snippet:
        return False
    
    for key, value in data.items():
        setattr(db_snippet, key, value)
    
    db.commit()
    return True

def delete_snippet(db: Session, snippet_id: int):
    db_snippet = db.query(Snippet).filter(Snippet.id == snippet_id).first()
    if not db_snippet:
        return False
    
    db.delete(db_snippet)
    db.commit()
    return True
