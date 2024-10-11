# defining what a request body looks like
from pydantic import BaseModel, EmailStr, Field


class RiotAccount(BaseModel):
    username: str = Field(title="Riot Username", max_length=16)
    tag: str = Field(title="Riot ID tag", max_length=5)


class UserBase(BaseModel):
    email: EmailStr
    riot: RiotAccount


class UserIn(UserBase):
    password: str


class UserOut(BaseModel):
    pass


class UserInDB(UserBase):
    hashed_password: str
    salt: str
