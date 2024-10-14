import bcrypt
from dotenv import load_dotenv

# from config.vars import variables

load_dotenv()


def hash_password(password: str) -> str:
    bytes = password.encode("utf-8")
    salt = bcrypt.gensalt()
    hash = bcrypt.hashpw(bytes, salt)
    return {"salt": salt, "hashed_password": hash.decode("utf-8")}


def verify_password(plain_password, hash_password) -> bool:
    bytes = plain_password.encode("utf-8")

    return bcrypt.checkpw(bytes, hash_password.encode("utf-8"))
