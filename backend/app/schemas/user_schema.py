# defining what a request body looks like
from typing import Optional
from pydantic import BaseModel, EmailStr, Field


class RiotAccount(BaseModel):
    riot_user: str = Field(min_length=5, max_length=16, default=None)
    riot_tag: str = Field(min_length=3, max_length=5, default=None)
    model_config = {
        "json_schema_extra": {
            "examples": [{"riot_user": "Shinnoti", "riot_tag": "NA1"}]
        }
    }


class UserBase(BaseModel):
    email: EmailStr = Field(...)


class UserIn(UserBase):
    password: str = Field(
        ...,
        min_length=8,
        examples=["SecurePassword"],
    )


class UserOut(BaseModel):
    pass


class UserUpdate(BaseModel):
    email: Optional[str]
    riot_account: Optional[str]


class UserUpdatePassword(BaseModel):
    password: str


class UserInDB(UserBase):
    salt: str
    hashed_password: str
    riot_account: Optional[RiotAccount]
