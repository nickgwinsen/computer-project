from dotenv import load_dotenv
from requests import post, get
from fastapi import FastAPI
import os

load_dotenv()

app = FastAPI()

rgapi = os.getenv("API_KEY")


@app.get("/puuid")
def get_puuid_with_name_and_tag():
    ex_name = "longhorns"
    ex_tag = "100"
    url = f"https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id/{ex_name}/{ex_tag}"
    headers = {"X-Riot-Token": rgapi}
    response = get(url, headers=headers)
    content = response.json()
    return content["puuid"]
