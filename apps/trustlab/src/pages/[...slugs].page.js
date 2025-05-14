import React from "react";
import { SWRConfig } from "swr";

import { getPageServerSideProps } from "@/trustlab/lib/data";

const componentsBySlugs = {};

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
