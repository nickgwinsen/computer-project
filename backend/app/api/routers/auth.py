from fastapi import APIRouter
from app.db.session import get_db
from app.crud.crud_user import UserOperations
from app.schemas.user import UserSchema

router = APIRouter()
user_op = UserOperations()
db = get_db()


@router.post("/user/login")
async def login_jwt():
    return "post_login"


@router.post("/user/register")
async def create_user(user: UserSchema):
    inserted_id = await user_op.create_user(db, user)
    return {"User added": inserted_id}


# TODO:logout

# TODO:2 step verification

# TODO:forgot password
