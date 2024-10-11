from fastapi import FastAPI, APIRouter
from typing import Annotated, Any
from pydantic import BaseModel, EmailStr
from app.api import auth


app = FastAPI()


class UserIn(BaseModel):
    username: str
    password: str
    email: EmailStr
    full_name: str | None = None


class UserOut(BaseModel):
    username: str
    email: EmailStr
    full_name: str | None = None


# Don't do this in production!
@app.post("/user/", response_model=UserOut)
async def create_user(user: UserIn) -> Any:
    return user


app.include_router(auth.router)
