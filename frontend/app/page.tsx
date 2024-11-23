import React from "react";
import {
  Typography,
  Container,
  Card,
  CardContent,
  Grid2,
  TextField,
  IconButton,
  Paper,
  Box,
} from "@mui/material";
import SearchBar from "@/components/SearchBar";

const HomePage = () => {
  return (
    <>
      {/* Main Content */}
      <Container
        maxWidth="xl"
        sx={{
          marginTop: "20px",
          color: "#ffffff",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "left",
            marginBottom: "20px",
          }}
        >
          <Typography variant="h4" gutterBottom sx={{}}>
            <strong>Welcome to League of Lookup!</strong>
          </Typography>
        </Box>
        <Typography variant="body1" paragraph>
          Search your stats or a champion!
        </Typography>
        <SearchBar />
      </Container>
    </>
  );
};

export default HomePage;
