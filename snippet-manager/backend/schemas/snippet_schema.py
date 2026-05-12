from pydantic import BaseModel


class SnippetCreate(BaseModel):
    title: str
    code: str
    language: str