import { Section } from "@commons-ui/core";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import React from "react";

import Page from "@/codeforafrica/components/Page";
import RelatedProjects from "@/codeforafrica/components/RelatedProjects";
import ShareBar from "@/codeforafrica/components/ShareBar";
import {
  FacebookShareBarButton,
  LinkedinShareBarButton,
  TwitterShareBarButton,
} from "@/codeforafrica/components/ShareBarButton";
import { projects, getPageStaticProps } from "@/codeforafrica/lib";

function Index({ project, sections, ...props }) {
  return (
    <Page {...props}>
      {project ? (
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
            <Typography variant="footerCap">Share This Project</Typography>
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
          case "related-projects":
            return <RelatedProjects {...section} key={section.slug} />;
          default:
            return null;
        }
      })}
    </Page>
  );
}

export async function getStaticPaths() {
  const paths = projects.map(({ slug }) => ({
    params: { slug },
  }));
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params: { slug } }) {
  return getPageStaticProps({ slug: `/projects/${slug}` });
}

export default Index;
