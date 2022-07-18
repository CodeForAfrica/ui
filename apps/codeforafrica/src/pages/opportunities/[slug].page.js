import React from "react";

import ArticlePage from "@/codeforafrica/components/ArticlePage";
import Page from "@/codeforafrica/components/Page";
import { getPageStaticProps } from "@/codeforafrica/lib";
import { getAllPostsWithSlug } from "@/codeforafrica/lib/api";

function Index({ opportunity, sections, ...props }) {
  return (
    <Page {...props}>
      {opportunity ? <ArticlePage {...opportunity} /> : null}
    </Page>
  );
}

export async function getStaticPaths() {
  const allOpportunities = (await getAllPostsWithSlug()) || [];
  const paths = allOpportunities.map((post) => ({
    params: { slug: post.slug },
  }));
  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ params: { slug } }) {
  return getPageStaticProps({ slug: `/opportunities/${slug}` });
}

export default Index;
