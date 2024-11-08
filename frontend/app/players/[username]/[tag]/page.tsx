"use client";
import { get_user_info } from "@/app/(api)/riot/riot";
import { useQuery } from "@tanstack/react-query";
import User from "@/components/User";
import withAuth from "@/components/withAuth";

const UserPage = ({
  params,
}: {
  params: { username: string; tag: string };
}) => {
  const username = params.username;
  const tag = params.tag;

  const {
    data: userData,
    error: queryError,
    isLoading,
  } = useQuery({
    queryKey: ["puuid", username, tag],
    queryFn: async () => {
      return await get_user_info(username.toLowerCase(), tag.toLowerCase());
    },
    enabled: !!username && !!tag,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (queryError) {
    return <div>Error: {queryError.message}</div>;
  }

  if (!userData) {
    return <div>No user found</div>;
  }
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
    </div>
  );
};

export default withAuth(UserPage);
