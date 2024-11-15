"use client";
import { getGamesList } from "@/app/(api)/riot/riot";
//import Match from "./Match";
import { useQuery } from "@tanstack/react-query";
import Match from "./Match";

const MatchHistory = ({ puuid }: { puuid: string }) => {
  const {
    data: gamesData,
    error: queryError,
    isLoading,
  } = useQuery({
    queryKey: ["games", puuid],
    queryFn: async () => {
      return await getGamesList(puuid);
    },
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
  return (
    <ul>
      {gamesData.map((game: string) => (
        <li key={game}>
          {game}
          <Match puuid={puuid} match_id={game} />
        </li>
      ))}
    </ul>
  );
};

export default MatchHistory;
