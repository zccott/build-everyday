from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class SnippetBase(BaseModel):
    title: str
    code: str
    language: str

class SnippetCreate(SnippetBase):
    pass

class SnippetUpdate(BaseModel):
    title: Optional[str] = None
    code: Optional[str] = None
    language: Optional[str] = None

class SnippetRead(SnippetBase):
    id: int
    created_at: str
    owner_id: int

    class Config:
        from_attributes = True
