import { styled } from "@mui/material/styles";
import Image from "next/image";
import React from "react";

const FigureRoot = styled("figure")({
  position: "relative",
  margin: 0,
});

const Figure = React.forwardRef(function Figure(props, ref) {
  const { sx, ...other } = props;

  return (
    <FigureRoot sx={sx} ref={ref}>
      <Image objectFit="contain" layout="fill" {...other} />
    </FigureRoot>
  );
});

export default Figure;
