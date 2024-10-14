from typing import Annotated

from sqlalchemy import UniqueConstraint
from sqlmodel import Field, Session, SQLModel


class Users(SQLModel, table=True):
    __table_args__ = (UniqueConstraint("email"),)
    id: int = Field(default=None, primary_key=True)
    email: str = Field(index=True)
    hashed_password: str
