import React from "react";

import GrantsFellowshipsHeader from "../../components/GrantsFellowshipsHeader";

import FeaturedPostCard from "@/charterafrica/components/FeaturedPostCard";
import Grants from "@/charterafrica/components/Grants";
import HelpdeskPageContent from "@/charterafrica/components/HelpdeskPageContent";
import HelpdeskPageHeader from "@/charterafrica/components/HelpdeskPageHeader";
import PageInfo from "@/charterafrica/components/PageInfo";
import { getPageServerSideProps } from "@/charterafrica/lib/data";

function Opportunities({ blocks }) {
  return blocks?.map((block) => {
    switch (block?.slug) {
      case "featured-post":
        return <FeaturedPostCard {...block} key={block.slug} />;
      case "helpdesk-page-content":
        return <HelpdeskPageContent {...block} key={block.slug} />;
      case "helpdesk-page-header":
        return <HelpdeskPageHeader {...block} key={block.slug} />;
      case "page-info":
        return <PageInfo {...block} key={block.slug} />;
      case "fellowships-and-grants-header":
        return <GrantsFellowshipsHeader {...block} key={block.slug} />;
      case "grants":
        return <Grants {...block} key={block.slug} />;
      case "fellowships":
        return <Grants {...block} key={block.slug} />;
      default:
        return null;
    }
  });
}

export async function getServerSideProps(context) {
  return getPageServerSideProps(context);
}

export default Opportunities;
