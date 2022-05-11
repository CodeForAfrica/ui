import { RichTypography, Section } from "@commons-ui/core";
import Grid from "@mui/material/Grid";
import React from "react";

import ArticleCardList from "@/codeforafrica/components/ArticleCardList";
import ChoiceChip from "@/codeforafrica/components/ChoiceChip";
import ChoiceChipGroup from "@/codeforafrica/components/ChoiceChipGroup";
import FeaturedArticle from "@/codeforafrica/components/FeaturedArticle";

const ArticleGrid = React.forwardRef(function ArticleGrid(props, ref) {
  const { articles, onChange, selectedTag, tags, title, ...other } = props;

  return (
    <Section sx={{ px: { xs: "20px", sm: 0 } }} {...other} ref={ref}>
      <Grid container sx={{ py: { xs: "28px", md: 8, lg: "105.29px" } }}>
        <Grid item xs={12} sx={{ order: { xs: 0, md: 1 } }}>
          <RichTypography variant="h4" sx={{ mb: "10px" }}>
            {title}
          </RichTypography>
          {tags?.length > 0 ? (
            <ChoiceChipGroup
              color="default"
              onChange={onChange}
              value={selectedTag}
              sx={{ mb: 5 }}
            >
              {tags.map((tag) => (
                <ChoiceChip label={tag} value={tag} key={tag} />
              ))}
            </ChoiceChipGroup>
          ) : null}
        </Grid>
        {articles?.length > 0 ? (
          <>
            <Grid item xs={12} sx={{ order: { xs: 1, md: 0 } }}>
              <FeaturedArticle
                sx={{ mb: { xs: "28px", md: "40px" } }}
                {...articles[0]}
              />
            </Grid>
            <Grid item xs={12} sx={{ order: { xs: 2 } }}>
              <ArticleCardList articles={articles.slice(1)} />
            </Grid>
          </>
        ) : null}
      </Grid>
    </Section>
  );
});

export default ArticleGrid;
