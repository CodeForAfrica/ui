import React from "react";

import Articles from "@/codeforafrica/components/Articles";
import Page from "@/codeforafrica/components/Page";
import { getPageStaticProps } from "@/codeforafrica/lib";

function Index({ sections, ...props }) {
  return (
    <Page {...props}>
      {sections?.map((section) =>
        section.slug === "stories" ? (
          <Articles {...section} key={section.slug} />
        ) : null
      )}
    </Page>
  );
}

export async function getStaticProps() {
  return getPageStaticProps({ slug: "/stories" });
}

export default Index;
