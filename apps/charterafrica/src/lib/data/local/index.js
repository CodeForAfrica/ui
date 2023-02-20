import { payload } from "@/charterafrica/lib";
import { getPageProps } from "@/charterafrica/lib/data/common";

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

export const api = payload;

export async function getPageServerSideProps({
  defaultLocale,
  query,
  resolvedUrl,
  locale,
  locales,
}) {
  const { slugs } = query;

  // Handle paths outside [/knowledge/*, /opportunities/*]
  const allowedPaths = ["knowledge", "opportunities"];

  if (slugs.length > 1) {
    if (!allowedPaths.includes(slugs[0])) {
      return { notFound: true };
    }
  }

  const slug = slugs[slugs.length - 1];

  const props = await getPageProps(slug, payload, {
    defaultLocale,
    locale,
    locales,
    pathname: resolvedUrl,
  });

  if (!props) {
    return { notFound: true };
  }
  return {
    props,
  };
}
