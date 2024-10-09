from sqlalchemy.orm import Session

# user for data transmission
from app.schemas.user import UserSchema

# user model for inserting into the db
from app.models.user import UserModel


class UserOperations:
    async def create_user(self, db: Session, user: UserSchema) -> int:
        db = next(db)
        user_to_insert = UserModel(email=user.email, hash_pass=user.password)
        db.add(user_to_insert)
        db.commit()  # commit transaction to save
        db.refresh(user_to_insert)
        return user_to_insert
