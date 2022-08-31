import { Section } from "@commons-ui/core";
import { RichTypography } from "@commons-ui/next";
import React from "react";

import TwoToneBackground from "@/codeforafrica/components/TwoToneBackground";

const ErrorHero = React.forwardRef(function ErrorHero(props, ref) {
  const { title, subtitle, sx, ...other } = props;

  return (
    <TwoToneBackground
      sx={{ py: { xs: 7.5, md: 10, lg: 12.5 }, ...other?.sx }}
      ref={ref}
    >
      <Section
        sx={{
          maxWidth: {
            sm: "648px",
            md: "912px",
          },
          px: { xs: 2.5, sm: 0 },
          zIndex: 1,
          ...sx,
        }}
      >
        <RichTypography
          sx={{
            paddingBottom: 2.5,
          }}
          variant="h1"
        >
          {title}
        </RichTypography>
        <RichTypography variant="h3Light">{subtitle}</RichTypography>
      </Section>
    </TwoToneBackground>
  );
});

export default ErrorHero;
