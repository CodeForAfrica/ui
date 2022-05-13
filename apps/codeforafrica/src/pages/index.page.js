import { Section } from "@commons-ui/core";
import React from "react";

import NewsAndStories from "@/codeforafrica/components/NewsAndStories";
import Page from "@/codeforafrica/components/Page";
import ProjectTileList from "@/codeforafrica/components/ProjectTileList";
import { getPageStaticProps } from "@/codeforafrica/lib";

function Index({ sections, ...props }) {
  return (
    <Page {...props}>
      {sections?.map((section) => {
        switch (section.slug) {
          case "projects": {
            return (
              <Section key={section.slug} sx={{ px: { xs: "20px", sm: 0 } }}>
                <ProjectTileList projects={section.projects} />
              </Section>
            );
          }
          case "news-stories": {
            return <NewsAndStories key={section.slug} {...section} />;
          }
          default:
            return null;
        }
      })}
    </Page>
  );
}

export async function getStaticProps() {
  return getPageStaticProps({ slug: "/" });
}

export default Index;
