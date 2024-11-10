from app import models, config
import requests
from datetime import datetime
from fastapi import HTTPException


def get_puuid_and_format_username(username: str, tagline: str) -> dict | None:
    url = f"https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id/{username}/{tagline}"
    headers = {"X-Riot-Token": config.vars.variables.API_KEY}
    try:
        res = requests.get(url, headers=headers)
        if res.status_code == 404:
            return None
        data = res.json()

        # This endpoint gets us the correct capitalization of the username as well as the puuid for the account. This will be run everytime a player page is visited.
        return data
    except requests.exceptions.RequestException as e:
        raise HTTPException(status_code=404, detail="User not found")


def get_summoner_info(puuid: str) -> dict | None:
    url = f"https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/{puuid}"
    headers = {"X-Riot-Token": config.vars.variables.API_KEY}
    try:
        res = requests.get(url, headers=headers)
        if res.status_code != 200:
            return None
        data = res.json()
        return data
    except requests.exceptions.RequestException as e:
        raise HTTPException(status_code=404, detail="User not found")


def get_league_info(riot_id: str) -> dict | None:
    url = f"https://na1.api.riotgames.com/lol/league/v4/entries/by-summoner/{riot_id}"
    headers = {"X-Riot-Token": config.vars.variables.API_KEY}
    try:
        res = requests.get(url, headers=headers)
        if res.status_code != 200:
            return None
        data = res.json()
        return data
    except requests.exceptions.RequestException as e:
        raise HTTPException(status_code=404, detail="User not found")


def populate_user(username: str, tagline: str) -> models.RiotUser | None:
    account_info = get_puuid_and_format_username(username, tagline)
    puuid = account_info["puuid"]
    summoner_info = get_summoner_info(puuid)
    league_info = get_league_info(summoner_info["id"])
    if account_info is None or summoner_info is None or league_info is None:
        return None
    else:
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


# if we have never seen this user in the database we will need to get the last 20 matches. If we have seen this user before, retrieve their matches from the database. If we update, wipe the n oldest matches and add the new ones.
def get_ranked_match_history(puuid: str) -> dict:
    url = f"https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/{puuid}/ids?type=rankedstart=0&count=20"
    headers = {"X-Riot-Token": config.vars.variables.API_KEY}
    try:
        res = requests.get(url, headers=headers)
        res.raise_for_status()
        data = res.json()
        # data is a list of match ids, 20 in total
        return data
    except requests.exceptions.RequestException as e:
        print("Error: ", e)


def query_match_stats(match_id: str) -> dict:
    url = f"https://americas.api.riotgames.com/lol/match/v5/matches/{match_id}"
    headers = {"X-Riot-Token": config.vars.variables.API_KEY}
    try:
        res = requests.get(url, headers=headers)
        res.raise_for_status()
        data = res.json()
        # data is a match stats
        return data
    except requests.exceptions.RequestException as e:
        print("Error: ", e)
