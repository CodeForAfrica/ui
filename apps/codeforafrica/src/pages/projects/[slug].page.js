import { Section } from "@commons-ui/core";
import Box from "@mui/material/Box";
import React from "react";

import AccoladeBadgeList from "@/codeforafrica/components/AccoladeBadgeList";
import Page from "@/codeforafrica/components/Page";
import ProjectDetails from "@/codeforafrica/components/ProjectDetails";
import ProjectPageHeader from "@/codeforafrica/components/ProjectPageHeader";
import RelatedProjects from "@/codeforafrica/components/RelatedProjects";
import RelatedStories from "@/codeforafrica/components/RelatedStories";
import SectionDivider from "@/codeforafrica/components/SectionDivider";
import TeamMembers from "@/codeforafrica/components/TeamMembers";
import { projects, getPageStaticProps } from "@/codeforafrica/lib";

function Index({ project, sections, ...props }) {
  const { badges, description, donors, links, partners } = project;

  return (
    <Page {...props}>
      <ProjectPageHeader {...project} />
      <Section
        sx={{
          marginTop: { xs: "26.6px", sm: "20px", md: "56px" },
          marginBottom: "42px",
          px: { xs: 2.5, sm: 0 },
        }}
      >
        <AccoladeBadgeList badges={badges} />
      </Section>
      <ProjectDetails
        description={description}
        donors={donors}
        links={links}
        partners={partners}
        sx={{
          my: "42px",
          px: { xs: 2.5, sm: 0 },
        }}
      />
      {sections?.map((section) => {
        switch (section.slug) {
          case "team":
            return (
              <React.Fragment key={section.slug}>
                <SectionDivider
                  sx={{
                    px: { xs: 2.5, sm: 0 },
                    py: "42px",
                  }}
                />
                <TeamMembers
                  {...section}
                  sx={{ px: { xs: 2.5, sm: 0 }, overflowX: "visible" }}
                />
              </React.Fragment>
            );
          case "related-stories":
            return (
              <React.Fragment key={section.slug}>
                <SectionDivider
                  sx={{
                    px: { xs: 2.5, sm: 0 },
                    py: "42px",
                  }}
                />
                <RelatedStories {...section} sx={{ py: 0 }} />
              </React.Fragment>
            );
          case "related-projects":
            return (
              <Box
                sx={{
                  bgcolor: { xs: "none", md: "background.main" },
                }}
                key={section.slug}
              >
                <RelatedProjects
                  sx={{
                    py: { xs: 5, md: 8, lg: 10 },
                  }}
                  {...section}
                />
                ;
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
