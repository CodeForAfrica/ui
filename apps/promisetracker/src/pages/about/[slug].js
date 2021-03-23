import React from "react";

import AboutPage from "@/promisetracker/components/AboutPage";

import i18n from "@/promisetracker/lib/i18n";
import wp from "@/promisetracker/lib/wp";

function Legal(props) {
  return <AboutPage {...props} />;
}

export async function getStaticPaths() {
  const fallback = true;
  const pages = await wp().pages({ slug: "about" }).children;
  const unlocalizedPaths = pages.map(({ slug }) => ({ params: { slug } }));
  const paths = i18n().localizePaths(unlocalizedPaths);

  return { fallback, paths };
}

export async function getStaticProps({
  params: { slug: slugParam },
  locale,
  preview = false,
  previewData,
}) {
  const _ = i18n();
  if (!_.locales.includes(locale)) {
    return {
      notFound: true,
    };
  }

  const slug = slugParam.toLowerCase();
  const pages = await wp().pages({ slug: "legal", locale }).children;
  const index = pages.findIndex((page) => page.slug === slug);
  const notFound = index === -1;
  const errorCode = notFound ? 404 : null;
  let page;
  if (preview && previewData) {
    page = await wp().revisions(previewData.query).page;
  } else {
    page = pages[index] || null;
  }
  const languageAlternates = _.languageAlternates(`/about/${slug}`);
  if (!page && preview) {
    return {
      redirect: {
        permanent: false,
        destination: "/preview-error",
      },
    };
  }
  return {
    notFound,
    props: { ...page, errorCode, languageAlternates, slug },
    revalidate: 2 * 60, // seconds
  };
}

export default Legal;
