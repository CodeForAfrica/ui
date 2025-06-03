import React from "react";
import { SWRConfig } from "swr";

import DonorOverviewList from "@/trustlab/components/DonorOverviewList";
import Hero from "@/trustlab/components/Hero";
import PartnerOverviewList from "@/trustlab/components/PartnerOverviewList";
import ShowCase from "@/trustlab/components/ShowCase";
import { getPageStaticPaths, getPageStaticProps } from "@/trustlab/lib/data";

const componentsBySlugs = {
  hero: Hero,
  "partner-overview-list": PartnerOverviewList,
  "donor-overview-list": DonorOverviewList,
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
        return <Component {...block} key={block.slug} />;
      })}
      <ShowCase />
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
