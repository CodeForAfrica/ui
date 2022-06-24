import { RichTypography, Section } from "@commons-ui/core";
import { Link } from "@commons-ui/next";
import React from "react";

const OurMission = React.forwardRef(function TeamMembers(props, ref) {
  const { action, description, slug, subtitle, title, ...other } = props;

  if (!title?.length) {
    return null;
  }
  const { href, label } = action || {};
  return (
    <Section {...other} ref={ref}>
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
        variant="body1"
        sx={{ mb: "30px", typography: { md: "subheading" } }}
      >
        {description}
      </RichTypography>
      {href?.length > 0 ? (
        <Link color="text.primary" href={href} variant="body3Underline">
          {label || href}
        </Link>
      ) : null}
    </Section>
  );
});

export default OurMission;
