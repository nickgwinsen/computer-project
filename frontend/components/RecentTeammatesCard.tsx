import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Avatar,
  Typography,
  Grid2,
} from "@mui/material";

export interface Teammate {
  gamesPlayed: number;
  wins: number;
  losses: number;
}

const RecentTeammatesCard = ({ teammates }: { teammates: Teammate[] }) => {
  console.log("Teammates:", teammates);
  const sortedTeammates = Array.isArray(teammates)
    ? teammates.sort((a, b) => b.gamesPlayed - a.gamesPlayed).slice(0, 5)
    : [];

  console.log(sortedTeammates);

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
            <Grid2 container spacing={2} key={index} alignItems="center">
              <Grid2>
                <Avatar>{teammate.name.charAt(0)}</Avatar>
              </Grid2>
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
          );
        })}
      </CardContent>
    </Card>
  );
};

export default RecentTeammatesCard;
