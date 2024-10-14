from typing import Annotated

from sqlmodel import Field, Session, SQLModel


class Users(SQLModel, table=True):
    id: int = Field(default=None, primary_key=True)
    email: str = Field(index=True)
    salt: str
    hashed_password: str
