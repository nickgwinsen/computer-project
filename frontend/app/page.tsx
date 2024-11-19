import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Button,
  Grid,
  Card,
  CardContent,
} from "@mui/material";

const HomePage = () => {
  return (
    <>
      {/* Make a header component and put it in the layout folder*/}
      <AppBar position="static" style={{ backgroundColor: "#2b2d3d" }}>
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }} color="#5383e9">
            League of Lookup
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Container style={{ marginTop: "20px", color: "#ffffff" }}>
        <Typography variant="h4" gutterBottom>
          Welcome to League of Lookup
        </Typography>
        <Typography variant="body1" paragraph>
          Find stats, rankings, and more for your favorite games.
        </Typography>

        {/* Grid of Cards */}
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4}>
            <Card style={{ backgroundColor: "#1e2029", color: "#ffffff" }}>
              <CardContent>
                <Typography variant="h5">League of Legends</Typography>
                <Typography variant="body2">
                  Explore your match history
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>

      {/* Footer */}
      <footer
        style={{
          backgroundColor: "#2b2d3d",
          padding: "10px",
          marginTop: "20px",
          textAlign: "center",
        }}
      >
        <Typography variant="body2">
          © 2024 OP.GG Clone. All Rights Reserved.
        </Typography>
      </footer>
    </>
  );
};

export default HomePage;
