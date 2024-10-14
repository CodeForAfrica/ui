import React from "react";
import { SWRConfig } from "swr";

import AboutTeam from "@/climatemappedafrica/components/AboutTeam";
import Page from "@/climatemappedafrica/components/Page";
import Summary from "@/climatemappedafrica/components/Summary";
import { getPageServerSideProps } from "@/climatemappedafrica/lib/data";

const componentsBySlugs = {
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
          const Component = componentsBySlugs[block.slug];
          if (!Component) {
            return null;
          }
          return <Component {...block} key={block.slug} />;
        })}
      </PageConfig>
    </Page>
  );
}

export async function getServerSideProps(context) {
  return getPageServerSideProps(context);
}

export default Index;
