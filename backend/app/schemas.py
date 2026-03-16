from datetime import datetime

from pydantic import BaseModel, ConfigDict, Field


class SnippetCreate(BaseModel):
    title: str = Field(..., min_length=1, max_length=255)
    language: str = Field(..., min_length=1, max_length=100)
    tags: str = Field(default="", max_length=255, description="Comma-separated tags")
    description: str | None = None
    code: str = Field(..., min_length=1)


class SnippetResponse(BaseModel):
    id: int
    title: str
    language: str
    tags: str
    description: str | None = None
    code: str
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)
