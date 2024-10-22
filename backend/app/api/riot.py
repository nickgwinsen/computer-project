# riot endpoints
from fastapi import APIRouter, Response, status, Path
from fastapi.encoders import jsonable_encoder
import requests
from app.config.vars import variables

router = APIRouter()


@router.get("/riot/users/{username}/{tagline}")
async def get_puuid_by_riot_account(
    username: str = Path(min_length=5, max_length=16),
    tagline: str = Path(min_length=3, max_length=5),
):
    url = f"https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id/{username}/{tagline}"
    headers = {"X-Riot-Token": variables.API_KEY}
    print(headers)
    try:
        res = requests.get(url, headers=headers)
        res.raise_for_status()
        data = res.json()
        return data["puuid"]
    except requests.exceptions.RequestException as e:
        print("Error:: ", e)


@router.get("/riot/matches/{puuid}")
async def get_matches_by_puuid(puuid: str = Path(...)):
    url = f"https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/{puuid}/ids?type=ranked&start=0&count=20"
    headers = {"X-Riot-Token": variables.API_KEY}
    print(headers)
    try:
        res = requests.get(url, headers=headers)
        res.raise_for_status()
        data = res.json()
        return data
    except requests.exceptions.RequestException as e:
        print("Error:: ", e)


@router.get("/riot/match/{match_id}")
async def get_match_and_match_timeline(match_id: str = Path(...)):
    url = f"https://americas.api.riotgames.com/lol/match/v5/matches/{match_id}"
    url_timeline = (
        f"https://americas.api.riotgames.com/lol/match/v5/matches/{match_id}/timeline"
    )
    headers = {"X-Riot-Token": variables.API_KEY}
    print(headers)
    try:
        res = requests.get(url, headers=headers)
        res_timeline = requests.get(url, headers=headers)
        res.raise_for_status()
        res_timeline.raise_for_status()
        data = res.json()
        data_timeline = res_timeline.json()
        return {"overall_match_data": data, "match_timeline": data_timeline}
    except requests.exceptions.RequestException as e:
        print("Error:: ", e)
