import logging
import os
from contextlib import asynccontextmanager
from typing import Annotated, Any

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# api routers
from app.api import auth, riot

# db migrations
# from alembic import command
# from alembic.config import Config

log = logging.getLogger("uvicorn")


# def run_migrations():
#     cur_dir = os.getcwd()
#     full_path = os.path.join(cur_dir, "alembic", "alembic.ini")
#     print(full_path)
#     alembic_cfg = Config(full_path)
#     command.upgrade(alembic_cfg, "head")


# @asynccontextmanager
# async def lifespan(app: FastAPI):
#     log.info("Running startup migrations...")
#     run_migrations()
#     log.info("Complete!")
#     yield
#     log.info("Shutting down")


# app = FastAPI(lifespan=lifespan)

app = FastAPI()

origins = ["http://localhost:3000"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "HEAD", "OPTIONS", "PATCH"],
    allow_headers=[
        "Access-Control-Allow-Headers",
        "Content-Type",
        "Authorization",
        "Access-Control-Allow-Origin",
    ],
)


# class UserIn(BaseModel):
#     username: str
#     password: str
#     email: EmailStr
#     full_name: str | None = None


# class UserOut(BaseModel):
#     username: str
#     email: EmailStr
#     full_name: str | None = None


# # Don't do this in production!
# @app.post("/user/", response_model=UserOut)
# async def create_user(user: UserIn) -> Any:
#     return user


app.include_router(auth.router, tags=["Authentication"])
app.include_router(riot.router, tags=["Riot"])
