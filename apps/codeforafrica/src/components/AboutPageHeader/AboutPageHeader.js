import { Section, RichTypography } from "@commons-ui/core";
import React from "react";

const AboutPageHeader = React.forwardRef(function AboutPageHeader(props, ref) {
  return (
    <Section ref={ref}>
      <RichTypography>Page Header</RichTypography>
    </Section>
  );
});

export default AboutPageHeader;
