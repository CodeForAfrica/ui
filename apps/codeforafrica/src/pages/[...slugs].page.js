import React from "react";
import { SWRConfig } from "swr";

import FeaturedProjects from "@/codeforafrica/components/FeaturedProjects";
import GetInvolved from "@/codeforafrica/components/GetInvolved";
import Hero from "@/codeforafrica/components/Hero";
import MeetOurTeam from "@/codeforafrica/components/MeetOurTeam";
import NewsAndStories from "@/codeforafrica/components/NewsAndStories";
import OurPartners from "@/codeforafrica/components/OurPartners";
import Page from "@/codeforafrica/components/Page";
import { getPageServerSideProps } from "@/codeforafrica/lib/data";

const componentsBySlugs = {
  hero: Hero,
  "meet-our-team": MeetOurTeam,
  "news-stories": NewsAndStories,
  "our-impact": GetInvolved,
  "our-partners": OurPartners,
  projects: FeaturedProjects,
};

function Index({ blocks, fallback, ...props }) {
  if (!blocks?.length) {
    return null;
  }

  let PageComponent = React.Fragment;
  let pageComponentProps;
  if (fallback) {
    PageComponent = SWRConfig;
    pageComponentProps = { value: { fallback } };
  }
  return (
    <PageComponent {...pageComponentProps}>
      <Page {...props}>
        {blocks.map((block) => {
          const Component = componentsBySlugs[block.slug];
          if (!Component) {
            console.warn(`Missing component for slug: ${block.slug}`);
            return null;
          }
          return <Component {...block} key={block.id} />;
        })}
      </Page>
    </PageComponent>
  );
}

export async function getServerSideProps(context) {
  return getPageServerSideProps(context, "/");
}

export default Index;
