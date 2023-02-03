import pageSeoFromMeta from "./seoFromMeta";

import { payload } from "@/charterafrica/lib";

export async function getGlobalProps({ locale, defaultLocale }) {
  const settings = await payload.findGlobal("settings", {
    locale,
    fallbackLocale: defaultLocale,
  });
  const { languages } = settings;
  const { actions, menus } = await payload.findGlobal("navigation", {
    locale,
    fallbackLocale: defaultLocale,
  });
  const navbar = {
    actions,
    languages: languages ?? null,
    logo: {
      alt: "Charter Africa",
      src: "/images/charter-logo.svg",
      href: "/",
      priority: true,
    },
    menus: menus ?? null,
  };
  const footer = await payload.findGlobal("footer", {
    locale,
    fallbackLocale: defaultLocale,
  });

  return { footer, navbar, settings };
}

async function processExplainersPageBlocks({ title, blocks }) {
  const collection = await payload.getCollection("explainers");
  const explainers = collection.docs || null;

  if (explainers?.length) {
    blocks.push({
      slug: "explainers",
      title,
      explainers,
    });
  }
}

async function processPageSpecificBlocks(page) {
  switch (page.slug) {
    case "explainers":
      processExplainersPageBlocks(page);
      break;
    default:
      break;
  }
}

export async function getPageServerSideProps({
  defaultLocale,
  query,
  resolvedUrl,
  locale,
  locales,
}) {
  const { slug } = query;
  const { docs: pages } = await payload.findPage(slug, {
    locale,
    fallbackLocale: defaultLocale,
  });
  if (!pages?.length) {
    return { notFound: true };
  }

  const [page] = pages;
  page.blocks =
    page.blocks?.map(({ blockType, ...other }) => ({
      ...other,
      slug: blockType,
    })) ?? [];
  processPageSpecificBlocks(page);
  const { settings, ...globalProps } = await getGlobalProps({
    defaultLocale,
    locale,
    locales,
  });
  const seo = pageSeoFromMeta(page, settings, {
    locale,
    locales,
    pathname: resolvedUrl,
  });
  return {
    props: {
      ...globalProps,
      ...page,
      seo,
    },
  };
}
