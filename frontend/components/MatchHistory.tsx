"use client";
import { useState } from "react";
import { getGamesList } from "@/app/(api)/riot/riot";
//import Match from "./Match";
import { useQuery } from "@tanstack/react-query";
import Match from "./Match";
import { Container } from "@mui/material";

const MatchHistory = ({
  puuid,
  setWinLoss,
  setCommonTeammates,
  setPreferredRoles,
}: {
  puuid: string;
  setWinLoss: (winLoss: number) => void;
  setCommonTeammates: (teammates: object) => void;
  setPreferredRoles: (roles: object) => void;
}) => {
  const [wins, setWins] = useState(0);
  const [losses, setLosses] = useState(0);
  const [teammates, setTeammates] = useState<{ [key: string]: number }>({});
  const [roles, setRoles] = useState<{ [key: string]: number }>({});
  const [champions, setChampions] = useState<{ [key: string]: number }>({});

  const buildTeammates = (match_teammates: string[]): void => {
    for (const match_teammate of match_teammates) {
      if (match_teammate in teammates) {
        teammates[match_teammate] += 1;
      } else {
        teammates[match_teammate] = 1;
      }
    }
    setTeammates((prevTeammates) => ({ ...prevTeammates, ...teammates }));
  };

  const buildRoles = (role: string): void => {
    if (role in roles) {
      roles[role] += 1;
    } else {
      roles[role] = 1;
    }
    setRoles((prevRoles) => ({ ...prevRoles, ...roles }));
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
    return <div>Loading...</div>;
  }
  if (queryError) {
    return <div>Error: {queryError.message}</div>;
  }
  if (!gamesData) {
    return <div>No games found.</div>;
  }
  //will return a big structured box with all the games in it
  console.log("Wins: ", wins);
  console.log("Losses: ", losses);
  console.log("Teammates: ", teammates);
  console.log("Roles: ", roles);
  return (
    <Container>
      {gamesData.map((game: string) => (
        <Match
          key={game}
          puuid={puuid}
          match_id={game}
          setWins={setWins}
          setLosses={setLosses}
          setTeammates={buildTeammates}
          setRoles={buildRoles}
          setChampions={setChampions}
        />
      ))}
    </Container>
  );
};

export default MatchHistory;
