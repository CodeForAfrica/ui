
import PropTypes from "prop-types";
import React from "react";

import Navigation from "@/codeforafrica/components/Navigation";

function Page({ children }) {
  return <Navigation>{children}</Navigation>;
}

Page.propTypes = {
  children: PropTypes.node,
};

Page.defaultProps = {
  children: undefined,
};

export default Page;
