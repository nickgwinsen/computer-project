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
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const HomePage = () => {
  return (
    <>
      {/* Main Content */}
      <Container style={{ marginTop: "20px", color: "#ffffff" }}>
        <Typography variant="h4" gutterBottom>
          Welcome to League of Lookup
        </Typography>
        <Typography variant="body1" paragraph>
          Find stats, rankings, and more for your favorite games.
        </Typography>

        <Card
          sx={{
            backgroundColor: "#3b3d4d",
            color: "#ffffff",
            borderRadius: "25px",
          }}
        >
          <CardContent>
            <TextField
              variant="outlined"
              fullWidth
              placeholder="Search for a game..."
              sx={{ backgroundColor: "#2b2d3d", color: "#ffffff" }}
            />
            <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
              <SearchIcon />
            </IconButton>
          </CardContent>
        </Card>
      </Container>
    </>
  );
};

export default HomePage;
