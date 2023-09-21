import React from "react";
import { SWRConfig } from "swr";

import CustomPageHeader from "@/codeforafrica/components/CustomPageHeader";
import FeaturedProjects from "@/codeforafrica/components/FeaturedProjects";
import GetInTouch from "@/codeforafrica/components/GetInTouch";
import GetInvolved from "@/codeforafrica/components/GetInvolved";
import Hero from "@/codeforafrica/components/Hero";
import MeetOurTeam from "@/codeforafrica/components/MeetOurTeam";
import NewsAndStories from "@/codeforafrica/components/NewsAndStories";
import OurImpact from "@/codeforafrica/components/OurImpact";
import OurPartners from "@/codeforafrica/components/OurPartners";
import PageHeader from "@/codeforafrica/components/PageHeader";
import Partner from "@/codeforafrica/components/Partner";
import { getPageServerSideProps } from "@/codeforafrica/lib/data";

const componentsBySlugs = {
  hero: Hero,
  "get-in-touch": GetInTouch,
  "page-header": PageHeader,
  "custom-page-header": CustomPageHeader,
  "meet-our-team": MeetOurTeam,
  "news-stories": NewsAndStories,
  "get-involved": GetInvolved,
  "our-impact": OurImpact,
  "our-partners": OurPartners,
  projects: FeaturedProjects,
  partner: Partner,
};

function Index({ blocks, fallback }) {
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
      {blocks.map((block) => {
        const Component = componentsBySlugs[block.slug];
        if (!Component) {
          return null;
        }
        return <Component {...block} key={block.id} />;
      })}
    </PageComponent>
  );
}

export async function getServerSideProps(context) {
  return getPageServerSideProps(context);
}

export default Index;
