import { Section } from "@commons-ui/core";
import Grid from "@mui/material/Grid";
import React from "react";

import NewsAndStories from "@/codeforafrica/components/NewsAndStories";
import Page from "@/codeforafrica/components/Page";
import ProjectTile from "@/codeforafrica/components/ProjectTile";
import { getPageStaticProps } from "@/codeforafrica/lib";

function Index({ sections, ...props }) {
  return (
    <Page {...props}>
      {sections?.map((section) => {
        switch (section.slug) {
          case "projects": {
            return (
              <Section key={section.slug} sx={{ px: { xs: "20px", sm: 0 } }}>
                <Grid container spacing="18px">
                  {section.projects?.map((p) => (
                    <Grid key={p.href} item xs={12} sm={6} md={4}>
                      <ProjectTile {...p} variant="detailed" />
                    </Grid>
                  ))}
                </Grid>
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
