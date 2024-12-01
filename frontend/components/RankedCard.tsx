import React from "react";
import { Avatar, Card, CardContent, Typography } from "@mui/material";
import VStack from "./VStack";
import HStack from "./HStack";

interface RankedCardProps {
  tier: string;
  rank: string;
  lp: number;
  wins: number;
  losses: number;
}

const RankedCard = ({ tier, rank, lp, wins, losses }: RankedCardProps) => {
  const winRate = ((wins / (wins + losses)) * 100).toFixed(2);
  console.log(tier.toLowerCase());
  return (
    <Card
      className="ranked-card"
      sx={{
        width: "100%",
        backgroundColor: "#2b2d3d",
        minWidth: "400px",
      }}
    >
      <CardContent>
        <Typography variant="h6" color="white">
          Ranked
        </Typography>
        <HStack spacing={2}>
          <Avatar
            src={`/static/${tier.toLowerCase()}.png`}
            sx={{
              width: 100,
              height: 100,
              backgroundColor: "#363642",
            }}
          />
          <VStack spacing={0}>
            <Typography
              variant="h5"
              component="div"
              className="rank-title"
              color="white"
              sx={{
                fontSize: "1rem",
              }}
            >
              <strong>
                {tier} {rank}
              </strong>
            </Typography>
            <Typography variant="body2" color="white" className="lp">
              LP: {lp}
            </Typography>
          </VStack>
          <VStack spacing={0}>
            <Typography variant="body2" color="white" className="wins">
              {wins}W {losses}L
            </Typography>

            <Typography variant="body2" color="white" className="win-rate">
              Win Rate: {winRate}%
            </Typography>
          </VStack>
        </HStack>
      </CardContent>
    </Card>
  );
};

export default RankedCard;
