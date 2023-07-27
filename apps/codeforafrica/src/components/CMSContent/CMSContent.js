/* eslint-env browser */
import { Section } from "@commons-ui/core";
import { RichTypography } from "@commons-ui/next";
import PropTypes from "prop-types";
import React from "react";

const CMSContent = React.forwardRef(function CMSContent(
  { children, sx, TypographyProps },
  ref
) {
  return (
    <Section
      component="section"
      sx={{ px: { xs: 2.5, sm: 0 }, ...sx }}
      ref={ref}
    >
      <RichTypography {...TypographyProps} ref={ref}>
        {children}
      </RichTypography>
    </Section>
  );
});

CMSContent.propTypes = {
  sx: PropTypes.shape({}),
};

CMSContent.defaultProps = {
  sx: undefined,
};

export default CMSContent;
