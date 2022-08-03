import { styled } from "@mui/material/styles";
import Image from "next/image";
import React from "react";

const FigureRoot = styled("figure")({
  position: "relative",
  margin: 0,
});

const Figure = React.forwardRef(function Figure(props, ref) {
  const { sx, ...other } = props;
  const loaderProp = ({ src }) => {
    return src;
  };

  return (
    <FigureRoot sx={sx} ref={ref}>
      <Image loader={loaderProp} objectFit="contain" layout="fill" {...other} />
    </FigureRoot>
  );
});

export default Figure;
