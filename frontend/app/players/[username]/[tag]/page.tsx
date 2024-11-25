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

const UserPage = ({
  params,
}: {
  params: { username: string; tag: string };
}) => {
  const { username, tag } = params;
  const [winLoss, setWinLoss] = useState(0);
  const [commonTeammates, setCommonTeammates] = useState({});
  const [preferredRoles, setPreferredRoles] = useState({});

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
    return <div>Loading...</div>;
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
          }}
        >
          <ChampionStatistics champions={[]} />
          <RankedCard rankImage="" rankTitle="" lp={0} wins={0} losses={0} />
          <RecentTeammatesCard teammates={[]} />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "flex-start",
            width: "100%",
          }}
        >
          <RecentGamesCard />
          <MatchHistory
            puuid={userData.puuid}
            setWinLoss={setWinLoss}
            setCommonTeammates={setCommonTeammates}
            setPreferredRoles={setPreferredRoles}
          />
        </Box>
      </Box>
    </ProtectedRoute>
  );
};

export default UserPage;
