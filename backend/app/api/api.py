from fastapi import APIRouter

from .endpoints import auth, riot

# Separating the api router from the endpoints for cleanliness
api_router = APIRouter(prefix="/api")
api_router.include_router(riot.router)
api_router.include_router(auth.router)
