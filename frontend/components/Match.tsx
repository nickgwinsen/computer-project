"use client";
import { useState, useEffect } from "react";
import { getGameInformation } from "@/app/(api)/riot/riot";
import { useQuery } from "@tanstack/react-query";

const Match = ({ puuid, match_id }: { puuid: string; match_id: string }) => {
  const {
    data: matchData,
    error: queryError,
    isLoading,
  } = useQuery({
    queryKey: ["match", puuid, match_id],
    queryFn: async () => {
      return await getGameInformation(puuid, match_id);
    },
    enabled: !!puuid && !!match_id,
  });
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (queryError) {
    return <div>Error: {queryError.message}</div>;
  }
  if (!matchData) {
    return <div>No match found.</div>;
  }
  const matchInfo = JSON.stringify(matchData);
  return <p>{matchInfo}</p>;
};

export default Match;
