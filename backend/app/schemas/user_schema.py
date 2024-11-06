# defining what a request body looks like
from typing import Optional, List

from pydantic import BaseModel, EmailStr, Field
from datetime import datetime


class RiotAccount(BaseModel):
    profile_icon_id: int
    riot_id: str
    summoner_level: int
    tier: str
    rank: str
    league_points: int
    wins: int
    losses: int

    # this subclass is here so that we can build an instance of this Model from a dictionary
    class Config:
        from_attributes = True


class LeagueMatch(BaseModel):
    # lp gained and lost
    # gamemode
    # x ago
    # participants and the champ they chose, organized by role and team
    # kills, deaths, assists, kda
    # cs
    # vision score
    # items
    # result and duration

    # expandable to show these stats for each player
    participants: List[str]
    duration: int
    game_end_timestamp: datetime


class UserBase(BaseModel):
    email: EmailStr = Field(...)


class UserIn(UserBase):
    password: str = Field(
        ...,
        min_length=8,
        examples=["SecurePassword"],
    )


class UserOut(BaseModel):
    pass


class UserUpdate(BaseModel):
    email: Optional[str]
    riot_account: Optional[str]


class UserUpdatePassword(BaseModel):
    password: str


class UserInDB(UserBase):
    salt: str
    hashed_password: str
    riot_account: Optional[RiotAccount]
