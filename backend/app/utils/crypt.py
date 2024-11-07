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
    """
    Create an access token for a user.

    Args:
        subject (Union[str, Any]): The subject of the token.
        expires_delta (timedelta, optional): The time delta for the token to expire. Defaults to None.

    Returns:
        str: The encoded JWT token.
    """

    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(
            minutes=config.variables.TOKEN_EXPIRY
        )
    to_encode = {"exp": expire, "subj": str(subject)}
    encoded_jwt = jwt.encode(
        to_encode, config.variables.SECRET_KEY, algorithm=ALGORITHM
    )
    return models.Token(access_token=encoded_jwt)


def decode_access_token(token: str) -> models.Token:
    """
    Decode an access token.

    Args:
        token (str): The token to decode.

    Returns:
        str: The decoded token.
    """

    try:
        payload = jwt.decode(token, config.variables.SECRET_KEY, algorithms=[ALGORITHM])
        token_data = models.Token(**payload)
        return token_data
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
