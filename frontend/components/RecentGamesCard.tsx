import React from "react";
import { Box, Card, CardContent, Container, Paper } from "@mui/material";
import WinLossPieChart from "./WinLossPieChart";

const RecentGamesCard: React.FC = () => {
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
        }}
      >
        <Card
          sx={{
            display: "flex",
            minHeight: "200px",
            flexGrow: 1,
          }}
        >
          <CardContent>
            <Box>
              <WinLossPieChart wins={10} losses={10} />
            </Box>
          </CardContent>
        </Card>
      </Paper>
    </Container>
  );
};

export default RecentGamesCard;
