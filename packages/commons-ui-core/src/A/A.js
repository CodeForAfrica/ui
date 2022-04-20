import Link from "@mui/material/Link";
import PropTypes from "prop-types";
import React from "react";

/**
 * anchor element that has `target="_blank" rel: "noopener noreferrer"`
 * see: https://material-ui.com/components/links/#security
 */
const A = React.forwardRef(function A({ children, href, ...props }, ref) {
  return (
    <Link
      {...props}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      ref={ref}
    >
      {children}
    </Link>
  );
});

A.propTypes = {
  children: PropTypes.node.isRequired,
  href: PropTypes.string.isRequired,
};

export default A;
