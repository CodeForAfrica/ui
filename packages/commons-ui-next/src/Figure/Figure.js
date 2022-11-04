import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import Image from "next/image";
import React from "react";

const FigureRoot = styled(Box)({
  position: "relative",
  margin: 0,
});

const ImageRoot = styled(Image)({
  objectFit: "contain",
});

const Figure = React.forwardRef(function Figure(props, ref) {
  const { component: componentProp, sx, ImageProps } = props;
  const component = componentProp || "figure";

  return (
    <FigureRoot component={component} sx={sx} ref={ref}>
      <ImageRoot fill {...ImageProps} />
    </FigureRoot>
  );
});

export default Figure;
