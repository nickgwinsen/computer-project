"use client";
import { Typography, Card, CardContent } from "@mui/material";

const HomeCard = ({ title, body }: { title: string; body: string }) => {
  return (
    <Card
      sx={{
        backgroundColor: "#2b2d3d",
        padding: "1rem",
        color: "#fefff8",
      }}
    >
      <CardContent>
        <Typography variant="h6" gutterBottom>
          <strong>{title}</strong>
        </Typography>
        <Typography variant="body1">{body}</Typography>
      </CardContent>
    </Card>
  );
};

export default HomeCard;
