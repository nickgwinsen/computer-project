"use client";
import { useState, useEffect } from "react";
import { get_puuid } from "@/calls/calls";
import MatchHistory from "@/components/MatchHistory";

const UserPage = ({
  params,
}: {
  params: { username: string; tag: string };
}) => {
  const username = params.username;
  const tag = params.tag;
  const [puuid, setPuuid] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await get_puuid(username, tag);

        setPuuid(data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [username, tag]);
  if (loading) {
    return <div>Loading data</div>;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <div>
      <MatchHistory puuid={puuid} />
    </div>
  );
};

export default UserPage;
