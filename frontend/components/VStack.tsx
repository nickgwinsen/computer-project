import React from "react";
import Box from "@mui/material/Box";

interface VStackProps {
  children: React.ReactNode;
  spacing?: number;
  alignItems?: string;
  justifyContent?: string;
}

const VStack: React.FC<VStackProps> = ({
  children,
  spacing = 2,
  alignItems = "stretch",
  justifyContent = "flex-start",
}) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems={alignItems}
      justifyContent={justifyContent}
      gap={spacing}
    >
      {children}
    </Box>
  );
};

export default VStack;
