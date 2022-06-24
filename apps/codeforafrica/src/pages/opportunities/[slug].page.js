import React from "react";

import ArticlePage from "@/codeforafrica/components/ArticlePage";
import Page from "@/codeforafrica/components/Page";
import { getPageStaticProps } from "@/codeforafrica/lib";

function Index({ opportunity, sections, ...props }) {
  return (
    <Page {...props}>
      {opportunity ? <ArticlePage {...opportunity} /> : null}
    </Page>
  );
}

export async function getStaticPaths() {
  const paths = [...Array(5).keys()].map((_, i) => ({
    params: { slug: `${i + 1}` },
  }));
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params: { slug } }) {
  return getPageStaticProps({ slug: `/opportunities/${slug}` });
}

export default Index;
