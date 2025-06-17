import React from "react";
import { SWRConfig } from "swr";

import Banner from "@/trustlab/components/Banner";
import CallToAction from "@/trustlab/components/CallToAction";
import Content from "@/trustlab/components/Content";
import DonorOverviewList from "@/trustlab/components/DonorOverviewList";
import Hero from "@/trustlab/components/Hero";
import OverviewCardList from "@/trustlab/components/OverviewCardList";
import PageOverview from "@/trustlab/components/PageOverview";
import PartnerOverviewList from "@/trustlab/components/PartnerOverviewList";
import PartnersList from "@/trustlab/components/PartnersList";
import { getPageStaticPaths, getPageStaticProps } from "@/trustlab/lib/data";

const componentsBySlugs = {
  "call-to-action": CallToAction,
  "donor-overview-list": DonorOverviewList,
  "helplines-overview-list": OverviewCardList,
  hero: Hero,
  "page-header": Banner,
  "page-overview": PageOverview,
  content: Content,
  "partner-overview-list": PartnerOverviewList,
  "resources-overview-list": OverviewCardList,
  "what-we-do": Banner,
  "partners-list": PartnersList,
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
