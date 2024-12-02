import React from "react";
import { Typography, Container, Box } from "@mui/material";
import SearchBar from "@/components/SearchBar";
import HomeCard from "@/components/HomeCard";
import VStack from "@/components/VStack";
import Image from "next/image";

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
            flexDirection: "column",
          }}
        >
          <Typography variant="h4" gutterBottom sx={{}}>
            <strong>Welcome to League of Lookup!</strong>
          </Typography>
          <Typography variant="body1">
            Search your stats or a champion!
          </Typography>
        </Box>
        <SearchBar />
        <VStack spacing={2} alignItems="center">
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              marginTop: "50px",
              gap: "1rem",
            }}
          >
            <HomeCard
              title="Get Insights on your games!"
              body="Check out your own stats and see the ways that you're winning."
            />
            <HomeCard
              title="See your most played champions!"
              body="Check out who you play, and how you're doing with them."
            />
            <HomeCard
              title="Keep track of your friends!"
              body="Find out how your friends are doing in their recent games."
            />
          </Box>
          <Image src="/static/ziggs.png" alt="Ziggs" width={400} height={400} />
        </VStack>
      </Container>
    </>
  );
};

export default HomePage;
