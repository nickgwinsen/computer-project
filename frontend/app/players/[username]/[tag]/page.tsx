"use client";
import { getUserInfo, updateUserInfo } from "@/app/(api)/riot/riot";
import { useQuery } from "@tanstack/react-query";
import User from "@/components/User";
import MatchHistory from "@/components/MatchHistory";
import ChampionStatistics from "@/components/ChampionStatistics";
import ProtectedRoute from "@/components/ProtectedRoute";

const UserPage = ({
  params,
}: {
  params: { username: string; tag: string };
}) => {
  const { username, tag } = params;
  // const [update, setUpdate] = useState(false);
  // const [champions, setChampions] = useState([]);
  // const [commonTeammates, setCommonTeammates] = useState({});
  // const [preferredRoles, setPreferredRoles] = useState({});

  // const router = useRouter();
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
    enabled: !!username && !!tag,
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

  if (!userData?.puuid) {
    return <div>User does not exist.</div>;
  }

  return (
    <ProtectedRoute>
      <User data={userData} />
      <p>Last updated: {userData.last_updated}</p>
      <button onClick={updateUser}>Update</button>
      <MatchHistory puuid={userData.puuid} />
      <ChampionStatistics puuid={userData.puuid} />
    </ProtectedRoute>
  );
};

export default UserPage;
