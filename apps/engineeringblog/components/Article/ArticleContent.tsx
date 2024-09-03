"use client";
import { Section } from "@commons-ui/core";
import React from "react";
import { Figure } from "@commons-ui/next";
import { Box } from "@mui/material";
import ArticleHeader from "./ArticleHeader";
import { Article } from "@/engineeringblog/utils";
import Markdown from "@/engineeringblog/components/Markdown";
const ArticleContent = React.forwardRef(function ArticleContent(
  {
    article,
  }: {
    article: Article;
  },
  ref: React.Ref<HTMLDivElement>,
) {
  const { title, description, featuredImage, date, content } = article;

  return (
    <Box ref={ref}>
      <Figure
        ImageProps={{
          alt: title,
          sx: { objectFit: "cover" },
          src: featuredImage,
        }}
        sx={{
          width: "100%",
          height: { xs: "163px", md: "600px" },
        }}
      />
      <ArticleHeader date={date} excerpt={description} title={title} sx={{}} />
      <Section
        component="header"
        sx={{
          px: { xs: 2.5, sm: 0 },
          py: 2.5,
          maxWidth: {
            sm: "648px",
            md: "912px",
          },
        }}
        ref={ref}
      >
        <Markdown markdown={content} />
      </Section>
    </Box>
  );
});

export default ArticleContent;
