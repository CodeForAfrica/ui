import React from "react";
import PropTypes from "prop-types";

import Error from "@/promisetracker/pages/_error";

import Base from "./Base";

/**
 * Page component that adds error handling.
 */
function Page({ errorCode, ...props }) {
  if (errorCode) {
    return <Error statusCode={errorCode} />;
  }
  return <Base {...props} />;
}

Page.propTypes = {
  errorCode: PropTypes.number,
};

Page.defaultProps = {
  errorCode: undefined,
};

export default Page;
