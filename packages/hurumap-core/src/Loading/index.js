import { Box, CircularProgress } from "@mui/material";
import React from "react";

function Loading() {
  return (
    <Box
      sx={({ typography }) => ({
        display: "flex",
        justifyContent: "center",
        height: typography.pxToRem(50),
      })}
    >
      <CircularProgress />
    </Box>
  );
}

export default Loading;
