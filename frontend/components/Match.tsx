"use client";
import { useEffect } from "react";
import { getGameInformation } from "@/app/(api)/riot/riot";
import { useQuery } from "@tanstack/react-query";
import { Paper, Card, CardContent } from "@mui/material";
//import { BASE_DD_URL } from "@/config/constants";

const Match = ({
  puuid,
  match_id,
  setWins,
  setLosses,
  setTeammates,
  setRoles,
  setChampions,
}: {
  puuid: string;
  match_id: string;
  setWins: React.Dispatch<React.SetStateAction<number>>;
  setLosses: React.Dispatch<React.SetStateAction<number>>;
  setTeammates: (teammates: string[]) => void;
  setRoles: (role: string) => void;
  setChampions: (champ: string) => void;
}) => {
  const {
    data: matchData,
    error: queryError,
    isLoading,
  } = useQuery({
    queryKey: ["match", puuid, match_id],
    queryFn: async () => {
      return await getGameInformation(puuid, match_id);
    },
    enabled: !!puuid && !!match_id,
  });
  useEffect(() => {
    if (matchData) {
      if (matchData.player.win) {
        setWins((prev) => prev + 1);
      } else {
        setLosses((prev) => prev + 1);
      }
      setTeammates(matchData.match.all_players);
      setRoles(matchData.player.lane);
      setChampions(matchData.player.champion_id);
    }
  }, [matchData]);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (queryError) {
    return <div>Error: {queryError.message}</div>;
  }
  if (!matchData) {
    return <div>No match found.</div>;
  }
  return (
    <Paper
      elevation={1}
      sx={{
        margin: "10px",
        paddingLeft: "10px",
        backgroundColor: matchData.player.win ? "#3b82f6" : "#ef4444",
        borderLeft: "10px",
      }}
    >
      <Card
        sx={{
          backgroundColor: matchData.player.win ? "#28344f" : "#58343b",
          minHeight: "140px",
        }}
      >
        <CardContent></CardContent>
      </Card>
    </Paper>
  );
};

export default Match;
