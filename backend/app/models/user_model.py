from typing import Annotated

from sqlalchemy import UniqueConstraint
from sqlmodel import Field, Session, SQLModel


class Users(SQLModel, table=True):
    __table_args__ = (UniqueConstraint("email"),)
    id: int = Field(default=None, primary_key=True)
    email: str = Field(index=True)
    hashed_password: str


class RiotUsers(SQLModel, table=True):
    userID: int = Field(default=None, primary_key=True)
    riot_user: str = Field(...)
    riot_tag: str = Field(...)
    puuid: str
