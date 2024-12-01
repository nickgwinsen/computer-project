from sqlmodel import Field, SQLModel


class Player(SQLModel, table=True):
    __tablename__ = "players"
    id: int = Field(default=None, primary_key=True)
    riot_id: str = Field(index=True)
    match_id: str = Field(default=None, foreign_key="matches.match_id")
    riot_and_match_id: str = Field(index=True)
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
    champion_name: str | None
    lane: str
    role: str
    win: bool
