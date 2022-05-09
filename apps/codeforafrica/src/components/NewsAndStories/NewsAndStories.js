import { RichTypography, Section } from "@commons-ui/core";
import { Link } from "@commons-ui/next";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import React from "react";

import ArticleCardList from "@/codeforafrica/components/ArticleCardList";
import FeaturedArticle from "@/codeforafrica/components/FeaturedArticle";

// TODO(kilemensi): Remove hard-coded strings
const NewsAndStories = React.forwardRef(function NewsAndStories(props, ref) {
  const { articles, title } = props;

  if (!articles?.length) {
    return null;
  }
  return (
    <Section
      sx={{
        px: { xs: "20px", sm: 0 },
        py: { xs: 5, sm: "20px", md: 4, lg: 10 },
      }}
      ref={ref}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <RichTypography
          textAlign="center"
          variant="h4"
          sx={{ mb: { xs: 5, lg: "55px" }, typography: { xs: "h3", sm: "h4" } }}
        >
          {title}
        </RichTypography>
        <FeaturedArticle
          {...articles[0]}
          variant="cover"
          sx={{ mb: { xs: "28px", sm: "40px", lg: "55px" }, width: "100%" }}
        />
        <ArticleCardList
          articles={articles.slice(1)}
          sx={{ mb: { xs: 5, lg: "55px" } }}
        />
        <Button
          variant="contained"
          component={Link}
          href="/stories"
          sx={{ width: { xs: "100%", sm: "unset" } }}
        >
          Browse More Stories
        </Button>
      </Box>
    </Section>
  );
});

export default NewsAndStories;
