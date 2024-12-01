import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Avatar,
  Typography,
  Grid2,
  Divider,
} from "@mui/material";
import { BASE_DD_URL } from "@/config/constants";

interface Champion {
  name: string;
  games: number;
  wins: number;
  losses: number;
  cs: number;
  kills: number;
  deaths: number;
  assists: number;
}

const ChampionStatistics = ({
  champions,
}: {
  champions: Record<string, Champion>;
}) => {
  const championsArray = Object.entries(champions).map(([name, stats]) => ({
    name,
    games: stats.games,
    wins: stats.wins,
    losses: stats.losses,
    cs: stats.cs,
    kills: stats.kills,
    deaths: stats.deaths,
    assists: stats.assists,
  }));

  const sortedChampions = championsArray
    .sort((a, b) => b.games - a.games)
    .slice(0, 5);

  return (
    <Card
      sx={{
        backgroundColor: "#2b2d3d",
        color: "white",
        marginTop: "1rem",
        minWidth: "400px",
      }}
    >
      <CardHeader title="Most Played Champions" />
      <CardContent>
        {sortedChampions.map((champion, index) => {
          const winRate = ((champion.wins / champion.games) * 100).toFixed(2);
          const avgCs = (champion.cs / champion.games).toFixed(1);
          const kda = (
            (champion.kills + champion.assists) /
            Math.max(1, champion.deaths)
          ).toFixed(2);
          return (
            <div key={champion.name}>
              <Grid2 container spacing={2} alignItems="center">
                <Grid2>
                  <Avatar
                    variant="rounded"
                    src={`${BASE_DD_URL}/img/champion/${champion.name}.png`}
                    alt={champion.name}
                    sx={{ width: 56, height: 56 }}
                  />
                </Grid2>
                <Grid2>
                  <Typography variant="h6">{champion.name}</Typography>
                  <Typography variant="body2">
                    Games: {champion.games} ({champion.wins}W/{champion.losses}
                    L)
                  </Typography>
                  <Typography variant="body2">
                    Win Rate: {winRate}% | CS/Game: {avgCs}
                  </Typography>
                  <Typography variant="body2">
                    KDA: {kda} ({champion.kills}/{champion.deaths}/
                    {champion.assists})
                  </Typography>
                </Grid2>
              </Grid2>
              {index < sortedChampions.length - 1 && (
                <Divider
                  sx={{
                    backgroundColor: "#fff",
                    marginTop: "1rem",
                    marginBottom: "1rem",
                  }}
                />
              )}
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};

export default ChampionStatistics;
