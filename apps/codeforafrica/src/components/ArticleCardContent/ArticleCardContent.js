import { CardContent } from "@mui/material";
import { styled } from "@mui/material/styles";
import React from "react";

const ArticleCardContentRoot = styled(CardContent)(({ theme }) => ({
  padding: theme.typography.pxToRem(24),
}));

const ArticleCardContent = React.forwardRef(function ArticleCardContent(
  props,
  ref
) {
  return <ArticleCardContentRoot {...props} ref={ref} />;
});

export default ArticleCardContent;
