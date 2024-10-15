import React from "react";
import { SWRConfig } from "swr";

import AboutTeam from "@/climatemappedafrica/components/AboutTeam";
import Page from "@/climatemappedafrica/components/Page";
import PageHero from "@/climatemappedafrica/components/PageHero";
import Summary from "@/climatemappedafrica/components/Summary";
import { getPageServerSideProps } from "@/climatemappedafrica/lib/data";

const componentsBySlugs = {
  "page-hero": PageHero,
  summary: Summary,
  team: AboutTeam,
};

function Index({ blocks, fallback, ...props }) {
  if (!blocks?.length) {
    return null;
  }

  let PageConfig = React.Fragment;
  let pageConfigProps;
  if (fallback) {
    PageConfig = SWRConfig;
    pageConfigProps = { value: { fallback } };
  }
  return (
    <Page {...props}>
      <PageConfig {...pageConfigProps}>
        {blocks.map((block) => {
          const Component = componentsBySlugs[block.blockType];
          if (!Component) {
            return null;
          }
          // Just in case a block appears twice on the same page, use id as key
          return <Component {...block} key={block.id} />;
        })}
      </PageConfig>
    </Page>
  );
}

export async function getServerSideProps(context) {
  return getPageServerSideProps(context);
}

export default Index;
