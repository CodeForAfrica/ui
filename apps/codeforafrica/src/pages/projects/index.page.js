import React from "react";
import { SWRConfig } from "swr";

import Page from "@/codeforafrica/components/Page";
import PageHeader from "@/codeforafrica/components/PageHeader";
import Projects from "@/codeforafrica/components/Projects";
import { getPageStaticProps } from "@/codeforafrica/lib";

function Index({ sections, ...props }) {
  return (
    <Page {...props}>
      {sections?.map((section) => {
        switch (section.slug) {
          case "hero":
            return <PageHeader {...section} key={section.slug} />;
          case "projects":
            return (
              <SWRConfig
                value={{
                  fallback: {
                    "/api/projects": section.projects,
                  },
                }}
                key={section.slug}
              >
                <Projects {...section} />
              </SWRConfig>
            );
          default:
            return null;
        }
      })}
    </Page>
  );
}

export async function getStaticProps() {
  return getPageStaticProps({ slug: "/projects" });
}

export default Index;
