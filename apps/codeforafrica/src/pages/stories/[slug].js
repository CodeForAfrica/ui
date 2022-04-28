import React from "react";

import Page from "@/codeforafrica/components/Page";
import RelatedStories from "@/codeforafrica/components/RelatedStories";
import { getPageStaticProps } from "@/codeforafrica/lib";

function Index({ sections, ...props }) {
  return (
    <Page {...props}>
      {sections?.map((section) =>
        section.slug === "related-stories" ? (
          <RelatedStories
            {...section}
            sx={{ px: { xs: "20px", sm: 0 } }}
            key={section.slug}
          />
        ) : null
      )}
    </Page>
  );
}

export async function getStaticPaths() {
  const paths = [...Array(13).keys()].map((_, i) => ({
    params: { slug: `article-${i + 1}` },
  }));
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params: { slug } }) {
  return getPageStaticProps({ slug: `/stories/${slug}` });
}

export default Index;
