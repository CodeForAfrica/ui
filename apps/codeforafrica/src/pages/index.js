import React from "react";

import NewsAndStories from "@/codeforafrica/components/NewsAndStories";
import Page from "@/codeforafrica/components/Page";
import { getPageStaticProps } from "@/codeforafrica/lib";

function Index({ sections, ...props }) {
  return (
    <Page {...props}>
      {sections?.map((section) =>
        section.slug === "news-stories" ? (
          <NewsAndStories key={section.slug} {...section} />
        ) : null
      )}
    </Page>
  );
}

export async function getStaticProps() {
  return getPageStaticProps({ slug: "/" });
}

export default Index;
