import { Section } from "@commons-ui/core";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import React from "react";

import Page from "@/codeforafrica/components/Page";
import ProjectBadges from "@/codeforafrica/components/ProjectBadges";
import ProjectPageHeader from "@/codeforafrica/components/ProjectPageHeader";
import RelatedProjects from "@/codeforafrica/components/RelatedProjects";
import ShareBar from "@/codeforafrica/components/ShareBar";
import {
  FacebookShareBarButton,
  LinkedinShareBarButton,
  TwitterShareBarButton,
} from "@/codeforafrica/components/ShareBarButton";
import TeamMemberCardList from "@/codeforafrica/components/TeamMemberCardList";
import { projects, getPageStaticProps } from "@/codeforafrica/lib";

function Index({ project, sections, ...props }) {
  const { badges } = project;
  return (
    <Page {...props}>
      <ProjectPageHeader {...project} />
      <Section>
        <ProjectBadges badges={badges} />
      </Section>
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
          <Typography variant="footerCap">Share This Project</Typography>
          <ShareBar>
            <FacebookShareBarButton />
            <LinkedinShareBarButton />
            <TwitterShareBarButton />
          </ShareBar>
        </Box>
      </Section>
      {sections?.map((section) => {
        switch (section.slug) {
          case "team":
            return (
              <Section
                sx={{
                  borderTop: "1px solid",
                  borderColor: "grey.main",
                  pl: { xs: 2.5, sm: 0 },
                  py: "42px",
                  overflowX: "visible",
                }}
                key={section.slug}
              >
                <TeamMemberCardList {...section} />
              </Section>
            );
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
