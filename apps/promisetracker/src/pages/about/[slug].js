import React from "react";

import AboutPage from "@/promisetracker/components/AboutPage";

import config from "@/promisetracker/config";

function About(props) {
  return <AboutPage {...props} />;
}

export async function getStaticPaths() {
  const fallback = false;
  const slugs = Object.keys(config.pages.about.pages);
  const paths = slugs.map((slug) => ({
    params: { slug },
  }));

  return { fallback, paths };
}

export async function getStaticProps({ params: { slug: slugParam } }) {
  const slug = slugParam.toLowerCase();
  const slugs = Object.keys(config.pages.about.pages);
  const index = slugs.findIndex((pageSlug) => slug === pageSlug);
  const errorCode = index === -1 ? 404 : null;
  const page = errorCode ? {} : config.pages.about.pages[slug];

  return {
    props: {
      ...page,
      errorCode,
      slug,
    },
  };
}

export default About;
