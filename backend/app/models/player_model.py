from sqlmodel import Field, SQLModel


class Player(SQLModel, table=True):
    __tablename__ = "players"
    riot_id: str = Field(primary_key=True, index=True)
    match_id: str = Field(default=None, foreign_key="matches.match_id")
    team_number: int = Field(default=None, foreign_key="teams.id")
    puuid: str
    champion_id: int
    lane: str
    win: bool
