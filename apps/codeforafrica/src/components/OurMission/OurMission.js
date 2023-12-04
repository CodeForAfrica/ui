import { Section } from "@commons-ui/core";
import { RichTypography } from "@commons-ui/next";
import React from "react";

import RichText from "@/codeforafrica/components/RichText";

const OurMission = React.forwardRef(function OurMission(props, ref) {
  const { description, subtitle, sx, title } = props;

  if (!title?.length) {
    return null;
  }
  return (
    <Section
      sx={{
        px: { xs: 2.5, sm: 0 },
        my: 10,
        ...sx,
      }}
      ref={ref}
    >
      <RichTypography variant="h4" sx={{ mb: "30px" }}>
        {title}
      </RichTypography>
      <RichTypography
        variant="h4"
        sx={{ mb: "30px", typography: { md: "h2" } }}
      >
        {subtitle}
      </RichTypography>
      <RichText
        elements={description}
        sx={(theme) => ({
          mb: "30px",
          "& h2": {
            typography: { xs: "h4", md: "h2" },
          },
          "& p,& a, & li": {
            typography: { xs: "body1", md: "subheading" },
            mb: 2,
          },
          "& a": {
            textDecorationColor: theme.palette.primary.main,
          },
        })}
      />
    </Section>
  );
});

export default OurMission;
