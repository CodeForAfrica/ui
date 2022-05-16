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
          <Stack direction="column" key={section.slug}>
            {section.projects?.map((project) => (
              <ProjectCard {...project} key={project.slug} />
            ))}
          </Stack>
        ) : null
      )}
    </Page>
  );
}

export async function getStaticProps() {
  return getPageStaticProps({ slug: "/projects" });
}

export default Index;
