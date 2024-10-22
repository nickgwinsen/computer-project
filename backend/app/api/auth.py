from fastapi import APIRouter, Response, status, HTTPException
from fastapi.encoders import jsonable_encoder
from sqlalchemy import select

from app.db.session import SessionDep
from app import models, schemas, etc

router = APIRouter()


@router.post("/login")
async def auth_login(user: schemas.UserIn, db: SessionDep, response: Response):
    user_to_verify = select(models.Users).where(models.Users.email == user.email)
    result = db.exec(user_to_verify).scalars().all()
    result = jsonable_encoder(result)
    try:
        result = result[0]
    except IndexError:
        raise HTTPException(status_code=400, detail="User does not exist")
    verified = etc.verify_password(user.password, result["hashed_password"])
    if not verified:
        raise HTTPException(status_code=400, detail="Incorrect password")
    return etc.create_access_token(user.email)


@router.post("/signup")
async def auth_signup(user: schemas.UserIn, db: SessionDep):
    if (
        db.exec(select(models.Users).where(models.Users.email == user.email))
        .scalars()
        .all()
    ):
        raise HTTPException(status_code=400, detail="Email already exists.")
    user_hash = etc.hash_password(user.password)
    user_to_add = models.Users(email=user.email, hashed_password=user_hash)
    db.add(user_to_add)
    db.commit()
    db.refresh(user_to_add)
    return etc.crypt.create_access_token(user.email)


# TODO: 2 factor auth, forgot password, logout, jwt functionality
