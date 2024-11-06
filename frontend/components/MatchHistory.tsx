"use client";
import { useState, useEffect } from "react";
import { get_games_list } from "@/app/(api)/riot/riot";
import Match from "./Match";

const MatchHistory = ({ puuid }: { puuid: string | null }) => {
  const [matchHistory, setMatchHistory] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  useEffect(() => {
    if (puuid == null) {
      setError(new Error("player doesn't exist"));
      setLoading(false);
      return;
    }
    const fetchData = async () => {
      try {
        const data = await get_games_list(puuid);
        //console.log(data);
        setMatchHistory(data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [puuid]);
  if (loading) {
    return <div>Loading data</div>;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <ul>
      {matchHistory.map((match, index) => (
        <Match key={index} match_id={match} />
      ))}
    </ul>
  );
};

export default MatchHistory;
