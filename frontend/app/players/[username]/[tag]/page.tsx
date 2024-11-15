"use client";
import { get_user_info } from "@/app/(api)/riot/riot";
import { useQuery } from "@tanstack/react-query";
import User from "@/components/User";
import { useAuth } from "@/app/providers/authProvider";

const UserPage = ({
  params,
}: {
  params: { username: string; tag: string };
}) => {
  //store the last updated date as a state variable where it is in timestamp form so we can prop drill it down to the match history component
  const username = params.username;
  const tag = params.tag;
  const { isAuthenticated } = useAuth();
  const {
    data: userData,
    error: queryError,
    isLoading,
  } = useQuery({
    queryKey: ["puuid", username, tag],
    queryFn: async () => {
      return await get_user_info(username.toLowerCase(), tag.toLowerCase());
    },
    enabled: isAuthenticated && !!username && !!tag,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (queryError) {
    return <div>Error: {queryError.message}</div>;
  }

  if (!isAuthenticated) {
    return <div>You are unauthorized to view this content.</div>;
  }

  if (!userData) {
    return <div>User not found.</div>;
  }
  const riotUser = userData.riot_id;
  return (
    //need to store a user in the database on query
    <div>
      <User data={userData} />
      {
        // most picked champs (w-l with champ)
        // recently played with (include w-l with this player)
        // match history
      }
      <button>Update</button>
      <p>Last updated: {userData.last_updated}</p>
      {/* <MatchHistory /> */}
    </div>
  );
};

export default UserPage;
