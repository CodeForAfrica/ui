import React from "react";
import { SWRConfig } from "swr";

import AboutPageEntity from "@/codeforafrica/components/AboutPageEntity";
import Articles from "@/codeforafrica/components/Articles";
import ContactForm from "@/codeforafrica/components/ContactForm";
import CustomPageHeader from "@/codeforafrica/components/CustomPageHeader";
import FeaturedProjects from "@/codeforafrica/components/FeaturedProjects";
import GetInTouch from "@/codeforafrica/components/GetInTouch";
import GetInvolved from "@/codeforafrica/components/GetInvolved";
import GuidingPrinciplesCardList from "@/codeforafrica/components/GuidingPrinciplesCardList";
import Hero from "@/codeforafrica/components/Hero";
import JoinOurSlack from "@/codeforafrica/components/JoinOurSlack";
import MeetOurTeam from "@/codeforafrica/components/MeetOurTeam";
import NewsAndStories from "@/codeforafrica/components/NewsAndStories";
import OurImpact from "@/codeforafrica/components/OurImpact";
import OurPartners from "@/codeforafrica/components/OurPartners";
import OurTeam from "@/codeforafrica/components/OurTeam";
import PageHeader from "@/codeforafrica/components/PageHeader";
import Projects from "@/codeforafrica/components/Projects";
import { getPageServerSideProps } from "@/codeforafrica/lib/data";

const componentsBySlugs = {
  "about-page-entity": AboutPageEntity,
  articles: Articles,
  "contact-form": ContactForm,
  "custom-page-header": CustomPageHeader,
  "get-involved": GetInvolved,
  "get-in-touch": GetInTouch,
  hero: Hero,
  "join-our-slack": JoinOurSlack,
  "meet-our-team": MeetOurTeam,
  "news-stories": NewsAndStories,
  "our-guiding-principles": GuidingPrinciplesCardList,
  "our-impact": OurImpact,
  "our-partners": OurPartners,
  "page-header": PageHeader,
  "our-team": OurTeam,
  "our-work": Projects,
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
        return <Component {...block} key={block.slug} />;
      })}
    </PageComponent>
  );
}

export async function getServerSideProps(context) {
  return getPageServerSideProps(context);
}

export default Index;
