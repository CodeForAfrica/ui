import React from "react";

import ArticleGrid from "@/codeforafrica/components/ArticleGrid";
import Page from "@/codeforafrica/components/Page";
import { getPageStaticProps } from "@/codeforafrica/lib";

function Index({ sections, ...props }) {
  return (
    <Page {...props}>
      {sections?.map((section) =>
        section.slug === "articles" ? (
          <ArticleGrid {...section} key={section.slug} />
        ) : null
      )}
    </Page>
  );
}

export async function getStaticProps() {
  return getPageStaticProps({ slug: "/stories" });
}

export default Index;
