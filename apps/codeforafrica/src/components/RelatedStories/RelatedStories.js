import { RichTypography, Section } from "@commons-ui/core";
import React from "react";

import ArticleCardList from "@/codeforafrica/components/ArticleCardList";

// TODO(kilemensi): Remove hard-coded strings
const RelatedStories = React.forwardRef(function RelatedStories(props, ref) {
  const { articles, title } = props;

  if (!articles?.length) {
    return null;
  }
  return (
    <Section
      sx={{
        px: { xs: 2.5, sm: 0 },
        py: { xs: 5, sm: 10, md: 7 },
      }}
      ref={ref}
    >
      <RichTypography
        variant="h4"
        sx={{ mb: { xs: 2.5, md: "55px" }, typography: { xs: "h5", md: "h4" } }}
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
