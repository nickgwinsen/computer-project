"use client";
import { get_puuid } from "@/calls/calls";
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
    data: puuid,
    error: queryError,
    isLoading,
  } = useQuery({
    queryKey: ["puuid", username, tag],
    queryFn: async () => {
      return await get_puuid(username, tag);
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
    <div>
      <h1>
        {username}#{tag}
      </h1>
      {
        <UserInfo puuid={puuid} />
        //<MatchHistory puuid={puuid} />
      }
    </div>
  );
};

export default UserPage;
