import React from "react";

import ErrorPage from "@/promisetracker/components/ErrorPage";

import i18n from "@/promisetracker/lib/i18n";
import wp from "@/promisetracker/lib/wp";

function NotFoundErrorPage(props) {
  return <ErrorPage {...props} />;
}

export async function getStaticProps({ locale }) {
  const wpApi = wp();
  const page = await wpApi.pages({ slug: "not-found", locale }).first;
  const posts = await wpApi.pages({ slug: "analysis-articles", locale }).posts;
  const articles = posts?.slice(0, 4) || null;
  const languageAlternates = i18n().languageAlternates("/404");

  return {
    props: {
      ...page,
      articles,
      languageAlternates,
    },
    revalidate: 30 * 60, // seconds
  };
}

export default NotFoundErrorPage;
