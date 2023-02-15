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
  const { slug } = query;
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
