import React from "react";
import { Card, CardContent, Container, Paper, Typography } from "@mui/material";
import { BarChart } from "@mui/x-charts";
import WinLossPieChart from "./WinLossPieChart";
import HStack from "./HStack";
import VStack from "./VStack";

interface RoleStats {
  games: number;
  wins: number;
  losses: number;
}

const RecentGamesCard = ({
  wins,
  losses,
  totalKills,
  totalAssists,
  totalDeaths,
  roles,
}: {
  wins: number;
  losses: number;
  totalKills: number;
  totalAssists: number;
  totalDeaths: number;
  champions: object;
  roles: Record<string, RoleStats>;
}) => {
  const roleData = Object.entries(roles).map(([role, stats]) => ({
    role,
    games: stats.games,
  }));

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
            <HStack spacing={7}>
              <VStack spacing={0}>
                <Typography sx={{ color: "white" }}>
                  {wins + losses}G {wins}W {losses}L
                </Typography>
                <WinLossPieChart wins={wins} losses={losses} />
              </VStack>
              <VStack>
                <Typography variant="h6" sx={{ color: "white" }}>
                  <strong>
                    {((totalKills + totalAssists) / totalDeaths).toFixed(2)}: 1
                  </strong>
                </Typography>
                <Typography sx={{ color: "white" }}>
                  {(totalKills / 20).toFixed(1)}/
                  <span style={{ color: "#ef4444" }}>
                    {(totalDeaths / 20).toFixed(1)}
                  </span>
                  /{(totalAssists / 20).toFixed(1)}
                </Typography>
              </VStack>
              <BarChart
                dataset={roleData}
                xAxis={[{ scaleType: "band", dataKey: "role" }]}
                yAxis={[{}]}
                series={[{ dataKey: "games", color: "#8884d8" }]}
                width={300}
                height={200}
                sx={{
                  ".MuiChartsAxis-line": {
                    color: "white",
                    stroke: "none",
                  },
                  ".MuiChartsAxis-tick": {
                    color: "white",
                    stroke: "none",
                  },
                }}
              />
            </HStack>
          </CardContent>
        </Card>
      </Paper>
    </Container>
  );
};

export default RecentGamesCard;
