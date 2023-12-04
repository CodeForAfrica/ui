import { Section } from "@commons-ui/core";
import { Link, RichTypography } from "@commons-ui/next";
import { Box, Button, Divider } from "@mui/material";
import React from "react";

import ArticleCardList from "@/codeforafrica/components/ArticleCardList";
import FeaturedArticle from "@/codeforafrica/components/FeaturedArticle";

// TODO(kilemensi): Remove hard-coded strings
const NewsAndStories = React.forwardRef(function NewsAndStories(props, ref) {
  const {
    action: { label, href },
    featured,
    featuredStoryActionLabel,
    stories,
    title,
  } = props;
  return (
    <>
      <Section
        sx={{
          px: { xs: "20px", sm: 0 },
          pt: { xs: 5, md: 7, lg: 10 },
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
            sx={{
              mb: { xs: 5, lg: "55px" },
              typography: { xs: "h3", sm: "h4" },
            }}
          >
            {title}
          </RichTypography>
          <FeaturedArticle
            {...featured}
            readMoreLabel={featuredStoryActionLabel}
            variant="cover"
            sx={{ mb: { xs: "28px", sm: "40px", lg: "55px" }, width: "100%" }}
          />
          <ArticleCardList
            articles={stories}
            sx={{ mb: { xs: 5, lg: "55px" } }}
          />
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
      <Divider sx={{ mt: { xs: 5, md: 7, lg: 10 } }} />
    </>
  );
});

export default NewsAndStories;
