"use client";
import { useState, useEffect } from "react";
import { getUserInfo, updateUserInfo } from "@/app/(api)/riot/riot";
import { useQuery } from "@tanstack/react-query";
import User from "@/components/User";
import { useAuth } from "@/app/providers/authProvider";
import MatchHistory from "@/components/MatchHistory";
import ChampionStatistics from "@/components/ChampionStatistics";

const UserPage = ({
  params,
}: {
  params: { username: string; tag: string };
}) => {
  const { username, tag } = params;
  const [update, setUpdate] = useState(false);
  const [champions, setChampions] = useState([]);
  const [commonTeammates, setCommonTeammates] = useState({});
  const [preferredRoles, setPreferredRoles] = useState({});

  const { isAuthenticated } = useAuth();
  const {
    data: userData,
    error: queryError,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["puuid", username, tag],
    queryFn: async () => {
      return await getUserInfo(username.toLowerCase(), tag.toLowerCase());
    },
    enabled: isAuthenticated && !!username && !!tag,
  });

  const updateUser = async () => {
    setUpdate(true);
    await updateUserInfo(username.toLowerCase(), tag.toLowerCase());
    await refetch();
    setUpdate(false);
  };

  //const setChampionInfo = (champions: ) => { setChampions(champions); };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (queryError) {
    return <div>Error: {queryError.message}</div>;
  }

  if (!isAuthenticated) {
    return <div>Authenticating...</div>;
  }

  if (!userData?.puuid) {
    return <div>User does not exist.</div>;
  }

  return (
    <div>
      <User data={userData} />
      <p>Last updated: {userData.last_updated}</p>
      <button onClick={updateUser}>Update</button>
      <MatchHistory puuid={userData.puuid} />
      <ChampionStatistics puuid={userData.puuid} />
    </div>
  );
};

export default UserPage;
