import { Section } from "@commons-ui/core";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import React from "react";

import AboutMemberPageHeader from "@/codeforafrica/components/AboutMemberPageHeader";
import Page from "@/codeforafrica/components/Page";
import RelatedProjects from "@/codeforafrica/components/RelatedProjects";
import ShareBar from "@/codeforafrica/components/ShareBar";
import {
  FacebookShareBarButton,
  LinkedinShareBarButton,
  TwitterShareBarButton,
} from "@/codeforafrica/components/ShareBarButton";
import { team, getPageStaticProps } from "@/codeforafrica/lib";

function Index({ member, sections, ...props }) {
  return (
    <Page {...props}>
      <AboutMemberPageHeader {...member} />
      <Section
        sx={{
          px: { xs: 2.5, sm: 0 },
          maxWidth: {
            sm: "648px",
            md: "912px",
          },
        }}
      >
        <Box
          sx={{
            color: "grey.main",
            rowGap: 2,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography variant="footerCap">Connect</Typography>
          <ShareBar>
            <FacebookShareBarButton />
            <LinkedinShareBarButton />
            <TwitterShareBarButton />
          </ShareBar>
        </Box>
      </Section>
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
  const paths = team.map(({ slug }) => ({
    params: { slug },
  }));
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params: { slug } }) {
  return getPageStaticProps({ slug: `/about/members/${slug}` });
}

export default Index;
