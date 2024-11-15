from typing import List

from sqlalchemy import JSON
from sqlmodel import Field, SQLModel, Column
from datetime import datetime


class Match(SQLModel, table=True):
    __tablename__ = "matches"
    match_id: str = Field(default=None, primary_key=True)
    game_create_timestamp: datetime
    game_end_timestamp: datetime
    game_mode: str
    team100_win: bool
    team200_win: bool
    all_players: List[str] = Field(sa_column=Column(JSON))
