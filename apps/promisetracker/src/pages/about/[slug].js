import React from "react";

import AboutPage from "@/promisetracker/components/AboutPage";

import i18n from "@/promisetracker/lib/i18n";
import wp from "@/promisetracker/lib/wp";

function Legal(props) {
  return <AboutPage {...props} />;
}

export async function getStaticPaths() {
  const fallback = false;
  const pages = await wp().pages({ slug: "about" }).children;
  const unlocalizedPaths = pages.map(({ slug }) => ({ params: { slug } }));
  const paths = i18n().localizePaths(unlocalizedPaths);

  return { fallback, paths };
}

export async function getStaticProps({ params: { slug: slugParam }, locale }) {
  const slug = slugParam.toLowerCase();
  const pages = await wp().pages({ slug: "about", locale }).children;
  const index = pages.findIndex((page) => page.slug === slug);
  const notFound = index === -1;
  const errorCode = notFound ? 404 : null;
  const page = pages[index] || null;

  return {
    notFound,
    props: { ...page, errorCode, slug },
    revalidate: 2 * 60, // seconds
  };
}

export default Legal;
