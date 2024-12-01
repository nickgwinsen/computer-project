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

// Define the Teammate interface
export interface Teammate {
  name: string;
  gamesPlayed: number;
  wins: number;
  losses: number;
}

const RecentTeammatesCard = ({
  teammates,
}: {
  teammates: Record<string, { games: number; wins: number; losses: number }>;
}) => {
  const teammatesArray = Object.entries(teammates).map(([name, stats]) => ({
    name,
    gamesPlayed: stats.games,
    wins: stats.wins,
    losses: stats.losses,
  }));

  const sortedTeammates = teammatesArray
    .sort((a, b) => b.gamesPlayed - a.gamesPlayed)
    .slice(1, 6);

  return (
    <Card
      sx={{
        backgroundColor: "#2b2d3d",
        color: "white",
        marginTop: "1rem",
        minWidth: "400px",
      }}
    >
      <CardHeader title="Recent Teammates" />
      <CardContent>
        {sortedTeammates.map((teammate, index) => {
          const winRate = (
            (teammate.wins / teammate.gamesPlayed) *
            100
          ).toFixed(2);
          return (
            <>
              <Grid2 container spacing={2} key={index} alignItems="center">
                <Grid2 columnSpacing={2}>
                  <Typography variant="h6">{teammate.name}</Typography>
                  <Typography variant="body2">
                    Games Played: {teammate.gamesPlayed}
                  </Typography>
                  <Typography variant="body2">
                    Wins: {teammate.wins} Losses: {teammate.losses}
                  </Typography>
                  <Typography variant="body2">Win Rate: {winRate}%</Typography>
                </Grid2>
              </Grid2>
              <Divider
                sx={{
                  backgroundColor: "#fff",
                  marginTop: "1rem",
                  marginBottom: "1rem",
                }}
              />
            </>
          );
        })}
      </CardContent>
    </Card>
  );
};

export default RecentTeammatesCard;
