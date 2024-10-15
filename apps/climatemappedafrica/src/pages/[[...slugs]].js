import React from "react";
import { SWRConfig } from "swr";

import AboutTeam from "@/climatemappedafrica/components/AboutTeam";
import Hero from "@/climatemappedafrica/components/Hero";
import Page from "@/climatemappedafrica/components/Page";
import Summary from "@/climatemappedafrica/components/Summary";
import { getPageServerSideProps } from "@/climatemappedafrica/lib/data";

const componentsBySlugs = {
  hero: Hero,
  summary: Summary,
  team: AboutTeam,
};

export default function Index({ blocks, fallback }) {
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
    <Page {...pageComponentProps}>
      <PageComponent {...pageComponentProps}>
        {blocks.map((block) => {
          const Component = componentsBySlugs[block.slug];
          if (!Component) {
            return null;
          }
          return <Component {...block} key={block.slug} />;
        })}
      </PageComponent>
    </Page>
  );
}

export async function getServerSideProps(context) {
  return getPageServerSideProps(context);
}
