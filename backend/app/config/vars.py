import os

from dotenv import load_dotenv

load_dotenv()


class Variables:
    API_KEY = os.getenv("API_KEY")
    DB_STRING = os.getenv("POSTGRES_STRING")
    SECRET_ACCESS_KEY = os.getenv("SECRET_ACCESS_KEY")
    SECRET_REFRESH_KEY = os.getenv("SECRET_REFRESH_KEY")
    ALEMBIC_PATH = os.getenv("ALEMBIC_PATH")
    ACCESS_TOKEN_EXPIRY = 120  # 2 mins ?
    REFRESH_TOKEN_EXPIRY = 60 * 60 * 24  # 1 day


variables = Variables()
