import React from "react";

import HelpdeskPageContent from "@/charterafrica/components/HelpdeskPageContent";
import HelpdeskPageHeader from "@/charterafrica/components/HelpdeskPageHeader";
import PageInfo from "@/charterafrica/components/PageInfo";
import { getPageServerSideProps } from "@/charterafrica/lib/data";

function Opportunities({ blocks }) {
  return blocks?.map((block) => {
    switch (block?.slug) {
      case "helpdesk-page-content":
        return <HelpdeskPageContent {...block} key={block.slug} />;
      case "helpdesk-page-header":
        return <HelpdeskPageHeader {...block} key={block.slug} />;
      case "page-info":
        return <PageInfo {...block} key={block.slug} />;
      default:
        return null;
    }
  });
}

export async function getServerSideProps(context) {
  return getPageServerSideProps(context);
}

export default Opportunities;
