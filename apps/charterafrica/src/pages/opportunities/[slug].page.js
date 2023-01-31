import React from "react";

import HelpdeskPageContent from "@/charterafrica/components/HelpdeskPageContent";
import HelpdeskPageHeader from "@/charterafrica/components/HelpdeskPageHeader";
import PageInfo from "@/charterafrica/components/PageInfo";
import { payload } from "@/charterafrica/lib";

function Index({ blocks }) {
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

export async function getServerSideProps({
  defaultLocale,
  locale,
  locales,
  query,
}) {
  const { slug } = query;
  const { docs: pages } = await payload.findPage(slug, {
    locale,
    fallbackLocale: defaultLocale,
  });

  if (!pages?.length) {
    return { notFound: true };
  }

  const blocks =
    pages[0].blocks?.map(({ blockType, ...other }) => ({
      ...other,
      slug: blockType,
    })) ?? [];
  const { actions, menus } = await payload.findGlobal("navigation", {
    locale,
    fallbackLocale: defaultLocale,
  });
  const { languages } = await payload.findGlobal("settings", {
    locale,
    fallbackLocale: defaultLocale,
  });
  const footer = await payload.findGlobal("footer", {
    locale,
    fallbackLocale: defaultLocale,
  });
  return {
    props: {
      blocks,
      footer,
      navbar: {
        actions,
        languages: languages ?? null,
        logo: {
          alt: "The CHARTER PROJECT Africa",
          src: "/images/charter-logo.svg",
          href: "/",
          priority: true,
        },
        menus: menus ?? null,
      },
      locale,
      locales,
      seo: {
        title: "charter.AFRICA",
      },
    },
  };
}

export default Index;
