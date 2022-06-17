import React from "react";

import CMSContent from "@/codeforafrica/components/CMSContent";
import Page from "@/codeforafrica/components/Page";
import PageHeader from "@/codeforafrica/components/PageHeader";
import { getPageStaticProps } from "@/codeforafrica/lib";

function PrivacyPage({ content, sections, ...props }) {
  return (
    <Page {...props}>
      {sections?.map((section) => {
        switch (section.slug) {
          case "hero":
            return <PageHeader {...section} key={section.slug} />;
          default:
            return null;
        }
      })}
      <CMSContent>{content}</CMSContent>
    </Page>
  );
}

export async function getStaticProps() {
  return getPageStaticProps({ slug: "/privacy" });
}

export default PrivacyPage;
