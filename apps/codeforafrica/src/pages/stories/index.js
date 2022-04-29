import { Section } from "@commons-ui/core";
import React from "react";

import ArticleCardList from "@/codeforafrica/components/ArticleCardList";
import Page from "@/codeforafrica/components/Page";
import { getPageStaticProps } from "@/codeforafrica/lib";

function Index({ sections, ...props }) {
  return (
    <Page {...props}>
      {sections?.map((section) =>
        section.slug === "articles" ? (
          <Section sx={{ px: { xs: "20px", sm: 0 } }} key={section.slug}>
            <ArticleCardList items={section.articles.slice(1)} />
          </Section>
        ) : null
      )}
    </Page>
  );
}

export async function getStaticProps() {
  return getPageStaticProps({ slug: "/stories" });
}

export default Index;
