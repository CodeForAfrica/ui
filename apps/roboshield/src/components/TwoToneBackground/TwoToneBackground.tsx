import { Box } from "@mui/material";
import { alpha, styled, Theme } from "@mui/material/styles";
import React from "react";

import bg from "@/roboshield/assets/images/1920x668px bg - 2 2.png";

const TwoToneBackgroundRoot = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  width: "100%",
  position: "relative",
  backgroundColor: theme.palette.background.default,
  backgroundImage: `url('${bg.src}')`,
  backgroundPosition: "top left",
  "&:before": {
    content: '""',
    top: 0,
    left: 0,
    position: "absolute",
    height: "100%",
    width: "100%",
    background: `linear-gradient(to right, ${theme.palette.background.default}, transparent 30%)`,
    [theme.breakpoints.up("sm")]: {
      background: `linear-gradient(to right, ${theme.palette.background.default} 20%, transparent 30%)`,
    },
    [theme.breakpoints.up("md")]: {
      background: `linear-gradient(to right, ${
        theme.palette.background.default
      } 30%, transparent 40%, transparent 95%, ${alpha(
        theme.palette.background.default,
        0.7,
      )} 98%)`,
    },
    [theme.breakpoints.up("lg")]: {
      background: `linear-gradient(to right, ${theme.palette.background.default} 30%, transparent 40%, transparent 95%, ${theme.palette.background.default} 99%)`,
    },
    [theme.breakpoints.up("xl")]: {
      background: `linear-gradient(to right, ${theme.palette.background.default} 35%, transparent 45%, transparent 80%, ${theme.palette.background.default} 90%)`,
    },
  },
}));

interface Props {
  children: React.ReactNode;
  sx: any;
}

const TwoToneBackground = React.forwardRef(function TwoToneBackground(
  { children, ...props }: Props,
  _ref,
) {
  return <TwoToneBackgroundRoot {...props}>{children}</TwoToneBackgroundRoot>;
});

export default TwoToneBackground;
