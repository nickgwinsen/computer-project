# defining what a request body looks like
from pydantic import BaseModel, EmailStr, Field


class UserBase(BaseModel):
    email: EmailStr


class UserIn(UserBase):
    password: str


class UserOut(BaseModel):
    pass


class UserInDB(UserBase):
    salt: str
    hashed_password: str
