import { Box } from "@mui/material";
import { alpha, styled } from "@mui/material/styles";
import React from "react";

import bg from "@/codeforafrica/assets/images/1920x668px bg - 2 2.png";

const TwoToneBackgroundRoot = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  width: "100%",
  position: "relative",
  backgroundColor: theme.palette.background.main,
  backgroundImage: `url('${bg.src}')`,
  backgroundPosition: "top left",
  "&:before": {
    content: '""',
    top: 0,
    left: 0,
    position: "absolute",
    height: "100%",
    width: "100%",
    background: `linear-gradient(to right, ${theme.palette.background.main}, transparent 30%)`,
    [theme.breakpoints.up("sm")]: {
      background: `linear-gradient(to right, ${theme.palette.background.main} 20%, transparent 30%)`,
    },
    [theme.breakpoints.up("md")]: {
      background: `linear-gradient(to right, ${
        theme.palette.background.main
      } 30%, transparent 40%, transparent 95%, ${alpha(
        theme.palette.background.main,
        0.7
      )} 98%)`,
    },
    [theme.breakpoints.up("lg")]: {
      background: `linear-gradient(to right, ${theme.palette.background.main} 30%, transparent 40%, transparent 95%, ${theme.palette.background.main} 99%)`,
    },
    [theme.breakpoints.up("xl")]: {
      background: `linear-gradient(to right, ${theme.palette.background.main} 35%, transparent 45%, transparent 80%, ${theme.palette.background.main} 90%)`,
    },
  },
}));

const TwoToneBackground = React.forwardRef(function TwoToneBackground(
  props,
  ref
) {
  return <TwoToneBackgroundRoot {...props} ref={ref} />;
});

export default TwoToneBackground;
