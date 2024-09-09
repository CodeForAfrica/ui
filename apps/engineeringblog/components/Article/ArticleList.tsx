"use client";

import { Section } from "@commons-ui/core";
import { Grid } from "@mui/material";
import React from "react";
import ArticleCard from "./ArticleCard";
import { ArticleWithoutContent } from "@/engineeringblog/utils";

const ArticleList = React.forwardRef(function ArtilceList(
  {
    articles,
  }: {
    articles: ArticleWithoutContent[];
  },
  ref: React.Ref<HTMLDivElement>,
) {
  return (
    <Section ref={ref}>
      <Grid
        container
        rowSpacing={{ xs: "28px", md: 5 }}
        columnSpacing={{ xs: 0, sm: "18px", lg: "28px" }}
      >
        {articles?.map((article) => (
          <Grid item xs={12} sm={4} key={article.slug}>
            <ArticleCard {...article} />
          </Grid>
        ))}
      </Grid>
    </Section>
  );
});

export default ArticleList;
