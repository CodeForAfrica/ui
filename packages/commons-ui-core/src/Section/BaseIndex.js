import PropTypes from "prop-types";
import React from "react";

import { RichTypography, Layout } from "@commons-ui/core";

const Section = React.forwardRef(function Section(
  { children, className, title, titleProps, ...props },
  ref
) {
  if (!children) {
    return null;
  }
  return (
    <Layout {...props} ref={ref}>
      {title?.length ? (
        <RichTypography variant="h2" {...titleProps}>
          {title}
        </RichTypography>
      ) : null}

      {children}
    </Layout>
  );
});

Section.propTypes = {
  className: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  classes: PropTypes.shape({
    root: PropTypes.string,
    fixed: PropTypes.string,
  }),
  title: PropTypes.string,
  titleProps: PropTypes.shape({}),
};

Section.defaultProps = {
  classes: undefined,
  className: undefined,
  title: undefined,
  titleProps: undefined,
};

export default Section;
