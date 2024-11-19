from sqlmodel import Field, SQLModel


class Champion(SQLModel, table=True):
    __tablename__ = "champions"
    champion_id: int = Field(primary_key=True)
    champion_name: str
    wins: int
    losses: int
