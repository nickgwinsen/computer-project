from datetime import datetime, timedelta, timezone
from typing import Any, Union

import bcrypt
from dotenv import load_dotenv
from fastapi import HTTPException, status
from jose import JWTError, jwt
from pydantic import ValidationError

from app import config, models

load_dotenv()

ALGORITHM = "HS256"


def create_access_token(
    subject: Union[str, Any] = None, expires_delta: timedelta = None
) -> models.Token:
    if expires_delta:
        expire = datetime.now(timezone.utc) + timedelta(expires_delta)
    else:
        expire = datetime.now(timezone.utc) + timedelta(
            minutes=config.variables.ACCESS_TOKEN_EXPIRY
        )
    to_encode = {"exp": expire, "subj": str(subject)}
    encoded_jwt = jwt.encode(
        to_encode, config.variables.SECRET_ACCESS_KEY, algorithm=ALGORITHM
    )
    return encoded_jwt


def create_refresh_token(
    subject: Union[str, Any] = None, expires_delta: timedelta = None
) -> models.Token:
    if expires_delta:
        expire = datetime.now(timezone.utc) + timedelta(expires_delta)
    else:
        expire = datetime.now(timezone.utc) + timedelta(
            minutes=config.variables.REFRESH_TOKEN_EXPIRY
        )
    to_encode = {"exp": expire, "subj": str(subject)}
    encoded_jwt = jwt.encode(
        to_encode, config.variables.SECRET_REFRESH_KEY, algorithm=ALGORITHM
    )
    return encoded_jwt


def decode_access_token(token: str) -> str | None:
    try:
        payload = jwt.decode(
            token, config.variables.SECRET_ACCESS_KEY, algorithms=[ALGORITHM]
        )
        user_email: str = payload.get("subj")
        if user_email is None:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Invalid credentials",
            )
        token_expire: datetime = payload.get("exp")
        if token_expire is None:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Invalid credentials",
            )
        if datetime.now(timezone.utc) > datetime.fromtimestamp(
            token_expire, timezone.utc
        ):
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Expired token",
            )
        return user_email
    except (JWTError, ValidationError):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Could not validate credentials",
        )


def decode_refresh_token(token: str) -> str | None:
    try:
        payload = jwt.decode(
            token, config.variables.SECRET_REFRESH_KEY, algorithms=[ALGORITHM]
        )
        user_email: str = payload.get("subj")
        if user_email is None:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Invalid credentials",
            )
        token_expire: datetime = payload.get("exp")
        if token_expire is None:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Invalid credentials",
            )
        if datetime.now(timezone.utc) > datetime.fromtimestamp(
            token_expire, timezone.utc
        ):
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Expired token",
            )
        return user_email
    except (JWTError, ValidationError):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Could not validate credentials",
        )


def decode_refresh_token(token: str) -> str | None:
    if not token:
        return None
    try:
        payload = jwt.decode(
            token, config.variables.SECRET_REFRESH_KEY, algorithms=[ALGORITHM]
        )
        user_email: str = payload.get("subj")
        if user_email is None:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Invalid credentials",
            )
        token_expire: datetime = payload.get("exp")
        if token_expire is None:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Invalid credentials",
            )
        if datetime.now(timezone.utc) > datetime.fromtimestamp(
            token_expire, timezone.utc
        ):
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Expired token",
            )
        return user_email
    except (JWTError, ValidationError):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Could not validate credentials",
        )


def hash_password(password: str) -> str:
    bytes = password.encode("utf-8")
    salt = bcrypt.gensalt()
    hash = bcrypt.hashpw(bytes, salt)
    return hash.decode("utf-8")


def verify_password(plain_password, hash_password) -> bool:
    bytes = plain_password.encode("utf-8")

    return bcrypt.checkpw(bytes, hash_password.encode("utf-8"))
