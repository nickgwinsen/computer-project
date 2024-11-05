"use client";
import { get_puuid_and_info } from "@/calls/calls";
import { useQuery } from "@tanstack/react-query";
import UserInfo from "@/components/UserInfo";

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
      return await get_puuid_and_info(username, tag);
    },
    enabled: !!username && !!tag,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (queryError) {
    return <div>Error: {queryError.message}</div>;
  }

  return (
    //need to store a user in the database on query
    <div>
      <h1>
        {userData.gameName}#{userData.tagLine}
      </h1>
      {
        <UserInfo puuid={userData.puuid} />
        //<MatchHistory puuid={puuid} />
      }
    </div>
  );
};

export default UserPage;
