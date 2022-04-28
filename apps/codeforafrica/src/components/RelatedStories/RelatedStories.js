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
        px: { xs: "20px", sm: 0 },
        py: { xs: 5, sm: "20px", md: 4, lg: 10 },
      }}
      ref={ref}
    >
      <RichTypography
        textAlign="center"
        variant="h4"
        sx={{ mb: { xs: 5, lg: "55px" }, typography: { xs: "h3", sm: "h4" } }}
      >
        {title}
      </RichTypography>
      <ArticleCardList
        items={articles.slice(0, 3)}
        sx={{ mb: { xs: 5, lg: "55px" } }}
      />
    </Section>
  );
});

export default RelatedStories;
