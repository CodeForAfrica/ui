import { Box } from "@mui/material";
import React from "react";

import ArticlePage from "@/codeforafrica/components/ArticlePage";
import Page from "@/codeforafrica/components/Page";
import RelatedStories from "@/codeforafrica/components/RelatedStories";
import getPageServerSideProps from "@/codeforafrica/lib/payload/data/local";

function Index({ article, sections, ...props }) {
  return (
    <Page {...props}>
      {article ? <ArticlePage {...article} /> : null}
      {sections?.map((section) => {
        switch (section.slug) {
          case "news-stories":
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
export async function getServerSideProps(context) {
  const {
    params: { slug },
  } = context;
  return getPageServerSideProps(context, `/stories/${slug}`);
}

export default Index;
