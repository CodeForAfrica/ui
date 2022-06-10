import { Section, RichTypography } from "@commons-ui/core";
import React from "react";

import TwoToneBackground from "../TwoToneBackground";

const PageHeader = React.forwardRef(function PageHeader(props, ref) {
  const { title, subtitle } = props;
  if (!title && !subtitle) {
    return null;
  }

  return (
    <TwoToneBackground ref={ref} sx={{ backgroundColor: "background.main" }}>
      <Section
        sx={{
          py: { xs: 3.75, sm: 5.5, md: 6.75, lg: 9.6 },
          zIndex: 1,
          textAlign: "center",
        }}
      >
        <RichTypography
          sx={{
            color: "primary.main",
            paddingBottom: 2.5,
          }}
          variant="h5ExtraBold"
        >
          {title}
        </RichTypography>
        <RichTypography variant="h2">{subtitle}</RichTypography>
      </Section>
    </TwoToneBackground>
  );
});

export default PageHeader;
