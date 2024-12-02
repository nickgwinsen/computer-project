"use client";
import { useState } from "react";
import { getGamesList } from "@/app/(api)/riot/riot";
//import Match from "./Match";
import { useQuery } from "@tanstack/react-query";
import Match from "./Match";
import { CircularProgress, Container } from "@mui/material";

const MatchHistory = ({
  puuid,
  setWinsTop,
  setLossesTop,
  setCommonTeammates,
  setPreferredRoles,
  setPreferredChampions,
  setKillsTop,
  setDeathsTop,
  setAssistsTop,
}: {
  puuid: string;
  setWinsTop: (wins: number) => void;
  setLossesTop: (losses: number) => void;
  setCommonTeammates: (teammate: {
    [key: string]: { games: number; wins: number; losses: number };
  }) => void;
  setPreferredRoles: (roles: object) => void;
  setPreferredChampions: (champions: object) => void;
  setKillsTop: (kills: number) => void;
  setDeathsTop: (assists: number) => void;
  setAssistsTop: (deaths: number) => void;
}) => {
  const [wins, _setWins] = useState(0);
  const [losses, _setLosses] = useState(0);
  const [teammates, setTeammates] = useState<{
    [key: string]: { games: number; wins: number; losses: number };
  }>({});
  const [roles, setRoles] = useState<{
    [key: string]: { games: number; wins: number; losses: number };
  }>({});
  const [champions, setChampions] = useState<{
    [key: string]: {
      games: number;
      wins: number;
      losses: number;
      cs: number;
      kills: number;
      deaths: number;
      assists: number;
    };
  }>({});
  const [kills, _setKills] = useState(0);
  const [assists, _setAssists] = useState(0);
  const [deaths, _setDeaths] = useState(0);

  const buildTeammates = (match_teammates: string[], win: boolean): void => {
    for (const match_teammate of match_teammates) {
      if (match_teammate in teammates) {
        teammates[match_teammate].games += 1;
        if (win) {
          teammates[match_teammate].wins += 1;
        } else {
          teammates[match_teammate].losses += 1;
        }
      } else {
        teammates[match_teammate] = { games: 1, wins: 0, losses: 0 };
        if (win) {
          teammates[match_teammate].wins = 1;
        } else {
          teammates[match_teammate].losses = 1;
        }
      }
    }
    setTeammates((prevTeammates) => ({ ...prevTeammates, ...teammates }));
  };

  const buildRoles = (r: string, win: boolean): void => {
    if (r == "NONE") {
      return;
    }
    if (r in roles) {
      roles[r].games += 1;
      if (win) {
        roles[r].wins += 1;
      } else {
        roles[r].losses += 1;
      }
    } else {
      roles[r] = { games: 1, wins: 0, losses: 0 };
      if (win) {
        roles[r].wins = 1;
      } else {
        roles[r].losses = 1;
      }
    }
    setRoles((prevRoles) => ({ ...prevRoles, ...roles }));
  };

  const buildChampions = (
    c: string,
    win: boolean,
    kills: number,
    deaths: number,
    assists: number,
    cs: number
  ): void => {
    if (c in champions) {
      console.log("Champion: ", champions[c]);
      champions[c].games += 1;
      champions[c].kills += kills;
      champions[c].deaths += deaths;
      champions[c].assists += assists;
      champions[c].cs += cs;
      if (win) {
        champions[c].wins += 1;
      } else {
        champions[c].losses += 1;
      }
    } else {
      champions[c] = {
        games: 1,
        wins: win ? 1 : 0,
        losses: win ? 0 : 1,
        cs: cs,
        kills: kills,
        deaths: deaths,
        assists: assists,
      };
      if (win) {
        champions[c].wins = 1;
      } else {
        champions[c].losses = 1;
      }
    }
    setChampions((prevChampions) => ({ ...prevChampions, ...champions }));
  };

  const {
    data: gamesData,
    error: queryError,
    isLoading,
  } = useQuery({
    queryKey: ["games", puuid],
    queryFn: async () => {
      return await getGamesList(puuid);
    },
    staleTime: 1000 * 60 * 60 * 24,
    enabled: !!puuid,
  });
  if (isLoading) {
    return <CircularProgress />;
  }
  if (queryError) {
    return <div>Error: {queryError.message}</div>;
  }
  if (!gamesData) {
    return <div>No games found.</div>;
  }
  //will return a big structured box with all the games in it
  //console.log("Wins: ", wins);
  setWinsTop(wins);
  //console.log("Losses: ", losses);
  setLossesTop(losses);
  //console.log("Teammates: ", teammates);
  setCommonTeammates(teammates);
  console.log("Roles: ", roles);
  setPreferredRoles(roles);
  //console.log("Champions: ", champions);
  setPreferredChampions(champions);
  setKillsTop(kills);
  setDeathsTop(deaths);
  setAssistsTop(assists);
  return (
    <Container>
      {gamesData.map((game: string) => (
        <Match
          key={game}
          puuid={puuid}
          match_id={game}
          setWins={_setWins}
          setLosses={_setLosses}
          setTeammates={buildTeammates}
          setRoles={buildRoles}
          setChampions={buildChampions}
          setTotalKills={_setKills}
          setTotalAssists={_setAssists}
          setTotalDeaths={_setDeaths}
        />
      ))}
    </Container>
  );
};

export default MatchHistory;
