from sqlmodel import Field, SQLModel


class Stat(SQLModel, table=True):
    __tablename__ = "stats"
    player_id: str = Field(foreign_key="players.riot_id")
    match_id: str = Field(default=None, foreign_key="matches.match_id")
    kills: int
