/* eslint-env browser */
import { Section } from "@commons-ui/core";
import PropTypes from "prop-types";
import React from "react";

import LongFormRichText from "@/codeforafrica/components/LongFormRichText";

const CMSContent = React.forwardRef(function CMSContent({ children, sx }, ref) {
  const COMPONENT_BY_CONTENT_TYPE = {
    richText: LongFormRichText,
  };
  return (
    <Section
      component="section"
      sx={{ px: { xs: 2.5, sm: 0 }, ...sx }}
      ref={ref}
    >
      {children.map((c) => {
        const Component = COMPONENT_BY_CONTENT_TYPE[c.blockType];
        if (Component) {
          return <Component {...c} key={c.id} />;
        }
        return null;
      })}
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
