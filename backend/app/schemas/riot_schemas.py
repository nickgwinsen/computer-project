from pydantic import BaseModel, EmailStr, Field
from datetime import datetime
from typing import List


class RiotAccount(BaseModel):
    profile_icon_id: int
    riot_id: str
    summoner_level: int
    tier: str
    rank: str
    league_points: int
    wins: int
    losses: int
    last_updated: datetime

    # this subclass is here so that we can build an instance of this Model from a dictionary
    class Config:
        from_attributes = True


class LeagueMatchForUser(BaseModel):
    lp_change: int
    gamemode: str
    game_begin_timestamp: datetime
    game_end_timestamp: datetime
    participants: List[str]
    kills: int
    deaths: int
    assist: int
    kda: float
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
