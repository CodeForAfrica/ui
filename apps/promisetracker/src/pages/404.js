import React from "react";

import ErrorPage from "@/promisetracker/components/ErrorPage";
import articleImage from "@/promisetracker/assets/article-thumb-01.png";

function NotFoundErrorPage(props) {
  return <ErrorPage {...props} />;
}

export async function getStaticProps() {
  const description =
    "Oops!… The page you are looking for cannot be found. Try browsing the menu bar or read one of our recent posts below.";
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
  const title = "Page not found";

  return {
    props: {
      description,
      items,
      title,
    },
  };
}

export default NotFoundErrorPage;
