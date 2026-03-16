from sqlalchemy import or_
from sqlalchemy.orm import Session

from . import models, schemas


def create_snippet(db: Session, snippet: schemas.SnippetCreate) -> models.Snippet:
    db_snippet = models.Snippet(**snippet.model_dump())
    db.add(db_snippet)
    db.commit()
    db.refresh(db_snippet)
    return db_snippet


def get_snippets(db: Session, search: str | None = None) -> list[models.Snippet]:
    query = db.query(models.Snippet)

    if search and search.strip():
        search_term = f"%{search.strip()}%"
        query = query.filter(
            or_(
                models.Snippet.title.ilike(search_term),
                models.Snippet.tags.ilike(search_term),
            )
        )

    return query.order_by(models.Snippet.created_at.desc()).all()


def delete_snippet(db: Session, snippet_id: int) -> bool:
    snippet = db.get(models.Snippet, snippet_id)
    if snippet is None:
        return False

    db.delete(snippet)
    db.commit()
    return True
