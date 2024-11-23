import React from "react";
import { Box, Typography } from "@mui/material";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#2b2d3d",
        padding: "10px",
        width: "100%",
        textAlign: "center",
        marginTop: "auto", // pushes footer to bottom
      }}
    >
      <Typography variant="body2" color="#3b82f6">
        League of Lookup
      </Typography>
    </Box>
  );
}
