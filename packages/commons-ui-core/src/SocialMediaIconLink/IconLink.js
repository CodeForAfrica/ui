import { Link, SvgIcon } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";

const IconLink = React.forwardRef(function LinkIcon(
  { IconProps, children, ...props },
  ref,
) {
  return (
    <Link {...props} ref={ref}>
      <SvgIcon {...IconProps}> {children}</SvgIcon>
    </Link>
  );
});

IconLink.propTypes = {
  IconProps: PropTypes.shape({}),
  children: PropTypes.node,
};

export default IconLink;
