import bcrypt
from dotenv import load_dotenv

# from config.vars import variables

load_dotenv()


def hash_password(password: str) -> str:
    bytes = password.encode("utf-8")
    salt = bcrypt.gensalt()
    hash = bcrypt.hashpw(bytes, salt)
    return (salt, hash)


print(hash_password("test123user"))
