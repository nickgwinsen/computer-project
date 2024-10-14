from fastapi import APIRouter, Depends, Response, status
from fastapi.encoders import jsonable_encoder
from sqlalchemy import text, select
from sqlalchemy.orm import Session

from app.db.session import SessionDep, get_session
from app.etc.crypt import hash_password, verify_password
from app.models.user_model import *
from app.schemas.user_schema import UserIn, UserOut

router = APIRouter()


@router.post("/login")
async def auth_login(user: UserIn, db: SessionDep, response: Response):
    user_hash = hash_password(user.password)
    user_to_verify = select(Users).where(Users.email == user.email)
    result = db.exec(user_to_verify).scalars().all()
    result = jsonable_encoder(result)
    if verify_password(user.password, result[0]["hashed_password"]):
        response.status_code = status.HTTP_200_OK
        return result
    else:
        response.status_code = status.HTTP_400_BAD_REQUEST
        return {}


@router.post("/signup")
async def auth_signup(user: UserIn, db: SessionDep):
    user_hash = hash_password(user.password)
    user_to_add = Users(email=user.email, **user_hash)
    db.add(user_to_add)
    db.commit()
    db.refresh(user_to_add)
    return user_to_add.email


# TODO: 2 factor auth, forgot password, logout, jwt functionality
