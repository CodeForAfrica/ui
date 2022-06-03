import { Section } from "@commons-ui/core";
import Stack from "@mui/material/Stack";
import React from "react";

import Page from "@/codeforafrica/components/Page";
import ProjectCard from "@/codeforafrica/components/ProjectCard";
import { getPageStaticProps } from "@/codeforafrica/lib";

function Index({ sections, ...props }) {
  return (
    <Page {...props}>
      {sections?.map((section) =>
        section.slug === "projects" ? (
          <Section key={section.slug} sx={{ px: { xs: "20px", sm: 0 } }}>
            <Stack direction="column" spacing={{ xs: 5, md: 7.5 }}>
              {section.projects?.map((project) => (
                <ProjectCard {...project} key={project.slug} />
              ))}
            </Stack>
          </Section>
        ) : null
      )}
    </Page>
  );
}

export async function getStaticProps() {
  return getPageStaticProps({ slug: "/projects" });
}

export default Index;
