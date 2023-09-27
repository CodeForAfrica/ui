/* eslint-disable camelcase */
import { Section } from "@commons-ui/core";
import { Figure } from "@commons-ui/next";
import { Box } from "@mui/material";
import React from "react";

import ArticleHeader from "@/codeforafrica/components/ArticleHeader";
import Author from "@/codeforafrica/components/Author";
import CMSContent from "@/codeforafrica/components/CMSContent";
import SectionDivider from "@/codeforafrica/components/SectionDivider";

function ArticlePage({
  authors,
  excerpt,
  tags,
  title,
  coverImage: { src: featureImage },
  content,
  publishedOn,
  page,
}) {
  return (
    <Box component="article">
      <Figure
        ImageProps={{
          alt: title,
          sx: { objectFit: "cover" },
          src: featureImage,
        }}
        sx={{
          width: "100%",
          height: { xs: "163px", md: "600px" },
        }}
      />
      <ArticleHeader
        title={title}
        date={publishedOn}
        tags={tags}
        page={page}
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
        {content}
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
        {authors?.map((author) => (
          <Author {...author} key={author.name} />
        ))}
      </Section>
    </Box>
  );
}

export default ArticlePage;
