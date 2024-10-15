import { Section } from "@commons-ui/core";
import { RichTypography } from "@commons-ui/next";
import React from "react";

import TwoToneBackground from "../TwoToneBackground";

import RichText from "@/civicsignalblog/components/RichText";

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
        <RichText
          ref={ref}
          typographyProps={{
            fontWeight: "normal",
            variant: "h2",
          }}
          elements={subtitle}
        />
      </Section>
    </TwoToneBackground>
  );
});

export default PageHeader;
