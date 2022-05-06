import { RichTypography, Section } from "@commons-ui/core";
import Grid from "@mui/material/Grid";
import React, { useState, useEffect, Fragment } from "react";

import ArticleCardList from "@/codeforafrica/components/ArticleCardList";
import ChoiceChip from "@/codeforafrica/components/ChoiceChip";
import ChoiceChipGroup from "@/codeforafrica/components/ChoiceChipGroup";
import FeaturedArticle from "@/codeforafrica/components/FeaturedArticle";

const ArticleGrid = React.forwardRef(function ArticleGrid(props, ref) {
  const { articles, title, ...other } = props;
  const [tags] = useState(() => {
    const uniqueTags = [...new Set(articles?.flatMap((a) => a.tags || []))];
    uniqueTags.unshift("All");
    return uniqueTags;
  });
  const [selectedTag, setSelectedTag] = useState("all");
  const [filteredArticles, setFilteredArticles] = useState(articles);
  const handleChange = (_, value) => {
    const newTag = value || "all";
    setSelectedTag(newTag);
  };
  useEffect(() => {
    if (selectedTag !== "all") {
      const found = articles.filter((a) => a.tags?.includes(selectedTag));
      setFilteredArticles(found);
    } else {
      setFilteredArticles(articles);
    }
  }, [articles, selectedTag]);

  return (
    <Section sx={{ px: { xs: "20px", sm: 0 } }} {...other} ref={ref}>
      <Grid container sx={{ py: { xs: "28px", md: 8, lg: "105.29px" } }}>
        <Grid item xs={12} sx={{ order: { xs: 0, md: 1 } }}>
          <RichTypography variant="h4" sx={{ mb: "10px" }}>
            {title}
          </RichTypography>
          <ChoiceChipGroup
            color="default"
            onChange={handleChange}
            value={selectedTag}
            sx={{ mb: 5 }}
          >
            {tags.map((tag) => (
              <ChoiceChip label={tag} value={tag} key={tag} />
            ))}
          </ChoiceChipGroup>
        </Grid>
        {filteredArticles?.length > 0 ? (
          <>
            <Grid item xs={12} sx={{ order: { xs: 1, md: 0 } }}>
              <FeaturedArticle
                sx={{ mb: { xs: "28px", md: "40px" } }}
                {...filteredArticles[0]}
              />
            </Grid>
            <Grid item xs={12} sx={{ order: { xs: 2 } }}>
              <ArticleCardList articles={filteredArticles.slice(1)} />
            </Grid>
          </>
        ) : null}
      </Grid>
    </Section>
  );
});

export default ArticleGrid;
