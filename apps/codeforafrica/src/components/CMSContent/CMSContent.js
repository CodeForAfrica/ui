import { RichTypography, Section } from "@commons-ui/core";
import PropTypes from "prop-types";
import React from "react";

const CMSContent = React.forwardRef(function CMSContent({ children, sx }, ref) {
  return (
    <Section sx={{ px: { xs: 2.5, sm: 0 }, ...sx }} ref={ref}>
      <RichTypography>{children}</RichTypography>
    </Section>
  );
});

CMSContent.propTypes = {
  children: PropTypes.node,
};

CMSContent.defaultProps = {
  children: undefined,
};

export default CMSContent;
