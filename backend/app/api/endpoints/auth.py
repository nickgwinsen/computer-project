from fastapi import APIRouter, Response, HTTPException, Request
from fastapi.encoders import jsonable_encoder
from sqlalchemy import select

from app.db.session import SessionDep
from app import models, schemas, utils, crud, config

router = APIRouter()


@router.get("/verify-token")
async def verify_token(request: Request):
    print(request.headers)
    auth_header = request.headers.get("Authorization")
    if auth_header is None:
        raise HTTPException(status_code=400, detail="Authorization header is required")
    token = request.headers.get("Authorization").split("Bearer ")[1]
    utils.crypt.decode_refresh_token(token)
    return {"message": "Token is valid"}


@router.post("/user/login")
async def auth_login(user: schemas.UserIn, db: SessionDep):
    result = crud.user.get_by_email(db, user.email)
    if not result:
        raise HTTPException(status_code=400, detail="Email not found")
    verified = utils.verify_password(user.password, result["hashed_password"])
    if not verified:
        raise HTTPException(status_code=400, detail="Incorrect password")
    access_token_expires = config.variables.ACCESS_TOKEN_EXPIRY
    refresh_token_expires = config.variables.REFRESH_TOKEN_EXPIRY
    return models.Token(
        access_token=utils.crypt.create_access_token(
            result["email"], access_token_expires
        )
    )


@router.post("/user/signup", response_model=schemas.UserOut)
async def auth_signup(user: schemas.UserIn, db: SessionDep):
    if (
        db.exec(select(models.User).where(models.User.email == user.email.lower()))
        .scalars()
        .all()
    ):
        raise HTTPException(status_code=400, detail="Email already exists.")
    user = crud.user.create_user(db, user)
    # redirect to account successfully created, login now.
    return user


@router.get("/logout")
async def auth_logout(response: Response):
    response.delete_cookie(key="authtoken", path="/")
    # return RedirectResponse("/login")


# TODO: 2 factor auth, forgot password, logout, jwt functionality
