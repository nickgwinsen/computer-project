import React from "react";
import { Box, Typography } from "@mui/material";

export default function Footer() {
  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
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
    </Box>
  );
}
