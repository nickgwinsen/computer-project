"use client";
import { useState } from "react";
import { getUserInfo } from "@/app/(api)/riot/riot";
import { useQuery } from "@tanstack/react-query";
import { Box } from "@mui/material";
import User from "@/components/User";
import MatchHistory from "@/components/MatchHistory";
import ChampionStatistics from "@/components/ChampionStatistics";
import ProtectedRoute from "@/components/ProtectedRoute";
import RecentGamesCard from "@/components/RecentGamesCard";
import RankedCard from "@/components/RankedCard";
import RecentTeammatesCard from "@/components/RecentTeammatesCard";
import { CircularProgress } from "@mui/material";
import { Teammate } from "@/components/RecentTeammatesCard";
const UserPage = ({
  params,
}: {
  params: { username: string; tag: string };
}) => {
  const { username, tag } = params;
  const [wins, setWins] = useState(0);
  const [losses, setLosses] = useState(0);
  const [totalKills, setTotalKills] = useState(0);
  const [totalAssists, setTotalAssists] = useState(0);
  const [totalDeaths, setTotalDeaths] = useState(0);

  const [commonTeammates, setCommonTeammates] = useState({});
  const [preferredRoles, setPreferredRoles] = useState({});
  const [preferredChampions, setPreferredChampions] = useState({});
  // const router = useRouter();
  const {
    data: userData,
    error: queryError,
    isLoading,
  } = useQuery({
    queryKey: ["puuid", username, tag],
    queryFn: async () => {
      return await getUserInfo(username.toLowerCase(), tag.toLowerCase());
    },
    enabled: !!username && !!tag,
  });

  //const setChampionInfo = (champions: ) => { setChampions(champions); };

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (queryError) {
    return <div>Error: {queryError.message}</div>;
  }

  if (!userData?.puuid) {
    return <div>User does not exist.</div>;
  }
  return (
    <ProtectedRoute>
      <User data={userData} />
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "flex-start",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "flex-start",
            gap: "1rem",
          }}
        >
          <RankedCard
            tier={userData.tier}
            rank={userData.rank}
            lp={userData.league_points}
            wins={userData.wins}
            losses={userData.losses}
          />
          <ChampionStatistics champions={preferredChampions} />
          <RecentTeammatesCard teammates={commonTeammates} />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <RecentGamesCard
            wins={wins}
            losses={losses}
            totalKills={totalKills}
            totalDeaths={totalDeaths}
            totalAssists={totalAssists}
            champions={preferredChampions}
            roles={preferredRoles}
          />
          <MatchHistory
            puuid={userData.puuid}
            setWinsTop={setWins}
            setLossesTop={setLosses}
            setCommonTeammates={setCommonTeammates}
            setPreferredRoles={setPreferredRoles}
            setPreferredChampions={setPreferredChampions}
          />
        </Box>
      </Box>
    </ProtectedRoute>
  );
};

export default UserPage;
