import React from "react";

import AboutPage from "@/promisetracker/components/AboutPage";

import config from "@/promisetracker/config";
import { getSitePageWithChildren } from "@/promisetracker/cms";

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
  const parent = await getSitePageWithChildren("about");
  const index = parent.page.children.findIndex((child) => child.slug === slug);
  const errorCode = index === -1 ? 404 : null;
  const page = errorCode ? {} : parent.page.children[index];
  const about = {
    content: page.content.rendered,
    description: page.acf?.description,
    title: page.title.rendered,
  };
  return {
    props: {
      ...about,
      page: parent.page,
      errorCode,
      slug,
    },
  };
}

export default About;
