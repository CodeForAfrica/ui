import CardMedia from "@mui/material/CardMedia";
import { styled } from "@mui/material/styles";
import React from "react";

const ArticleCardMediaRoot = styled(CardMedia)({});

const ArticleCardMedia = React.forwardRef(function ArticleCardMedia(
  props,
  ref
) {
  return <ArticleCardMediaRoot component="img" {...props} ref={ref} />;
});

export default ArticleCardMedia;
