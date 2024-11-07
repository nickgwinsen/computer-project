from typing import Annotated, List

from sqlalchemy import JSON
from sqlmodel import Field, SQLModel
from datetime import datetime


class Match(SQLModel, table=True):
    __tablename__ = "matches"
    match_id: str = Field(default=None, primary_key=True)
    game_create_timestamp: datetime
    game_end_timestamp: datetime
    game_mode: str
    team1_win: bool
    team2_win: bool
