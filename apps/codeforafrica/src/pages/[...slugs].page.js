import React from "react";
import { SWRConfig } from "swr";

import ContactForm from "@/codeforafrica/components/ContactForm";
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
import { getPageServerSideProps } from "@/codeforafrica/lib/data";

const componentsBySlugs = {
  "contact-form": ContactForm,
  "get-in-touch": GetInTouch,
  "custom-page-header": CustomPageHeader,
  "get-involved": GetInvolved,
  hero: Hero,
  "meet-our-team": MeetOurTeam,
  "news-stories": NewsAndStories,
  "our-impact": OurImpact,
  "our-partners": OurPartners,
  "page-header": PageHeader,
  projects: FeaturedProjects,
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
