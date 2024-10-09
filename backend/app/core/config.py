import os
from dotenv import load_dotenv

from pydantic_settings import BaseSettings

load_dotenv()


class Settings(BaseSettings):
    # api info
    APP_NAME: str = "League Lookup"
    # db info
    DB_STRING: str = os.getenv("POSTGRES_STRING")

    SECRET_KEY: str = os.getenv("SECRET_KEY")

    # riot api
    RIOT_KEY: str = os.getenv("API_KEY")


settings = Settings()
