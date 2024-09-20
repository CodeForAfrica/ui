"use client";

import { Section } from "@commons-ui/core";
import React from "react";

import Markdown from "@/techlabblog/components/Markdown";
import type { ArticleSxProps } from "./ArticleSxProps";
import ArticleHeader from "./ArticleHeader";

const Article = React.forwardRef(function Article(
  props: ArticleSxProps,
  ref: React.Ref<HTMLDivElement>,
) {
  const { content, excerpt, publishedDate, sx, title } = props;

  return (
    <Section
      component="article"
      sx={{
        px: { xs: 2.5, sm: 0 },
        py: 2.5,
        maxWidth: {
          sm: "648px",
          md: "912px",
        },
        ...sx,
      }}
      ref={ref}
    >
      <ArticleHeader
        excerpt={excerpt}
        publishedDate={publishedDate}
        title={title}
      />
      <Markdown markdown={content} />
    </Section>
  );
});

export default Article;
