import { RichTypography, Section } from "@commons-ui/core";
import React from "react";

import CMSContent from "@/codeforafrica/components/CMSContent";

const OurMission = React.forwardRef(function OurMission(props, ref) {
  const { description, subtitle, sx, title } = props;

  if (!title?.length) {
    return null;
  }
  return (
    <React.Fragment ref={ref}>
      <Section sx={sx}>
        <RichTypography variant="h4" sx={{ mb: "30px" }}>
          {title}
        </RichTypography>
        <RichTypography
          variant="h4"
          sx={{ mb: "30px", typography: { md: "h2" } }}
        >
          {subtitle}
        </RichTypography>
        <RichTypography
          sx={{
            mb: "30px",
            "& h2": {
              typography: { xs: "h4", md: "h2" },
            },
            "& p, & li": {
              typography: { xs: "body1", md: "subheading" },
            },
            "& a:visited": {
              color: "primary.main",
            },
          }}
        >
          {description}
        </RichTypography>
      </Section>
      <CMSContent
        TypographyProps={{
          sx: {
            mb: "30px",
            "& h2": {
              typography: { xs: "h4", md: "h2" },
            },
            "& p, & li": {
              typography: { xs: "body1", md: "subheading" },
            },
          },
        }}
      >
        {description}
      </CMSContent>
    </React.Fragment>
  );
});

export default OurMission;
