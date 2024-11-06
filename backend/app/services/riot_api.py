from app import models, config
import requests
from datetime import datetime


def format_username(username: str, tagline: str) -> dict:
    url = f"https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id/{username}/{tagline}"
    headers = {"X-Riot-Token": config.vars.variables.API_KEY}
    try:
        res = requests.get(url, headers=headers)
        res.raise_for_status()
        data = res.json()

        # This endpoint gets us the correct capitalization of the username as well as the puuid for the account. This will be run everytime a player page is visited.
        return data
    except requests.exceptions.RequestException as e:
        print("Error: ", e)


def get_puuid_and_format_username(username: str, tagline: str) -> dict:
    url = f"https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id/{username}/{tagline}"
    headers = {"X-Riot-Token": config.vars.variables.API_KEY}
    try:
        res = requests.get(url, headers=headers)
        res.raise_for_status()
        data = res.json()

        # This endpoint gets us the correct capitalization of the username as well as the puuid for the account. This will be run everytime a player page is visited.
        return data
    except requests.exceptions.RequestException as e:
        print("Error: ", e)


def get_summoner_info(puuid: str) -> dict:
    url = f"https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/{puuid}"
    headers = {"X-Riot-Token": config.vars.variables.API_KEY}
    try:
        res = requests.get(url, headers=headers)
        res.raise_for_status()
        data = res.json()
        return data
    except requests.exceptions.RequestException as e:
        print("Error: ", e)


def get_league_info(riot_id: str) -> dict:
    url = f"https://na1.api.riotgames.com/lol/league/v4/entries/by-summoner/{riot_id}"
    headers = {"X-Riot-Token": config.vars.variables.API_KEY}
    try:
        res = requests.get(url, headers=headers)
        res.raise_for_status()
        data = res.json()
        return data
    except requests.exceptions.RequestException as e:
        print("Error: ", e)


def populate_user(username: str, tagline: str) -> models.RiotUser:
    account_info = get_puuid_and_format_username(username, tagline)
    puuid = account_info["puuid"]
    summoner_info = get_summoner_info(puuid)
    league_info = get_league_info(summoner_info["id"])
    return models.RiotUser(
        puuid=puuid,
        summoner_id=summoner_info["id"],
        riot_id_lower=f"{account_info['gameName'].lower()}#{account_info['tagLine'].lower()}",
        riot_id=f"{account_info['gameName']}#{account_info['tagLine']}",
        profile_icon_id=summoner_info["profileIconId"],
        summoner_level=summoner_info["summonerLevel"],
        last_updated=datetime.now(),
        tier=league_info[0]["tier"],
        rank=league_info[0]["rank"],
        league_points=league_info[0]["leaguePoints"],
        wins=league_info[0]["wins"],
        losses=league_info[0]["losses"],
    )
