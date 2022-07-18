import React from "react";

import ArticlePage from "@/codeforafrica/components/ArticlePage";
import Page from "@/codeforafrica/components/Page";
import {
  getPageStaticProps,
  getGhostCMSStaticPaths,
} from "@/codeforafrica/lib";

function Index({ opportunity, sections, ...props }) {
  return (
    <Page {...props}>
      {opportunity ? <ArticlePage {...opportunity} /> : null}
    </Page>
  );
}

export async function getStaticPaths() {
  const paths = getGhostCMSStaticPaths("opportunities");

  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ params: { slug } }) {
  return getPageStaticProps({ slug: `/opportunities/${slug}` });
}

export default Index;
