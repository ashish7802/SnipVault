from contextlib import asynccontextmanager

from fastapi import APIRouter, Depends, FastAPI, HTTPException, Query, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from . import crud, schemas
from .database import Base, engine, get_db


@asynccontextmanager
async def lifespan(_: FastAPI):
    Base.metadata.create_all(bind=engine)
    yield


app = FastAPI(title="SnipVault API", version="1.0.0", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

router = APIRouter()


@router.get("/health")
def health_check() -> dict[str, str]:
    return {"status": "ok"}


@router.post("/snippets", response_model=schemas.SnippetResponse, status_code=status.HTTP_201_CREATED)
def create_snippet(snippet: schemas.SnippetCreate, db: Session = Depends(get_db)):
    return crud.create_snippet(db, snippet)


@router.get("/snippets", response_model=list[schemas.SnippetResponse])
def list_snippets(
    search: str | None = Query(default=None, description="Search snippets by title or tag"),
    db: Session = Depends(get_db),
):
    return crud.get_snippets(db, search=search)


@router.delete("/snippets/{snippet_id}", status_code=status.HTTP_204_NO_CONTENT)
def remove_snippet(snippet_id: int, db: Session = Depends(get_db)):
    deleted = crud.delete_snippet(db, snippet_id)
    if not deleted:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Snippet not found")
    return None


app.include_router(router)
