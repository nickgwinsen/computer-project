from app import models, config
import requests
from datetime import datetime
from fastapi import HTTPException
from typing import List


def get_puuid_and_format_username(username: str, tagline: str) -> dict | None:
    url = f"https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id/{username}/{tagline}"
    headers = {"X-Riot-Token": config.vars.variables.API_KEY}
    try:
        res = requests.get(url, headers=headers)
        if res.status_code != 200:
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
    if account_info is None:
        return None
    puuid = account_info["puuid"]
    summoner_info = get_summoner_info(puuid)
    if summoner_info is None:
        return None
    league_info = get_league_info(summoner_info["id"])
    if league_info is None:
        return None
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
def get_ranked_match_history(puuid: str, start_time: int | None) -> list:
    if start_time is not None:
        url = f"https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/{puuid}/ids?startTime={start_time}&type=ranked&start=0&count=20"
    else:
        url = f"https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/{puuid}/ids?type=ranked&start=0&count=20"
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
        match = res.json()
        # data is a match stats
        participants = []
        players = []
        for participant in match["info"]["participants"]:
            participants.append(participant["riotIdGameName"])
            players.append(
                {
                    "riot_id": participant["riotIdGameName"]
                    + "#"
                    + participant["riotIdTagline"],
                    "team_id": participant["teamId"],
                    "keystone_rune": participant["perks"]["styles"][0]["selections"][0][
                        "perk"
                    ],
                    "secondary_rune_style": participant["perks"]["styles"][1]["style"],
                    "item0": participant["item0"],
                    "item1": participant["item1"],
                    "item2": participant["item2"],
                    "item3": participant["item3"],
                    "item4": participant["item4"],
                    "item5": participant["item5"],
                    "ward": participant["item6"],
                    "puuid": participant["puuid"],
                    "champion_id": participant["championId"],
                    "champion_name": participant["championName"],
                    "lane": participant["lane"],
                    "role": participant["role"],
                    "win": participant["win"],
                    "summoner_spell1": participant["summoner1Id"],
                    "summoner_spell2": participant["summoner2Id"],
                    "stat": {
                        "kills": participant["kills"],
                        "deaths": participant["deaths"],
                        "assists": participant["assists"],
                        "minion_kills": participant["totalMinionsKilled"],
                        "jungle_monster_kills": participant["neutralMinionsKilled"],
                        "champion_level": participant["champLevel"],
                        "total_damage_dealt": participant[
                            "totalDamageDealtToChampions"
                        ],
                        "total_damage_taken": participant["totalDamageTaken"],
                        "turret_kills": participant["turretKills"],
                        "inhibitor_kills": participant["inhibitorKills"],
                        "vision_score": participant["visionScore"],
                    },
                }
            )
        return {
            "match_id": match["metadata"]["matchId"],
            "game_create_timestamp": match["info"]["gameCreation"],
            "game_end_timestamp": match["info"]["gameEndTimestamp"],
            "game_mode": match["info"]["gameMode"],
            "team100_win": str(match["info"]["teams"][0]["win"]) == "True",
            "team200_win": str(match["info"]["teams"][1]["win"]) == "True",
            "participants": participants,
            "players": players,
        }
    except requests.exceptions.RequestException as e:
        print("Error: ", e)


def create_game_from_matchdata(match_data: dict) -> models.Match:
    all_players = match_data["participants"]
    return models.Match(
        match_id=match_data["match_id"],
        game_create_timestamp=datetime.fromtimestamp(
            float(match_data["game_create_timestamp"]) / 1000
        ),
        game_end_timestamp=datetime.fromtimestamp(
            float(match_data["game_end_timestamp"]) / 1000
        ),
        game_mode=match_data["game_mode"],
        team100_win=match_data["team100_win"],
        team200_win=match_data["team200_win"],
        all_players=all_players,
    )


def create_players_from_matchdata(match_data: dict) -> List[models.Player]:
    match_id = match_data["match_id"]
    players = []
    for player in match_data["players"]:
        players.append(
            models.Player(
                riot_id=str(player["riot_id"]).lower(),
                match_id=match_id,
                riot_and_match_id=str(player["riot_id"]).lower() + "|" + match_id,
                team_id=player["team_id"],
                keystone=player["keystone_rune"],
                secondary_rune=player["secondary_rune_style"],
                item0=player["item0"],
                item1=player["item1"],
                item2=player["item2"],
                item3=player["item3"],
                item4=player["item4"],
                item5=player["item5"],
                ward=player["ward"],
                puuid=player["puuid"],
                champion_id=player["champion_id"],
                champion_name=player["champion_name"],
                lane=player["lane"],
                role=player["role"],
                win=player["win"],
                summoner_1=player["summoner_spell1"],
                summoner_2=player["summoner_spell2"],
            )
        )
    return players


def create_stats_from_matchdata(
    players: List[models.Player], match_data: dict
) -> List[models.Stat]:
    match_id = match_data["match_id"]
    stats = []
    for stat in match_data["players"]:
        player_id = next(
            player.id for player in players if player.puuid == stat["puuid"]
        )
        stats.append(
            models.Stat(
                player_id=player_id,
                match_id=match_id,
                kills=stat["stat"]["kills"],
                assists=stat["stat"]["assists"],
                deaths=stat["stat"]["deaths"],
                minion_kills=stat["stat"]["minion_kills"],
                jungle_monster_kills=stat["stat"]["jungle_monster_kills"],
                champion_level=stat["stat"]["champion_level"],
                total_damage_dealt=stat["stat"]["total_damage_dealt"],
                total_damage_taken=stat["stat"]["total_damage_taken"],
                vision_score=stat["stat"]["vision_score"],
                turret_kills=stat["stat"]["turret_kills"],
                inhibitor_kills=stat["stat"]["inhibitor_kills"],
            )
        )
    return stats
