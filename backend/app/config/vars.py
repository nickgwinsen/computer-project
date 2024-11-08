import os

from dotenv import load_dotenv

load_dotenv()


class Variables:
    API_KEY = os.getenv("API_KEY")
    DB_STRING = os.getenv("POSTGRES_STRING")
    SECRET_KEY = os.getenv("SECRET_KEY")
    ALEMBIC_PATH = os.getenv("ALEMBIC_PATH")
    ACCESS_TOKEN_EXPIRY = 60 * 2
    REFRESH_TOKEN_EXPIRY = 60 * 24


variables = Variables()
