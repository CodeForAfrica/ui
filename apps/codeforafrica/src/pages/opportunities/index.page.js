import React from "react";

import Opportunities from "@/codeforafrica/components/Opportunities";
import Page from "@/codeforafrica/components/Page";
import PageHeader from "@/codeforafrica/components/PageHeader";
import getPageServerSideProps from "@/codeforafrica/lib/payload/local";

function OpportunitiesPage({ sections, ...props }) {
  return (
    <Page {...props}>
      {sections?.map((section) => {
        switch (section.slug) {
          case "hero":
            return <PageHeader {...section} key={section.slug} />;
          case "opportunities":
            return <Opportunities {...section} key={section.slug} />;
          default:
            return null;
        }
      })}
    </Page>
  );
}

export async function getServerSideProps(context) {
  return getPageServerSideProps(context, "/opportunities");
}

export default OpportunitiesPage;
