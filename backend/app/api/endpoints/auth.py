from fastapi import APIRouter, Response, HTTPException
from fastapi.encoders import jsonable_encoder
from sqlalchemy import select

from app.db.session import SessionDep
from app import models, schemas, config, utils

router = APIRouter()


@router.get("/verify-token/{token}")
async def verify_token(token: str):
    utils.crypt.decode_access_token(token)
    return {"message": "Token is valid"}


@router.post("/login")
async def auth_login(user: schemas.UserIn, db: SessionDep, response: Response):
    stmt = select(models.User).where(models.User.email == user.email)
    result = db.exec(stmt).scalar_one_or_none()
    result = jsonable_encoder(result)
    if not result:
        raise HTTPException(status_code=400, detail="Email not found")
    verified = utils.verify_password(user.password, result["hashed_password"])
    if not verified:
        raise HTTPException(status_code=400, detail="Incorrect password")
    jwt = utils.create_access_token(user.email)
    return jwt


@router.post("/signup")
async def auth_signup(user: schemas.UserIn, db: SessionDep, response: Response):
    if (
        db.exec(select(models.User).where(models.User.email == user.email))
        .scalars()
        .all()
    ):
        raise HTTPException(status_code=400, detail="Email already exists.")
    user_hash = utils.hash_password(user.password)
    user_to_add = models.User(email=user.email, hashed_password=user_hash)
    db.add(user_to_add)
    db.commit()
    db.refresh(user_to_add)
    jwt = utils.crypt.create_access_token(user.email)
    return jwt


@router.get("/logout")
async def auth_logout(response: Response):
    response.delete_cookie(key="authtoken", path="/")
    # return RedirectResponse("/login")


# TODO: 2 factor auth, forgot password, logout, jwt functionality
