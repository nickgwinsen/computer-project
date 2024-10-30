from typing import Annotated, List

from sqlalchemy import JSON
from sqlmodel import Field, SQLModel


class Game(SQLModel, table=True):
    __tablename__ = "games"
    match_id: str = Field(default=None, primary_key=True)
    # TODO: figure out json data of a match
    match_data: str
