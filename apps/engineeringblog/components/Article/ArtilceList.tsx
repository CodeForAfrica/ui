"use client";

import { Section } from "@commons-ui/core";
import { Grid } from "@mui/material";
import React from "react";
import ArticleCard from "./ArticleCard";

type Article = {
  slug: string;
  title: string;
  description: string;
  date: string;
  featuredImage: string;
  content: string;
};

export type ArticleCardProps = {
  articles: Article[];
};

const ArtilceList = React.forwardRef(function ArtilceList(
  props: ArticleCardProps,
  ref: React.Ref<HTMLDivElement>,
) {
  const { articles } = props;
  return (
    <Section ref={ref}>
      <Grid
        container
        rowSpacing={{ xs: "28px", md: 5 }}
        columnSpacing={{ xs: 0, sm: "18px", lg: "28px" }}
      >
        {articles?.map((article) => (
          <Grid item xs={12} sm={4} key={article.slug}>
            <ArticleCard article={article} />
          </Grid>
        ))}
      </Grid>
    </Section>
  );
});

export default ArtilceList;
