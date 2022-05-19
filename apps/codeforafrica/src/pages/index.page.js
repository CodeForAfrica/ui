import React from "react";

import FeaturedProjects from "@/codeforafrica/components/FeaturedProjects";
import NewsAndStories from "@/codeforafrica/components/NewsAndStories";
import OurTeam from "@/codeforafrica/components/OurTeam";
import Page from "@/codeforafrica/components/Page";
import { getPageStaticProps } from "@/codeforafrica/lib";

function Index({ sections, ...props }) {
  return (
    <Page {...props}>
      {sections?.map((section) => {
        switch (section.slug) {
          case "projects": {
            return <FeaturedProjects {...section} key={section.slug} />;
          }
          case "our-team": {
            return <OurTeam key={section.slug} {...section} />;
          }
          case "news-stories": {
            return <NewsAndStories {...section} key={section.slug} />;
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
