import { Section } from "@commons-ui/core";
import { RichTypography } from "@commons-ui/next";
import { Grid } from "@mui/material";
import React from "react";

import ArticleCardList from "@/codeforafrica/components/ArticleCardList";
import FeaturedArticle from "@/codeforafrica/components/FeaturedArticle";
import FilterBar from "@/codeforafrica/components/FilterBar";

const ArticleGrid = React.forwardRef(function ArticleGrid(props, ref) {
  const {
    articles,
    featuredArticle,
    onChangeTag,
    onChangeQ,
    q,
    selectedTag,
    sx,
    tags,
    title,
    searchLabel,
    readMoreLabel,
    ...other
  } = props;

  return (
    <Section sx={{ px: { xs: "20px", sm: 0 }, ...sx }} {...other} ref={ref}>
      <Grid container sx={{ py: { xs: "28px", md: 8, lg: "105.29px" } }}>
        <Grid item xs={12} sx={{ order: { xs: 0, md: 1 } }}>
          {/* title is below featuredArticle in md and above hence needs margin-top */}
          <RichTypography
            variant="h4"
            sx={{
              mb: "10px",
              mt: {
                md: featuredArticle?.id ? 5 : 0,
              },
            }}
          >
            {title}
          </RichTypography>
          <FilterBar
            onChangeQ={onChangeQ}
            onChangeTag={onChangeTag}
            q={q}
            tag={selectedTag}
            tags={tags}
            SearchInputProps={{
              placeholder: searchLabel,
            }}
            sx={{
              mb: { xs: 2.5, md: 5 },
            }}
          />
        </Grid>
        {featuredArticle ? (
          <Grid
            item
            xs={12}
            sx={{ order: { xs: 1, md: 0 } }}
            key={featuredArticle.id}
          >
            <FeaturedArticle
              {...featuredArticle}
              readMoreLabel={readMoreLabel}
            />
          </Grid>
        ) : null}
        {articles?.length > 0 ? (
          <Grid item xs={12} sx={{ order: { xs: 2 } }}>
            <ArticleCardList
              sx={{ pt: { xs: "28px", md: 0 } }}
              articles={articles}
            />
          </Grid>
        ) : null}
      </Grid>
    </Section>
  );
});

export default ArticleGrid;
