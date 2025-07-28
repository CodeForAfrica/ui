import React from "react";
import { SWRConfig } from "swr";

import ActionBanner from "@/trustlab/components/ActionBanner";
import Banner from "@/trustlab/components/Banner";
import CallToAction from "@/trustlab/components/CallToAction";
import Content from "@/trustlab/components/Content";
import DonorOverviewList from "@/trustlab/components/DonorOverviewList";
import Gallery from "@/trustlab/components/Gallery/Gallery";
import Hero from "@/trustlab/components/Hero";
import Incubator from "@/trustlab/components/Incubator";
import OverviewCardList from "@/trustlab/components/OverviewCardList";
import PageOverview from "@/trustlab/components/PageOverview";
import PartnerOverviewList from "@/trustlab/components/PartnerOverviewList";
import PartnersList from "@/trustlab/components/PartnersList";
import PostList from "@/trustlab/components/PostList";
import { getPageStaticPaths, getPageStaticProps } from "@/trustlab/lib/data";

const componentsBySlugs = {
  "action-banner": ActionBanner,
  "call-to-action": CallToAction,
  content: Content,
  "donor-overview-list": DonorOverviewList,
  gallery: Gallery,
  "helplines-overview-list": OverviewCardList,
  hero: Hero,
  incubator: Incubator,
  "page-header": Banner,
  "page-overview": PageOverview,
  "partner-overview-list": PartnerOverviewList,
  "partners-list": PartnersList,
  "post-list": PostList,
  "resources-overview-list": OverviewCardList,
  spotlight: OverviewCardList,
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
