"use client";

import { Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import React from "react";

import type { ArticleSxProps } from "./ArticleSxProps";

type ArticleHeaderSxProps = Omit<
  ArticleSxProps,
  "content" | "featuredImage" | "slug"
>;

const ArticleHeaderRoot = styled("header")({});

const ArticleHeader = React.forwardRef(function ArticleHeader(
  props: ArticleHeaderSxProps,
  ref: React.Ref<HTMLDivElement>,
) {
  const { publishedDate, excerpt, sx, title } = props;

  return (
    <ArticleHeaderRoot sx={sx} ref={ref}>
      <Typography
        component="div"
        variant="body2"
        sx={{ mt: { xs: 2.5, md: 7.5 } }}
      >
        {publishedDate}
      </Typography>
      <Typography component="div" variant="h1" sx={{ mt: { xs: 2.5, md: 5 } }}>
        {title}
      </Typography>
      <Typography
        component="div"
        variant="body1"
        sx={{
          color: "primary.main",
          mt: { xs: 2.5, md: 5 },
          typography: { md: "subheading" },
        }}
      >
        {excerpt}
      </Typography>
    </ArticleHeaderRoot>
  );
});

export default ArticleHeader;
