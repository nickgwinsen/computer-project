# db setup and connection function
from typing import Annotated

from fastapi import Depends
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlmodel import Session

from app.config.vars import variables

engine = create_engine(variables.DB_STRING)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


# def create_db_and_tables():
#     SQLModel.metadata.create_all(engine)


def get_session():
    with Session(engine) as session:
        yield session


SessionDep = Annotated[Session, Depends(get_session)]
