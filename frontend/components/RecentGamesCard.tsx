import React from "react";
import {
  Box,
  Card,
  CardContent,
  Container,
  Paper,
  Typography,
} from "@mui/material";
import WinLossPieChart from "./WinLossPieChart";
import VStack from "./VStack";

const RecentGamesCard = ({
  wins,
  losses,
  totalKills,
  totalAssists,
  totalDeaths,
  champions,
  roles,
}: {
  wins: number;
  losses: number;
  totalKills: number;
  totalAssists: number;
  totalDeaths: number;
  champions: object;
  roles: object;
}) => {
  return (
    <Container>
      <Paper
        elevation={1}
        sx={{
          display: "flex",
          marginLeft: "10px",
          marginRight: "10px",
          paddingLeft: "10px",
          borderLeft: "10px",
          flexGrow: 1,
          backgroundColor: "#3b3d4d",
        }}
      >
        <Card
          sx={{
            display: "flex",
            minHeight: "200px",
            flexGrow: 1,
            backgroundColor: "#2b2d3d",
          }}
        >
          <CardContent>
            <VStack spacing={0}>
              <Typography sx={{ color: "white" }}>
                {wins + losses}G {wins}W {losses}L
              </Typography>
              <WinLossPieChart wins={wins} losses={losses} />
            </VStack>
          </CardContent>
        </Card>
      </Paper>
    </Container>
  );
};

export default RecentGamesCard;
