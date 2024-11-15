from pydantic import BaseModel, EmailStr, Field
from datetime import datetime
from typing import List


class RiotAccount(BaseModel):
    puuid: str
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


class Match(BaseModel):
    match_id: str
    game_create_timestamp: datetime
    game_end_timestamp: datetime
    game_mode: str
    team100_win: bool
    team200_win: bool
    all_players: List[str]

    # this subclass is here so that we can build an instance of this Model from a dictionary
    class Config:
        from_attributes = True


class Player(BaseModel):
    id: int
    riot_id: str
    match_id: str
    riot_and_match_id: str
    team_id: int
    keystone: int
    secondary_rune: int
    summoner_1: int
    summoner_2: int
    item0: int
    item1: int
    item2: int
    item3: int
    item4: int
    item5: int
    ward: int
    puuid: str
    champion_id: int
    lane: str
    win: bool

    # this subclass is here so that we can build an instance of this Model from a dictionary
    class Config:
        from_attributes = True


class Stat(BaseModel):
    id: int
    player_id: int
    match_id: str
    kills: int
    assists: int
    deaths: int
    minion_kills: int
    champion_level: int
    total_damage_dealt: int
    total_damage_taken: int
    vision_score: int
    turret_kills: int
    inhibitor_kills: int
    vision_score: int

    # this subclass is here so that we can build an instance of this Model from a dictionary
    class Config:
        from_attributes = True
