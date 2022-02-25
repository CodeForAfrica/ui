import React from "react";

import ErrorPage from "@/promisetracker/components/ErrorPage";
import backendFn from "@/promisetracker/lib/backend";
import i18n from "@/promisetracker/lib/i18n";
import wp from "@/promisetracker/lib/wp";

function GeneralError(props) {
  return <ErrorPage {...props} />;
}

export async function getStaticProps({ locale }) {
  const backend = backendFn();
  const site = await backend.sites().current;
  const { navigation } = site;
  const wpApi = wp();
  const page = await wpApi.pages({ slug: "error", locale }).first;
  const posts = await wpApi.pages({ slug: "analysis-articles", locale }).posts;
  const articles = posts?.slice(0, 4) || null;
  const languageAlternates = i18n().languageAlternates("/500");

  return {
    props: {
      ...page,
      articles,
      languageAlternates,
      navigation,
    },
    revalidate: 30 * 60, // seconds
  };
}

export default GeneralError;
