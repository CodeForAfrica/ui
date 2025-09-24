import React from "react";
import { SWRConfig } from "swr";

import ActionBanner from "@/trustlab/components/ActionBanner";
import Banner from "@/trustlab/components/Banner";
import CallToAction from "@/trustlab/components/CallToAction";
import ComingSoon from "@/trustlab/components/ComingSoon";
import Content from "@/trustlab/components/Content";
import CourseList from "@/trustlab/components/CourseList/CourseList";
import DonorOverviewList from "@/trustlab/components/DonorOverviewList";
import Gallery from "@/trustlab/components/Gallery/Gallery";
import Helplines from "@/trustlab/components/Helplines";
import Hero from "@/trustlab/components/Hero";
import Incubator from "@/trustlab/components/Incubator";
import IntelligenceBriefings from "@/trustlab/components/IntelligenceBriefings";
import OverviewCardList from "@/trustlab/components/OverviewCardList";
import PageOverview from "@/trustlab/components/PageOverview";
import PartnerOverviewList from "@/trustlab/components/PartnerOverviewList";
import PartnersList from "@/trustlab/components/PartnersList";
import PostList from "@/trustlab/components/PostList";
import Resources from "@/trustlab/components/Resources";
import Spotlight from "@/trustlab/components/Spotlight";
import WhereWeWork from "@/trustlab/components/WhereWeWork";
import { getPageStaticPaths, getPageStaticProps } from "@/trustlab/lib/data";

const componentsBySlugs = {
  "action-banner": ActionBanner,
  "call-to-action": CallToAction,
  content: Content,
  "course-list": CourseList,
  "donor-overview-list": DonorOverviewList,
  resources: Resources,
  "coming-soon": ComingSoon,
  gallery: Gallery,
  "helplines-overview-list": OverviewCardList,
  hero: Hero,
  incubator: Incubator,
  "intelligence-briefings": IntelligenceBriefings,
  "page-header": Banner,
  "page-overview": PageOverview,
  "partner-overview-list": PartnerOverviewList,
  "partners-list": PartnersList,
  "where-we-work": WhereWeWork,
  "post-list": PostList,
  helplines: Helplines,
  "resources-overview-list": OverviewCardList,
  spotlight: Spotlight,
  "what-we-do": Banner,
};

function Page({ blocks, fallback }) {
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

export async function getStaticPaths() {
  return getPageStaticPaths();
}

export async function getStaticProps(context) {
  return getPageStaticProps(context);
}

export default Page;
