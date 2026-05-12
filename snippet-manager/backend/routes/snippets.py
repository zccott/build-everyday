from fastapi import APIRouter
from schemas.snippet_schema import SnippetCreate
from services.snippet_service import create_snippet, get_snippets, delete_snippet

router = APIRouter(prefix="/snippets", tags=["snippets"])

@router.post("/snippets")
def add_snippet(snippet: SnippetCreate):
    create_snippet(snippet)
    return {"message": "Snippet created successfully"}

@router.get("/snippets")
def list_snippets(search: str = None):
    snippets = get_snippets(search)
    return {"snippets": snippets}

@router.delete("/snippets/{snippet_id}")
def remove_snippet(snippet_id: int):
    delete_snippet(snippet_id)
    return {"message": "Snippet deleted successfully"}