from fastapi import APIRouter, HTTPException, Query, status, Depends
from sqlalchemy.orm import Session
from typing import List, Optional
from schemas.snippet_schema import SnippetCreate, SnippetRead, SnippetUpdate
from services import snippet_service
from db.database import get_db
from routes.auth import get_current_user
from db.models import User

router = APIRouter(prefix="/snippets", tags=["snippets"])

@router.post("/", response_model=dict, status_code=status.HTTP_201_CREATED)
def add_snippet(snippet: SnippetCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    snippet_id = snippet_service.create_snippet(db, snippet.model_dump(), current_user.id)
    return {"id": snippet_id, "message": "Snippet created successfully"}

@router.get("/", response_model=List[SnippetRead])
def list_snippets(search: Optional[str] = Query(None), db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    snippets = snippet_service.get_snippets(db, current_user.id, search)
    return snippets

@router.get("/{snippet_id}", response_model=SnippetRead)
def get_snippet(snippet_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    snippet = snippet_service.get_snippet_by_id(db, snippet_id)
    if not snippet or snippet.owner_id != current_user.id:
        raise HTTPException(status_code=404, detail="Snippet not found")
    return snippet

@router.put("/{snippet_id}")
def update_snippet(snippet_id: int, snippet_update: SnippetUpdate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    snippet = snippet_service.get_snippet_by_id(db, snippet_id)
    if not snippet or snippet.owner_id != current_user.id:
        raise HTTPException(status_code=404, detail="Snippet not found")
    
    success = snippet_service.update_snippet(db, snippet_id, snippet_update.model_dump(exclude_unset=True))
    if not success:
        raise HTTPException(status_code=404, detail="Snippet not found or no changes made")
    return {"message": "Snippet updated successfully"}

@router.delete("/{snippet_id}")
def remove_snippet(snippet_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    snippet = snippet_service.get_snippet_by_id(db, snippet_id)
    if not snippet or snippet.owner_id != current_user.id:
        raise HTTPException(status_code=404, detail="Snippet not found")
        
    success = snippet_service.delete_snippet(db, snippet_id)
    if not success:
        raise HTTPException(status_code=404, detail="Snippet not found")
    return {"message": "Snippet deleted successfully"}

