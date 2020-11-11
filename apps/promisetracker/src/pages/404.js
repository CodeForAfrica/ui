import React from "react";

import ErrorPage from "@/promisetracker/components/ErrorPage";

import i18n from "@/promisetracker/lib/i18n";
import wp from "@/promisetracker/lib/wp";

import articleImage from "@/promisetracker/assets/article-thumb-01.png";

function NotFoundErrorPage(props) {
  return <ErrorPage {...props} />;
}

export async function getStaticProps({ locale }) {
  const page = await wp().pages({ slug: "not-found", locale }).first;
  const items = Array(3)
    .fill(null)
    .map((_, i) => ({
      id: i,
      date: "2019-08-10",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer euismod odio non leo pretium pellentesque.",
      image: articleImage,
      title: "Codification of national sports and athletics law",
    }));
  const languageAlternates = i18n().languageAlternates("/404");

  return {
    props: {
      ...page,
      items,
      languageAlternates,
    },
    revalidate: 30 * 60, // seconds
  };
}

export default NotFoundErrorPage;
