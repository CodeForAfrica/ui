/* eslint-env browser */
import { RichTypography, Section } from "@commons-ui/core";
import PropTypes from "prop-types";
import React, { useEffect, useRef } from "react";

const CMSContent = React.forwardRef(function CMSContent(
  { children, sx, TypographyProps },
  ref
) {
  const typographyRef = useRef();
  const openOnNewTab = (href) => (e) => {
    e.preventDefault();
    window.open(href, "_blank", "noreferrer noopener");
  };
  useEffect(() => {
    const { current: el } = typographyRef;
    if (el) {
      const anchors = el.getElementsByTagName("a");
      for (let i = 0; i < anchors.length; i += 1) {
        const { href } = anchors[i];
        const isExternal =
          href.indexOf("http") === 0 || href.indexOf("mailto:") === 0;
        if (isExternal) {
          anchors[i].onclick = openOnNewTab(href);
        }
      }
    }
  }, []);

  return (
    <Section
      component="section"
      sx={{ px: { xs: 2.5, sm: 0 }, ...sx }}
      ref={ref}
    >
      <RichTypography
        {...TypographyProps}
        sx={{
          "& a:visited": {
            color: "primary.main",
          },
          ...TypographyProps.sx,
        }}
        ref={typographyRef}
      >
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
