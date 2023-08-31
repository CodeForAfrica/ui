import React from "react";

import ArticlePage from "@/codeforafrica/components/ArticlePage";
import Page from "@/codeforafrica/components/Page";
import getPageServerSideProps from "@/codeforafrica/lib/payload/local";

function Index({ opportunity, sections, ...props }) {
  return (
    <Page {...props}>
      {opportunity ? <ArticlePage {...opportunity} /> : null}
    </Page>
  );
}
export async function getServerSideProps(context) {
  const {
    params: { slug },
  } = context;
  return getPageServerSideProps(context, `/opportunities/${slug}`);
}

export default Index;
