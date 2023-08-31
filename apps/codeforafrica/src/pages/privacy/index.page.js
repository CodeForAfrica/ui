import React from "react";

import CMSContent from "@/codeforafrica/components/CMSContent";
import Page from "@/codeforafrica/components/Page";
import PageHeader from "@/codeforafrica/components/PageHeader";
import getPageServerSideProps from "@/codeforafrica/lib/payload/data/local";

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
      <CMSContent sx={{ my: { xs: 7, md: 12.5 } }}>{content}</CMSContent>
    </Page>
  );
}

export async function getServerSideProps(context) {
  return getPageServerSideProps(context, "/privacy");
}

export default PrivacyPage;
