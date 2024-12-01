"use client";
import { useState, useEffect } from "react";
import { getGameInformation } from "@/app/(api)/riot/riot";
import { useQuery } from "@tanstack/react-query";
import {
  Paper,
  Card,
  CardContent,
  Avatar,
  Typography,
  Box,
} from "@mui/material";
import HStack from "./HStack";
import { BASE_DD_URL } from "@/config/constants";
import VStack from "./VStack";
import { summIdToName, keystoneIdToLink } from "@/app/(api)/riot/riot";
import { timeAgo, calculateMinutesAndSeconds } from "@/app/(api)/riot/time";
import { Divider } from "@mui/material";

function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) {
    return text; // No truncation needed
  } else {
    return text.substring(0, maxLength) + "..."; // Truncate and add ellipsis
  }
}

const Match = ({
  puuid,
  match_id,
  setWins,
  setLosses,
  setTeammates,
  setRoles,
  setChampions,
}: {
  puuid: string;
  match_id: string;
  setWins: React.Dispatch<React.SetStateAction<number>>;
  setLosses: React.Dispatch<React.SetStateAction<number>>;
  setTeammates: (teammates: string[], win: boolean) => void;
  setRoles: (role: string, win: boolean) => void;
  setChampions: (
    champ: string,
    win: boolean,
    kills: number,
    assists: number,
    deaths: number,
    cs: number
  ) => void;
}) => {
  const [currentPlayer, setCurrentPlayer] = useState("");
  const [isRemake, setIsRemake] = useState(false);
  const [mins, setMins] = useState(0);
  const [secs, setSecs] = useState(0);
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
  useEffect(() => {
    if (matchData) {
      if (matchData.player.win) {
        setWins((prev) => prev + 1);
      } else {
        setLosses((prev) => prev + 1);
      }
      const { minutes, seconds } = calculateMinutesAndSeconds(
        matchData.match.game_end_timestamp,
        matchData.match.game_create_timestamp
      );
      setMins(minutes);
      setSecs(seconds);
      if (minutes <= 8) {
        setIsRemake(true);
      }
      setTeammates(matchData.match.all_players, matchData.player.win);
      setRoles(matchData.player.lane, matchData.player.win);
      setChampions(
        matchData.player.champion_name,
        matchData.player.win,
        matchData.stats.kills,
        matchData.stats.deaths,
        matchData.stats.assists,
        matchData.stats.jungle_monster_kills + matchData.stats.minion_kills
      );
    }
  }, [matchData]);

  if (isLoading) {
    // skeleton
    return (
      <Paper
        elevation={1}
        sx={{
          margin: "10px",
          paddingLeft: "10px",
          backgroundColor: "rgba(211, 211, 211, 1)",
          borderLeft: "10px",
        }}
      >
        <Card
          sx={{
            backgroundColor: "rgba(200, 200, 200, .2)",
            minHeight: "140px",
          }}
        >
          <CardContent>
            <HStack justifyContent="space-between">
              <VStack spacing={0}>
                <Typography
                  sx={{
                    color: "#9ca3af",
                  }}
                >
                  <strong>Ranked Solo/Duo</strong>
                </Typography>
                <Typography
                  sx={{
                    color: "#8f94ad",
                  }}
                >
                  X Time Ago
                </Typography>
                <Divider sx={{ backgroundColor: "#31313b" }} />
                <Typography
                  sx={{
                    color: "#8f94ad",
                  }}
                >
                  <strong>Result</strong>
                </Typography>
                <Typography
                  sx={{
                    color: "#8f94ad",
                  }}
                >
                  0m 0s
                </Typography>
              </VStack>
              <VStack spacing={1}>
                <HStack>
                  <Box sx={{ position: "relative" }}>
                    <Avatar
                      src=""
                      variant="rounded"
                      sx={{
                        width: 56,
                        height: 56,
                      }}
                    >
                      {" "}
                    </Avatar>
                    <Typography
                      sx={{
                        position: "absolute",
                        bottom: 0,
                        right: 0,
                        backgroundColor: "#2b2d3d",
                        color: "white",
                        borderRadius: "50%",
                        padding: "0.1rem 0.3rem",
                        fontSize: "0.7rem",
                        minWidth: "14px",
                        minHeight: "14px",
                        textAlign: "center",
                        transform: "translate(50%, 50%)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      0
                    </Typography>
                  </Box>
                  <HStack spacing={0.3}>
                    <VStack spacing={0.2}>
                      <Avatar
                        src=""
                        variant="rounded"
                        sx={{
                          width: 20,
                          height: 20,
                        }}
                      >
                        {" "}
                      </Avatar>
                      <Avatar
                        src=""
                        variant="rounded"
                        sx={{
                          width: 20,
                          height: 20,
                        }}
                      >
                        {" "}
                      </Avatar>
                    </VStack>
                    <VStack spacing={0.2}>
                      <Avatar
                        src=""
                        sx={{
                          width: 20,
                          height: 20,
                        }}
                      >
                        {" "}
                      </Avatar>
                      <Avatar
                        src=""
                        variant="rounded"
                        sx={{
                          width: 20,
                          height: 20,
                        }}
                      >
                        {" "}
                      </Avatar>
                    </VStack>
                  </HStack>
                </HStack>
                <HStack spacing={0.1}>
                  {[0, 1, 2, 3, 4, 5].map((itemIndex) => (
                    <Avatar
                      key={itemIndex}
                      src=""
                      variant="rounded"
                      sx={{
                        width: 20,
                        height: 20,
                        backgroundColor: "rgba(0,0,0,0.3)",
                        border: "1px solid rgba(255,255,255,0.1)",
                      }}
                    >
                      {" "}
                    </Avatar>
                  ))}
                  <Avatar
                    src=""
                    variant="rounded"
                    sx={{
                      width: 20,
                      height: 20,
                    }}
                  >
                    {" "}
                  </Avatar>
                </HStack>
              </VStack>
              <VStack spacing={0.2}>
                <Typography
                  variant="h6"
                  sx={{
                    color: "#8f94ad",
                  }}
                >
                  0/<span style={{ color: "#ef4444" }}>0</span>/0
                </Typography>
                <Typography
                  sx={{
                    color: "#8f94ad",
                    fontSize: "0.8rem",
                  }}
                >
                  0 CS (0.0/min)
                </Typography>
              </VStack>
              <VStack spacing={0.2}>
                {[0, 1, 2, 3, 4].map((index) => (
                  <Typography
                    key={index}
                    sx={{ color: "#8f94ad", fontSize: "0.6rem" }}
                  >
                    Player
                  </Typography>
                ))}
              </VStack>
              <VStack spacing={0.2}>
                {[0, 1, 2, 3, 4].map((index) => (
                  <Typography
                    key={index}
                    sx={{ color: "#8f94ad", fontSize: "0.6rem" }}
                  >
                    Player
                  </Typography>
                ))}
              </VStack>
            </HStack>
          </CardContent>
        </Card>
      </Paper>
    );
  }

  if (queryError) {
    return <div>Error: {queryError.message}</div>;
  }
  if (!matchData) {
    return <div>No match found.</div>;
  }
  return (
    <Paper
      elevation={1}
      sx={{
        margin: "10px",
        paddingLeft: "10px",
        backgroundColor: (() => {
          if (isRemake) return "#9ca3af";
          return matchData.player.win ? "#3b82f6" : "#ef4444";
        })(),
        borderLeft: "10px",
      }}
    >
      <Card
        sx={{
          backgroundColor: (() => {
            if (isRemake) return "#282830";
            return matchData.player.win ? "#28344f" : "#58343b";
          })(),
          minHeight: "140px",
        }}
      >
        <CardContent>
          <HStack justifyContent="space-between">
            <VStack spacing={0}>
              <Typography
                sx={{
                  color: (() => {
                    if (isRemake) return "#9ca3af";
                    return matchData.player.win ? "#3b82f6" : "#ef4444";
                  })(),
                }}
              >
                <strong>Ranked Solo/Duo</strong>
              </Typography>
              <Typography
                sx={{
                  color: "#8f94ad",
                }}
              >
                {timeAgo(matchData.match.game_end_timestamp)}
              </Typography>
              <Divider sx={{ backgroundColor: "#31313b" }} />
              <Typography
                sx={{
                  color: "#8f94ad",
                }}
              >
                <strong>
                  {isRemake
                    ? "Remake"
                    : matchData.player.win
                    ? "Victory"
                    : "Defeat"}
                </strong>
              </Typography>
              <Typography
                sx={{
                  color: "#8f94ad",
                }}
              >
                {mins}m {secs}s
              </Typography>
            </VStack>
            <VStack spacing={1}>
              <HStack>
                <Box sx={{ position: "relative" }}>
                  <Avatar
                    src={`${BASE_DD_URL}/img/champion/${matchData.player.champion_name}.png`}
                    variant="rounded"
                    sx={{
                      width: 56,
                      height: 56,
                    }}
                  />
                  <Typography
                    sx={{
                      position: "absolute",
                      bottom: 0,
                      right: 0,
                      backgroundColor: "#2b2d3d",
                      color: "white",
                      borderRadius: "50%",
                      padding: "0.1rem 0.3rem",
                      fontSize: "0.7rem",
                      minWidth: "14px",
                      minHeight: "14px",
                      textAlign: "center",
                      transform: "translate(50%, 50%)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {matchData.stats.champion_level}
                  </Typography>
                </Box>
                <HStack spacing={0.3}>
                  <VStack spacing={0.2}>
                    <Avatar
                      src={`${BASE_DD_URL}/img/spell/${summIdToName(
                        matchData.player.summoner_1
                      )}.png`}
                      variant="rounded"
                      sx={{
                        width: 20,
                        height: 20,
                      }}
                    />
                    <Avatar
                      src={`${BASE_DD_URL}/img/spell/${summIdToName(
                        matchData.player.summoner_2
                      )}.png`}
                      variant="rounded"
                      sx={{
                        width: 20,
                        height: 20,
                      }}
                    />
                  </VStack>
                  <VStack spacing={0.2}>
                    <Avatar
                      src={keystoneIdToLink(matchData.player.keystone)}
                      sx={{
                        width: 20,
                        height: 20,
                      }}
                    />
                    <Avatar
                      src={keystoneIdToLink(matchData.player.secondary_rune)}
                      variant="rounded"
                      sx={{
                        width: 20,
                        height: 20,
                      }}
                    />
                  </VStack>
                </HStack>
              </HStack>
              <HStack spacing={0.1}>
                {[0, 1, 2, 3, 4, 5].map((itemIndex) => (
                  <Avatar
                    key={itemIndex}
                    src={
                      matchData.player[`item${itemIndex}`] === 0
                        ? ""
                        : `${BASE_DD_URL}/img/item/${
                            matchData.player[`item${itemIndex}`]
                          }.png`
                    }
                    variant="rounded"
                    sx={{
                      width: 20,
                      height: 20,
                      backgroundColor:
                        matchData.player[`item${itemIndex}`] === 0
                          ? "rgba(0,0,0,0.3)"
                          : undefined,
                      border:
                        matchData.player[`item${itemIndex}`] === 0
                          ? "1px solid rgba(255,255,255,0.1)"
                          : "none",
                    }}
                  >
                    {" "}
                  </Avatar>
                ))}
                <Avatar
                  src={`${BASE_DD_URL}/img/item/${matchData.player.ward}.png`}
                  variant="rounded"
                  sx={{
                    width: 20,
                    height: 20,
                  }}
                />
              </HStack>
            </VStack>
            <VStack spacing={0.2}>
              <Typography
                variant="h6"
                sx={{
                  color: "#8f94ad",
                }}
              >
                {matchData.stats.kills}/
                <span style={{ color: "#ef4444" }}>
                  {matchData.stats.deaths}
                </span>
                /{matchData.stats.assists}
              </Typography>
              <Typography
                sx={{
                  color: "#8f94ad",
                  fontSize: "0.8rem",
                }}
              >
                {matchData.stats.jungle_monster_kills +
                  matchData.stats.minion_kills}{" "}
                CS (
                {(
                  (matchData.stats.jungle_monster_kills +
                    matchData.stats.minion_kills) /
                  mins
                ).toFixed(1)}
                /min)
              </Typography>
            </VStack>
            <VStack spacing={0.2}>
              {matchData.match.all_players
                .slice(0, 5)
                .map((player: string, index: number) => (
                  <Typography
                    fontWeight={player}
                    key={index}
                    sx={{ color: "#8f94ad", fontSize: "0.6rem" }}
                  >
                    {truncateText(player, 10)}
                  </Typography>
                ))}
            </VStack>
            <VStack spacing={0.2}>
              {matchData.match.all_players
                .slice(5, 10)
                .map((player: string, index: number) => (
                  <Typography
                    key={index}
                    sx={{ color: "#8f94ad", fontSize: "0.6rem" }}
                  >
                    {truncateText(player, 10)}
                  </Typography>
                ))}
            </VStack>
          </HStack>
        </CardContent>
      </Card>
    </Paper>
  );
};

export default Match;
