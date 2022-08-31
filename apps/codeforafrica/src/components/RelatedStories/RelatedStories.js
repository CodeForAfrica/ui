import { Section } from "@commons-ui/core";
import { RichTypography } from "@commons-ui/next";
import React from "react";

import ArticleCardList from "@/codeforafrica/components/ArticleCardList";

const RelatedStories = React.forwardRef(function RelatedStories(props, ref) {
  const { articles, sx, title } = props;

  if (!articles?.length) {
    return null;
  }
  return (
    <Section
      sx={{
        px: { xs: 2.5, sm: 0 },
        py: { xs: 5, sm: 10, md: 7 },
        ...sx,
      }}
      ref={ref}
    >
      <RichTypography
        variant="h5Small"
        sx={{ mb: { xs: 2.5, md: "55px" }, typography: { md: "h5" } }}
      >
        {title}
      </RichTypography>
      <ArticleCardList
        articles={articles.slice(0, 3)}
        sx={{ mb: { xs: 5, lg: "55px" } }}
      />
    </Section>
  );
});

export default RelatedStories;
