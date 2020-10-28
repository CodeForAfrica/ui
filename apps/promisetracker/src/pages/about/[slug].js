import React from "react";

import AboutPage from "@/promisetracker/components/AboutPage";

import wp from "@/promisetracker/lib/wp";

function Legal(props) {
  return <AboutPage {...props} />;
}

export async function getStaticPaths() {
  const fallback = false;
  const pages = await wp().pages({ slug: "legal" }).children;
  const paths = pages.map(({ slug }) => ({ params: { slug } }));

  return { fallback, paths };
}

export async function getStaticProps({ params: { slug: slugParam } }) {
  const slug = slugParam.toLowerCase();
  const pages = await wp().pages({ slug: "legal" }).children;
  const index = pages.findIndex((page) => page.slug === slug);
  const errorCode = index === -1 ? 404 : null;
  const page = pages[index] || null;

  return {
    props: { ...page, errorCode, slug },
    revalidate: 2 * 60, // seconds
  };
}

export default Legal;
