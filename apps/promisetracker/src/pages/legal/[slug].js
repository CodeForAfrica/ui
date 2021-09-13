import React from "react";

import AboutPage from "@/promisetracker/components/AboutPage";
import backendFn from "@/promisetracker/lib/backend";
import i18n from "@/promisetracker/lib/i18n";
import wp from "@/promisetracker/lib/wp";

function Legal(props) {
  return <AboutPage {...props} />;
}

export async function getStaticPaths() {
  const fallback = false;
  const pages = await wp().pages({ slug: "legal" }).children;
  const unlocalizedPaths = pages.map(({ slug }) => ({ params: { slug } }));
  const paths = i18n().localizePaths(unlocalizedPaths);

  return { fallback, paths };
}

export async function getStaticProps({ params: { slug: slugParam }, locale }) {
  const _ = i18n();
  if (!_.locales.includes(locale)) {
    return {
      notFound: true,
    };
  }

  const backend = backendFn();
  const site = await backend.sites().current;
  const { navigation } = site;
  const slug = slugParam.toLowerCase();
  const pages = await wp().pages({ slug: "legal", locale }).children;
  const index = pages.findIndex((page) => page.slug === slug);
  const notFound = index === -1;
  const errorCode = notFound ? 404 : null;
  const page = pages[index] || null;
  const languageAlternates = _.languageAlternates(`/legal/${slug}`);

  return {
    notFound,
    props: { ...page, errorCode, slug, languageAlternates, navigation },
    revalidate: 2 * 60, // seconds
  };
}

export default Legal;
