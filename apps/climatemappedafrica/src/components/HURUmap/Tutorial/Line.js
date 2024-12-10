import { Box, useTheme } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";

function Line({ x1, x2, y1, y2 }) {
  const theme = useTheme();

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 9999999,
        pointerEvents: "none",
      }}
    >
      <svg height="100vh" width="100vw">
        <line
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          style={{
            strokeWidth: theme.typography.pxToRem(1),
            stroke: theme.palette.primary.main,
            fill: theme.palette.primary.main,
          }}
        />
        <circle cx={x2} cy={y2} r="9" strokeWidth={2} stroke="white" />
      </svg>
    </Box>
  );
}

Line.propTypes = {
  x1: PropTypes.number.isRequired,
  y1: PropTypes.number.isRequired,
  x2: PropTypes.number.isRequired,
  y2: PropTypes.number.isRequired,
};

export default Line;
