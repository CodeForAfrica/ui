import { Section } from "@commons-ui/core";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import React from "react";

import Page from "@/codeforafrica/components/Page";
import RelatedStories from "@/codeforafrica/components/RelatedStories";
import ShareBar from "@/codeforafrica/components/ShareBar";
import {
  FacebookShareBarButton,
  LinkedinShareBarButton,
  TwitterShareBarButton,
} from "@/codeforafrica/components/ShareBarButton";
import { getPageStaticProps } from "@/codeforafrica/lib";

function Index({ article, sections, ...props }) {
  return (
    <Page {...props}>
      {article ? (
        <Section
          sx={{
            px: { xs: "20px", sm: 0 },
            maxWidth: {
              sm: "648px",
              md: "912px",
            },
          }}
        >
          <Box
            sx={{
              color: "grey.main",
              columnGap: 2,
              display: "flex",
              alignItems: "center",
            }}
          >
            <Typography variant="footerCap">Share This Article</Typography>
            <ShareBar>
              <FacebookShareBarButton />
              <LinkedinShareBarButton />
              <TwitterShareBarButton />
            </ShareBar>
          </Box>
        </Section>
      ) : null}
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
