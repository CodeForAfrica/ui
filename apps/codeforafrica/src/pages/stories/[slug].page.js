import Box from "@mui/material/Box";
import React from "react";

import ArticlePage from "@/codeforafrica/components/ArticlePage";
import Page from "@/codeforafrica/components/Page";
import RelatedStories from "@/codeforafrica/components/RelatedStories";
import { getPageStaticProps } from "@/codeforafrica/lib";

function Index({ article, sections, ...props }) {
  return (
    <Page {...props}>
      {article ? <ArticlePage {...article} /> : null}
      {sections?.map((section) => {
        switch (section.slug) {
          case "related-stories":
            return (
              <Box
                key={section.slug}
                sx={{
                  bgcolor: { xs: "inherit", sm: "background.main" },
                }}
              >
                <RelatedStories
                  {...section}
                  sx={{ px: { xs: "20px", sm: 0 } }}
                />
              </Box>
            );
          default:
            return null;
        }
      })}
    </Page>
  );
}

export async function getStaticPaths() {
  const paths = [...Array(13).keys()].map((_, i) => ({
    params: { slug: `article-${i + 1}` },
  }));
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params: { slug } }) {
  return getPageStaticProps({ slug: `/stories/${slug}` });
}

export default Index;
