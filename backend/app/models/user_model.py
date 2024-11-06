from datetime import datetime
from typing import Annotated, List

# from app.models import Games
from sqlalchemy import UniqueConstraint
from sqlmodel import Field, Relationship, SQLModel


class User(SQLModel, table=True):
    __tablename__ = "users"
    __table_args__ = (UniqueConstraint("email"),)
    id: int = Field(default=None, primary_key=True)
    email: str = Field(index=True)
    hashed_password: str


class RiotUser(SQLModel, table=True):
    __tablename__ = "riotusers"
    __table_args__ = (UniqueConstraint("puuid"),)
    puuid: str = Field(primary_key=True)
    summoner_id: str | None
    riot_id_lower: str = Field(index=True)
    riot_id: str = Field(...)
    profile_icon_id: int
    summoner_level: int
    last_updated: datetime = Field(default=None)
    tier: str | None
    rank: str | None
    league_points: int | None
    wins: int | None
    losses: int | None
