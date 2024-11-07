from sqlmodel import Field, SQLModel


class Team(SQLModel, table=True):
    __tablename__ = "teams"
    id: int = Field(default=None, primary_key=True)
    match_id: str = Field(default=None, foreign_key="matches.match_id")
    team_number: int
    win: bool
    baron_kills: int
    herald_kills: int
    dragon_kills: int
    tower_kills: int
    inhib_kills: int
    first_blood: bool
    first_tower: bool
    first_inhib: bool
    first_baron: bool
    first_dragon: bool
    first_herald: bool
