from sqlalchemy import Column, DateTime, Integer, String, Text, func

from .database import Base


class Snippet(Base):
    __tablename__ = "snippets"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), nullable=False, index=True)
    language = Column(String(100), nullable=False, index=True)
    tags = Column(String(255), nullable=False, default="")
    description = Column(Text, nullable=True)
    code = Column(Text, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
