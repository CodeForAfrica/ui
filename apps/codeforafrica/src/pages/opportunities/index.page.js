import { Section } from "@commons-ui/core";
import React from "react";

import OpportunityCard from "@/codeforafrica/components/OpportunityCard";
import Page from "@/codeforafrica/components/Page";
import PageHeader from "@/codeforafrica/components/PageHeader";
import { getPageStaticProps } from "@/codeforafrica/lib";

function Index({ sections, ...props }) {
  return (
    <Page {...props}>
      {sections?.map((section) => {
        switch (section.slug) {
          case "hero":
            return <PageHeader {...section} key={section.slug} />;
          case "opportunities":
            return (
              <Section>
                <OpportunityCard />
              </Section>
            );
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

export default Index;
