import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Avatar,
  Typography,
  Grid,
} from "@mui/material";

interface Teammate {
  id: number;
  name: string;
  profilePicture: string;
  level: number;
  wins: number;
  losses: number;
  gamesPlayed: number;
  winLossPercentage: number;
}

interface RecentTeammatesCardProps {
  teammates: Teammate[];
}

const RecentTeammatesCard: React.FC<RecentTeammatesCardProps> = ({
  teammates,
}) => {
  return (
    <Card>
      <CardHeader title="Recent Teammates" />
      <CardContent>
        <Grid container spacing={2}>
          {teammates.map((teammate) => (
            <Grid item xs={12} sm={6} md={4} key={teammate.id}>
              <Card>
                <CardHeader
                  avatar={<Avatar src={teammate.profilePicture} />}
                  title={teammate.name}
                  subheader={`Level ${teammate.level}`}
                />
                <CardContent>
                  <Typography variant="body2">Wins: {teammate.wins}</Typography>
                  <Typography variant="body2">
                    Losses: {teammate.losses}
                  </Typography>
                  <Typography variant="body2">
                    Games Played: {teammate.gamesPlayed}
                  </Typography>
                  <Typography variant="body2">
                    Win/Loss %: {teammate.winLossPercentage.toFixed(2)}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default RecentTeammatesCard;
