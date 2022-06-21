import React from "react";

import OpportunityCardList from "@/codeforafrica/components/OpportunityCardList";
import Page from "@/codeforafrica/components/Page";
import PageHeader from "@/codeforafrica/components/PageHeader";
import { getPageStaticProps } from "@/codeforafrica/lib";

function OpportunitiesPage({ sections, ...props }) {
  return (
    <Page {...props}>
      {sections?.map((section) => {
        switch (section.slug) {
          case "hero":
            return <PageHeader {...section} key={section.slug} />;
          case "opportunities":
            return <OpportunityCardList {...section} key={section.slug} />;
          default:
            return null;
        }
      })}
    </Page>
  );
}

export async function getStaticProps() {
  return getPageStaticProps({ slug: "/opportunities" });
}

export default OpportunitiesPage;
