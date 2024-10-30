from sqlmodel import Field, SQLModel


class GameUserRelation(SQLModel, table=True):
    __tablename__ = "gameuserrelations"
    puuid: str = Field(default=None, foreign_key="riotusers.puuid", primary_key=True)
    match_id: str = Field(default=None, foreign_key="games.match_id", primary_key=True)
