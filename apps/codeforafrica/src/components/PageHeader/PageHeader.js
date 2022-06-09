import { Section, RichTypography } from "@commons-ui/core";
import React from "react";

import TwoToneBackground from "../TwoToneBackground";

const PageHeader = React.forwardRef(function PageHeader(props, ref) {
  const { title, description } = props;
  if (!title && !description) {
    return null;
  }
  return (
    <TwoToneBackground ref={ref} sx={{ backgroundColor: "background.main" }}>
      <Section sx={{ py: 9.6, zIndex: 1, textAlign: "center" }}>
        <RichTypography
          sx={{
            textTransform: "uppercase",
            color: "primary.main",
            paddingBottom: 2.5,
          }}
          variant="h5"
        >
          {title}
        </RichTypography>
        <RichTypography variant="h2">{description}</RichTypography>
      </Section>
    </TwoToneBackground>
  );
});

export default PageHeader;
