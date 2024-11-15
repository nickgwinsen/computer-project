# riot endpoints
from fastapi import APIRouter, Path
from app.db.session import SessionDep
from app.config.vars import variables
from sqlalchemy import select
from app import models, services, schemas
from datetime import datetime
from typing import List


router = APIRouter()


@router.get("/riot/user/{puuid}/matches", response_model=List)
async def get_match_history(
    start_time: int | None = None,
    puuid: str = Path(...),
):
    match_history = services.get_ranked_match_history(puuid, start_time)
    # need to get riot id for each participant
    return match_history
    # query riot for each participant's name


# get request
@router.get(
    "/riot/user/{username}/{tagline}",
    response_model=schemas.RiotAccount | dict,
)
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
        # print("THE USER IS BEING FOUND IN THE DATABASE")
        return schemas.RiotAccount.model_validate(user)

    else:
        # print("User not found in database")
        try:
            user = services.populate_user(username, tagline)
            if user is None:
                return {}
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


@router.get("/riot/user/{puuid}/match/{match_id}", response_model=dict)
async def get_match_information(
    db: SessionDep, match_id: str = Path(...), puuid: str = Path(...)
):
    # need to get riot id for each participant
    stmt = select(models.Match).where(models.Match.match_id == match_id)
    result = db.exec(stmt)
    match = result.scalar_one_or_none()
    if match:
        match = schemas.Match.model_validate(match)
        print("Match found in database")
        print("Retrieving match...")
        stmt = select(models.Player).where(
            models.Player.puuid == puuid, models.Player.match_id == match_id
        )
        result = db.exec(stmt)
        current_player = result.scalar_one_or_none()
        current_player = schemas.Player.model_validate(current_player)
        stmt = select(models.Stat).where(models.Stat.player_id == current_player.id)
        result = db.exec(stmt)
        current_player_stats = result.scalar_one_or_none()
        return {
            "match": match,
            "player": current_player,
            "stats": current_player_stats,
        }
    else:
        print("Match not found in database...\nQuerying Riot API")
        match_info = services.query_match_stats(match_id)
        if match_info is None:
            return {}
        match = services.create_game_from_matchdata(match_info)
        players = services.create_players_from_matchdata(match_info)
        db.add(match)
        db.add_all(players)
        db.commit()
        curr_player = None
        for player in players:
            if player.puuid == puuid:
                curr_player = player
                break
        stats = services.create_stats_from_matchdata(players, match_info)
        db.add_all(stats)
        db.commit()
        db.refresh(match)
        for player in players:
            db.refresh(player)
        for stat in stats:
            db.refresh(stat)
        return_stat = None
        for stat in stats:
            if stat.player_id == curr_player.id:
                return_stat = stat
                break
    return {"match": match, "player": curr_player, "stat": return_stat}
    # query riot for each participant's name
