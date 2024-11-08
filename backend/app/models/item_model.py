from sqlmodel import Field, SQLModel


class Item(SQLModel, table=True):
    __tablename__ = "items"
    id = Field(default=None, primary_key=True)
    player_id: str = Field(foreign_key="players.riot_id")
    match_id: str = Field(default=None, foreign_key="matches.match_id")
    item1: int
    item2: int
    item3: int
    item4: int
    item5: int
    item6: int
    trinket: int
