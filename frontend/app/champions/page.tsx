"use client";
import axiosInstance from "@/config/axios";
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Avatar, Box, TextField } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { BASE_DD_URL } from "@/config/constants";
import CircularProgress from "@mui/material/CircularProgress";

interface Champion {
  id: number;
  champion_name: string;
  wins: number;
  losses: number;
}

const ChampionsPage = () => {
  const [searchQuery, setSearchQuery] = React.useState("");

  const {
    data: champions,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["champions"],
    queryFn: async () => {
      const response = await axiosInstance.get("/riot/champions");
      return response.data;
    },
  });

  const getChampionPicture = (name: string) => {
    if (name == "FiddleSticks") {
      name = "Fiddlesticks";
    }
    return `${BASE_DD_URL}/img/champion/${name}.png`;
  };

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (isError) {
    return <div>Error loading champions</div>;
  }

  const filteredChampions = champions.filter((champion: Champion) =>
    champion.champion_name.toLowerCase().startsWith(searchQuery.toLowerCase())
  );

  const sortedChampions = filteredChampions.sort((a: Champion, b: Champion) => {
    const winrateA = a.wins / (a.wins + a.losses);
    const winrateB = b.wins / (b.wins + b.losses);
    return winrateB - winrateA;
  });

  return (
    <Box sx={{ marginTop: 4, marginBottom: 4 }}>
      <TextField
        label="Search Champion"
        variant="outlined"
        fullWidth
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        sx={{
          marginBottom: 2,
          backgroundColor: "#2b2d3d",
          borderRadius: "10px",
          color: "white",
        }}
        InputLabelProps={{
          style: { color: "white" },
        }}
        InputProps={{
          style: { color: "white" },
        }}
      />
      <TableContainer
        component={Paper}
        sx={{
          backgroundColor: "#2b2d3d",
        }}
      >
        <Table sx={{ minWidth: 400 }} aria-label="champions table">
          <TableHead>
            <TableRow>
              <TableCell
                sx={{ color: "white", borderBottom: "1px solid black" }}
              >
                Champion
              </TableCell>
              <TableCell
                align="right"
                sx={{ color: "white", borderBottom: "1px solid black" }}
              >
                Winrate
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedChampions.map((row: Champion) => (
              <TableRow
                key={row.champion_name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row" sx={{ color: "white" }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Avatar
                      src={getChampionPicture(row.champion_name)}
                      variant="rounded"
                      sx={{ width: 56, height: 56 }}
                    />
                    {row.champion_name}
                  </Box>
                </TableCell>
                <TableCell align="right" sx={{ color: "white" }}>
                  {((row.wins / (row.wins + row.losses)) * 100).toFixed(1) ?? 0}
                  %
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ChampionsPage;
