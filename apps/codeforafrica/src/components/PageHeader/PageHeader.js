import { Section, RichTypography } from "@commons-ui/core";
import React from "react";

import TwoToneBackground from "../TwoToneBackground";

const PageHeader = React.forwardRef(function PageHeader(props, ref) {
  const { title, subtitle } = props;

  if (!(title || subtitle)) {
    return null;
  }
  return (
    <TwoToneBackground ref={ref} sx={{ backgroundColor: "background.main" }}>
      <Section
        sx={{
          px: { xs: 2.5, sm: 0 },
          py: { xs: 3.75, sm: 5.5, md: 6.75, lg: 9.6 },
          zIndex: 1,
          textAlign: "center",
        }}
      >
        <RichTypography
          component="h2"
          sx={{
            color: "primary.main",
            paddingBottom: 2.5,
            textTransform: "uppercase",
          }}
          variant="h5ExtraBold"
        >
          {title}
        </RichTypography>
        <RichTypography component="h2" variant="h2">
          {subtitle}
        </RichTypography>
      </Section>
    </TwoToneBackground>
  );
});

export default PageHeader;
