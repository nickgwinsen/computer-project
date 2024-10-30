from fastapi import APIRouter, Response, status, HTTPException
from fastapi.responses import RedirectResponse
from fastapi.encoders import jsonable_encoder
from sqlalchemy import select

from app.db.session import SessionDep
from app import models, schemas, etc, config

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
    jwt = etc.create_access_token(user.email)
    response.set_cookie(
        key="authtoken",
        value=jwt.access_token,
        httponly=True,
        secure=False,
        samesite="lax",
        max_age=config.variables.TOKEN_EXPIRY,
        domain="localhost",
        path="/",
    )
    return {"message": config.variables.TOKEN_EXPIRY}


@router.post("/signup")
async def auth_signup(user: schemas.UserIn, db: SessionDep, response: Response):
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
    jwt = etc.crypt.create_access_token(user.email)
    response.set_cookie(
        key="authtoken",
        value=jwt.access_token,
        httponly=True,
        secure=False,
        samesite="None",
        max_age=config.variables.TOKEN_EXPIRY,
        path="/",
    )
    return {"message": "Signup Success"}


@router.post("/logout")
async def auth_logout(response: Response):
    response.delete_cookie(key="auth_token", path="/")
    # return RedirectResponse("/login")


# TODO: 2 factor auth, forgot password, logout, jwt functionality
