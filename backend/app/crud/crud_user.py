from app import models, schemas, utils
from app.db.session import SessionDep
from sqlalchemy import select
from fastapi.encoders import jsonable_encoder


class CRUDUser:
    def get_by_email(self, db: SessionDep, email: str) -> models.User:
        stmt = select(models.User).where(models.User.email == email)
        result = db.exec(stmt).scalar_one_or_none()
        result = jsonable_encoder(result)
        return result

    def create_user(self, db: SessionDep, user: schemas.UserIn) -> models.User:
        user_hash = utils.hash_password(user.password)
        user_to_add = models.User(email=user.email.lower(), hashed_password=user_hash)
        db.add(user_to_add)
        db.commit()
        db.refresh(user_to_add)
        return user_to_add


user = CRUDUser()
