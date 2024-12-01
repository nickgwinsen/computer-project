import React from "react";
import Box from "@mui/material/Box";

interface HStackProps {
  children: React.ReactNode;
  spacing?: number;
  justifyContent?:
    | "flex-start"
    | "center"
    | "flex-end"
    | "space-between"
    | "space-around"
    | "space-evenly";
  alignItems?: "flex-start" | "center" | "flex-end" | "stretch" | "baseline";
}

const HStack: React.FC<HStackProps> = ({
  children,
  spacing = 2,
  justifyContent = "flex-start",
  alignItems = "center",
}) => {
  return (
    <Box
      display="flex"
      flexDirection="row"
      justifyContent={justifyContent}
      alignItems={alignItems}
      gap={spacing}
    >
      {children}
    </Box>
  );
};

export default HStack;
