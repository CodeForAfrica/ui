import { Section } from "@commons-ui/core";
import Box from "@mui/material/Box";
import PropTypes from "prop-types";
import React from "react";

import ArticleHeader from "@/codeforafrica/components/ArticleHeader";
import Author from "@/codeforafrica/components/Author";
import CMSContent from "@/codeforafrica/components/CMSContent";
import Figure from "@/codeforafrica/components/Figure";
import SectionDivider from "@/codeforafrica/components/SectionDivider";

function ArticlePage({
  author,
  content,
  coverImage,
  date,
  image: imageProp,
  summary,
  tags,
  title,
}) {
  const image = coverImage || imageProp;

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
        src={image?.src}
      />
      <ArticleHeader
        title={title}
        date={date}
        tags={tags}
        excerpt={summary}
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
        <Author {...author} />
      </Section>
    </Box>
  );
}

ArticlePage.propTypes = {
  content: PropTypes.string,
};

ArticlePage.defaultProps = {
  content: undefined,
};

export default ArticlePage;
