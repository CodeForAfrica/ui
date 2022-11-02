/* eslint-disable camelcase */
import { Section } from "@commons-ui/core";
import Box from "@mui/material/Box";
import React from "react";

import ArticleHeader from "@/codeforafrica/components/ArticleHeader";
import Author from "@/codeforafrica/components/Author";
import CMSContent from "@/codeforafrica/components/CMSContent";
import Figure from "@/codeforafrica/components/Figure";
import SectionDivider from "@/codeforafrica/components/SectionDivider";

function ArticlePage({
  primaryAuthor,
  excerpt,
  tags,
  title,
  featureImage,
  html,
  publishedAt,
  primaryTag,
}) {
  return (
    <Box component="article">
      <Figure
        ImageProps={{
          alt: title,
          sx: { objectFit: "cover" },
          priority: true,
          src: featureImage,
        }}
        sx={{
          width: "100%",
          height: { xs: "163px", md: "600px" },
        }}
      />
      <ArticleHeader
        title={title}
        date={publishedAt}
        tags={tags}
        primaryTag={primaryTag}
        excerpt={excerpt}
        sx={{
          maxWidth: {
            sm: "648px",
            md: "912px",
          },
          px: { xs: 2.5, sm: 0 },
        }}
      />
      <CMSContent
        variant="body3"
        sx={{
          maxWidth: {
            sm: "648px",
            md: "912px",
          },
          my: { xs: 2.5, md: 5 },
          px: { xs: 2.5, sm: 0 },
        }}
      >
        {html}
      </CMSContent>
      <SectionDivider
        sx={{
          maxWidth: {
            sm: "648px",
            md: "912px",
          },
          px: { xs: 2.5, sm: 0 },
          my: { xs: 2.5, md: 5 },
        }}
      />
      <Section
        component="address"
        sx={{
          maxWidth: {
            sm: "648px",
            md: "912px",
          },
          mb: { xs: 2.5, md: 7.5 },
          px: { xs: 2.5, sm: 0 },
        }}
      >
        <Author {...primaryAuthor} />
      </Section>
    </Box>
  );
}

export default ArticlePage;
