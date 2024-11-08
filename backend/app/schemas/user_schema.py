# defining what a request body looks like
from typing import Optional, List

from pydantic import BaseModel, EmailStr, Field
from datetime import datetime


class UserBase(BaseModel):
    email: EmailStr = Field(...)


class UserIn(UserBase):
    password: str = Field(
        ...,
        min_length=8,
        examples=["SecurePassword"],
    )


class UserOut(UserBase):
    pass


class UserUpdate(BaseModel):
    email: Optional[str]


class UserUpdatePassword(BaseModel):
    password: str
