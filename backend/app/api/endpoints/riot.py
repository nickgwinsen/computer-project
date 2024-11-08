# riot endpoints
from fastapi import APIRouter, Path
import requests
from app.db.session import SessionDep
from app.config.vars import variables
from sqlalchemy import select
from app import models, services, schemas
from datetime import datetime


router = APIRouter()


@router.get("/riot/user/{puuid}/matches")
async def get_matches_by_puuid(puuid: str = Path(...)):
    url = f"https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/{puuid}/ids?type=ranked&start=0&count=20"
    headers = {"X-Riot-Token": variables.API_KEY}
    try:
        res = requests.get(url, headers=headers)
        res.raise_for_status()
        data = res.json()
        return data
    except requests.exceptions.RequestException as e:
        print("Error: ", e)


@router.get("/riot/user/{username}/{tagline}", response_model=schemas.RiotAccount)
async def get_account_data_on_page_load(
    db: SessionDep,
    username: str = Path(min_length=5, max_length=16),
    tagline: str = Path(min_length=3, max_length=5),
):
    stmt = select(models.RiotUser).where(
        models.RiotUser.riot_id_lower == f"{username}#{tagline}"
    )
    result = db.exec(stmt)
    user = result.scalar_one_or_none()
    if user:
        print("User found in database")
        return schemas.RiotAccount.model_validate(user)
    else:
        print("User not found in database")
        try:
            user = services.populate_user(username, tagline)
            print(
                "!!!!!!trying to populate the user to the database with the following data!!!!!:  ",
                user,
            )
            db.add(user)
            db.commit()
            db.refresh(user)
            return schemas.RiotAccount.model_validate(user)
        except Exception as e:
            print("Error on insertion of user", e)


@router.put("/riot/user/{username}/{tagline}", response_model=schemas.RiotAccount)
async def update_account_data(
    db: SessionDep,
    username: str = Path(min_length=5, max_length=16),
    tagline: str = Path(min_length=3, max_length=5),
):
    stmt = select(models.RiotUser).where(
        models.RiotUser.riot_id_lower == f"{username}#{tagline}"
    )
    result = db.exec(stmt)
    user = result.scalar_one_or_none()
    if user:
        try:
            update_fields = services.populate_user(username, tagline)
            user.last_updated = datetime.now()
            user.profile_icon_id = update_fields.profile_icon_id
            user.summoner_level = update_fields.summoner_level
            user.tier = update_fields.tier
            user.rank = update_fields.rank
            user.league_points = update_fields.league_points
            user.wins = update_fields.wins
            user.losses = update_fields.losses
            db.commit()
            db.refresh(user)
            return schemas.RiotAccount.model_validate(user)
        except Exception as e:
            print("Error on update of user", e)


@router.get("/riot/match/{match_id}")
async def get_match_information(match_id: str = Path(...)):
    match = services.query_match_stats(match_id)
    participants = match["metadata"]["participants"]
    # query riot for each participant's name
