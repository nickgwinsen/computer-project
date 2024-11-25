"use client";
import { IRiotAccount } from "@/app/(api)/riot/riot.types";
import { BASE_DD_URL } from "@/config/constants";
import { Avatar, Box, Typography, Grid2, Divider } from "@mui/material";
import { PieChart } from "@mui/x-charts";
import WinLossPieChart from "./WinLossPieChart";

const User = ({ data }: { data: IRiotAccount }) => {
  const username = data.riot_id.split("#")[0];
  const tag = data.riot_id.split("#")[1];

  return (
    <Grid2 container spacing={3} sx={{ padding: 2 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          width: "100%",
          marginBottom: "1rem",
        }}
      >
        <Grid2 sx={{ paddingBottom: "1rem" }}>
          <Box sx={{ position: "relative" }}>
            <Avatar
              src={`${BASE_DD_URL}/img/profileicon/${data.profile_icon_id}.png`}
              sx={{
                width: 120,
                height: 120,
                border: "3px solid #2b2d3d",
              }}
            />
            <Typography
              sx={{
                position: "absolute",
                bottom: -10,
                left: "50%",
                transform: "translateX(-50%)",
                backgroundColor: "#2b2d3d",
                color: "white",
                borderRadius: "12px",
                padding: "0.2rem 0.8rem",
                fontSize: "0.9rem",
                minWidth: "40px",
                textAlign: "center",
              }}
            >
              {data.summoner_level}
            </Typography>
          </Box>
        </Grid2>
        <Grid2>
          <Box sx={{ paddingBottom: "1rem" }}>
            <Typography variant="h5">
              {username}
              <span style={{ color: "#9f9fab" }}>#{tag}</span>
            </Typography>
          </Box>
        </Grid2>
        <Divider flexItem sx={{ backgroundColor: "#31313b" }} />
      </Box>
    </Grid2>
  );
};

export default User;
