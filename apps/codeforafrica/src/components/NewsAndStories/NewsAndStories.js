import { Section } from "@commons-ui/core";
import { Link, RichTypography } from "@commons-ui/next";
import { Box, Button } from "@mui/material";
import React from "react";

import ArticleCardList from "@/codeforafrica/components/ArticleCardList";
import FeaturedArticle from "@/codeforafrica/components/FeaturedArticle";

// TODO(kilemensi): Remove hard-coded strings
const NewsAndStories = React.forwardRef(function NewsAndStories(props, ref) {
  const {
    action: { label, href },
    featured,
    labels: { readStory },
    posts,
    title,
  } = props;
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
          {...featured}
          readMoreLabel={readStory}
          variant="cover"
          sx={{ mb: { xs: "28px", sm: "40px", lg: "55px" }, width: "100%" }}
        />
        <ArticleCardList articles={posts} sx={{ mb: { xs: 5, lg: "55px" } }} />
        <Button
          variant="contained"
          component={Link}
          href={href}
          sx={{ width: { xs: "100%", sm: "unset" } }}
        >
          {label}
        </Button>
      </Box>
    </Section>
  );
});

export default NewsAndStories;
