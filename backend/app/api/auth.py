from fastapi import APIRouter, Depends
from sqlalchemy import text
from sqlalchemy.orm import Session
from app.db.session import get_db

router = APIRouter()


@router.get("/dbtest")
async def db_test(db: Session = Depends(get_db)):
    return {"db_version": db.execute(text("SELECT version();")).scalar()}
