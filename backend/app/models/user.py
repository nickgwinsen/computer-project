from sqlalchemy import Column, String, Integer
from app.db.session import Base


class UserModel(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    hash_pass = Column(String)
    riot_username = Column(String)
    riot_tag = Column(String)
