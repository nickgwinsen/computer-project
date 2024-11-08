from sqlmodel import Field, SQLModel


class Stat(SQLModel, table=True):
    __tablename__ = "stats"
    id: int = Field(default=None, primary_key=True)
    player_id: str = Field(foreign_key="players.riot_id")
    match_id: str = Field(default=None, foreign_key="matches.match_id")
    kills: int
    assists: int
    deaths: int
    minion_kills: int
    champion_level: int
    total_damage_dealt: int
    total_damage_taken: int
    vision_score: int
    gold_earned: int
    turret_kills: int
    inhibitor_kills: int
