import React from "react";
import PropTypes from "prop-types";

import ErrorPage from "@/promisetracker/components/ErrorPage";
import articleImage from "@/promisetracker/assets/article-thumb-01.png";

function CustomErrorPage(props) {
  return <ErrorPage {...props} />;
}

CustomErrorPage.propTypes = {
  description: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.shape({})),
  title: PropTypes.string,
};

CustomErrorPage.defaultProps = {
  description:
    "Oops!… Looks something broke and we can't deliver on your request. We <em>promise</em> to do better next time.",
  items: Array(3)
    .fill(null)
    .map((_, i) => ({
      id: i,
      date: "2019-08-10",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer euismod odio non leo pretium pellentesque.",
      image: articleImage,
      title: "Codification of national sports and athletics law",
    })),
  title: "Promise not kept",
};

export default CustomErrorPage;
