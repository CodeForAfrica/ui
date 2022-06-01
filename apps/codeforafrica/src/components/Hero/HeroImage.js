import { styled } from "@mui/material/styles";
import Image from "next/image";
import React from "react";

const HeroFigureRoot = styled("figure")(({ theme }) => ({
  position: "relative",
  margin: 0,
  display: "none",
  [theme.breakpoints.up("sm")]: {
    display: "block",
    height: "258px",
    width: "258px",
  },
  [theme.breakpoints.up("md")]: {
    height: "370px",
    width: "370px",
  },
  [theme.breakpoints.up("lg")]: {
    height: "498px",
    width: "498px",
  },
}));

const HeroFigure = React.forwardRef(function HeroFigure(props, ref) {
  return (
    <HeroFigureRoot ref={ref}>
      <Image objectFit="contain" layout="fill" {...props} />
    </HeroFigureRoot>
  );
});

export default HeroFigure;
