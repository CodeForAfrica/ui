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
  authors,
  primary_author,
  excerpt,
  custom_excerpt,
  tags,
  title,
  feature_image,
  html,
  published_at,
}) {
  return (
    <Box component="article">
      <Figure
        sx={{
          width: "100%",
          height: { xs: "163px", md: "600px" },
        }}
        alt={title}
        objectFit="cover"
        priority
        src={feature_image}
      />
      <ArticleHeader
        title={title}
        date={published_at}
        tags={tags}
        summary={excerpt || custom_excerpt}
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
        {/* 
        //TODO: confirm if this is to be shown on opportunities page
         */}

        <Author {...(primary_author || authors[0])} />
      </Section>
    </Box>
  );
}

export default ArticlePage;
