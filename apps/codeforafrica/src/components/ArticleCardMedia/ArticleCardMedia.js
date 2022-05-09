import CardMedia from "@mui/material/CardMedia";
import { styled } from "@mui/material/styles";
import React from "react";

const ArticleCardMediaRoot = styled(CardMedia)({});

const ImageContainer = styled("div")({
  position: "relative",
  "::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    height: "100%",
    width: "100%",
    background: `rgba(16,32,225, 0.3)`,
    zIndex: 999,
  },
});

const ArticleCardMedia = React.forwardRef(function ArticleCardMedia(
  props,
  ref
) {
  return (
    <ImageContainer>
      <ArticleCardMediaRoot component="img" {...props} ref={ref} />
    </ImageContainer>
  );
});

export default ArticleCardMedia;
