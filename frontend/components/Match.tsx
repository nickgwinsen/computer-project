"use client";
import { useState, useEffect } from "react";
import { get_game_timeline } from "@/calls/calls";

const Match = ({ match_id }: { match_id: string }) => {
  const [matchInfo, setMatchInfo] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await get_game_timeline(match_id);
        console.log(data);
        setMatchInfo(match_id);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [match_id]);
  if (loading) {
    return <div>Loading data</div>;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  return <p>{matchInfo}</p>;
};

export default Match;
