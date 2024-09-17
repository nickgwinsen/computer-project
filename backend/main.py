from dotenv import load_dotenv
from requests import post, get
from fastapi import FastAPI
import os

load_dotenv()

app = FastAPI()

rgapi = os.getenv("API_KEY")

session = {}

BASE_URL = "https://americas.api.riotgames.com/"


@app.get("/player/{game_name}/{game_tag}")
def player(game_name: str, game_tag: str):
    puuid_url = f"https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id/{game_name}/{game_tag}"
    headers = {"X-Riot-Token": rgapi}
    puuid = get(puuid_url, headers=headers)
    player_puuid = puuid.json()
    url = f"https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/{player_puuid['puuid']}/ids?start=0&count=20"
    response = get(url, headers=headers)
    content = response.json()
    return content


@app.get("/match/{match}")
def get_match_by_match_id():
    url = f"{BASE_URL}/riot/account/v1/active_shards/by-game/lor/by-puuid/xnbr8i3wA_LwJToCEYuvAkpAor7xvDE3FMuY0BKk8fkQ8sX5NvT6k_smVmhAQXjtNTpujew_IjyqWg"
    headers = {"X-Riot-Token": rgapi}
    response = get(url, headers=headers)
    content = response.json()
    return content["puuid"]
