import React from "react";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";

interface RankedCardProps {
  rankImage: string;
  rankTitle: string;
  lp: number;
  wins: number;
  losses: number;
}

const RankedCard: React.FC<RankedCardProps> = ({
  rankImage,
  rankTitle,
  lp,
  wins,
  losses,
}) => {
  const winRate = ((wins / (wins + losses)) * 100).toFixed(2);

  return (
    <Card className="ranked-card">
      {/* <CardMedia
        component="img"
        height="140"
        image={rankImage}
        alt={rankTitle}
        className="rank-image"
      /> */}
      <CardContent>
        <Typography variant="h5" component="div" className="rank-title">
          {rankTitle}
        </Typography>
        <Typography variant="body2" color="text.secondary" className="lp">
          LP: {lp}
        </Typography>
        <Typography variant="body2" color="text.secondary" className="wins">
          Wins: {wins}
        </Typography>
        <Typography variant="body2" color="text.secondary" className="losses">
          Losses: {losses}
        </Typography>
        <Typography variant="body2" color="text.secondary" className="win-rate">
          Win Rate: {winRate}%
        </Typography>
      </CardContent>
    </Card>
  );
};

export default RankedCard;
