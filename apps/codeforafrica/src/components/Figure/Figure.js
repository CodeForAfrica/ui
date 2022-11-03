import { styled } from "@mui/material/styles";
import Image from "next/image";
import React from "react";

const FigureRoot = styled("figure")({
  position: "relative",
  margin: 0,
});

const ImageRoot = styled(Image)({
  objectFit: "contain",
});

const Figure = React.forwardRef(function Figure(props, ref) {
  const { sx, ImageProps } = props;

  return (
    <FigureRoot sx={sx} ref={ref}>
      <ImageRoot fill {...ImageProps} />
    </FigureRoot>
  );
});

export default Figure;
