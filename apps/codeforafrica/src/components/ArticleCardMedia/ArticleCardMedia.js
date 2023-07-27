import { CardMedia } from "@mui/material";
import { styled } from "@mui/material/styles";
import React from "react";

const ArticleCardMediaRoot = styled(CardMedia)({
  filter: "contrast(60%) sepia(100%) hue-rotate(190deg) saturate(500%)",
});

const ArticleCardMedia = React.forwardRef(
  function ArticleCardMedia(props, ref) {
    return <ArticleCardMediaRoot component="img" {...props} ref={ref} />;
  },
);

export default ArticleCardMedia;
