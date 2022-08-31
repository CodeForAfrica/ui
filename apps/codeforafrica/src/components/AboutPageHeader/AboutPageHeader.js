import { Section } from "@commons-ui/core";
import { RichTypography } from "@commons-ui/next";
import Box from "@mui/material/Box";
import React from "react";

import Breadcrumbs from "@/codeforafrica/components/Breadcrumbs";

const AboutPageHeader = React.forwardRef(function AboutPageHeader(props, ref) {
  const { crumbs, image: imageProp, title, subtitle } = props;

  if (!(title || subtitle)) {
    return null;
  }
  const crumbsLineHeight = crumbs?.length ? 23 : 0;
  const image = imageProp?.src || imageProp;
  return (
    <Box
      ref={ref}
      sx={{
        ...(image && {
          backgroundImage: `url('${image}') `,
          backgroundSize: "cover",
          backgroundPositionY: { xs: "30%", md: "45%" },
        }),
        position: "relative",
        width: "100%",
        "&:before": {
          content: "''",
          bgcolor: "primary.main",
          opacity: 0.5,
          position: "absolute",
          top: 0,
          bottom: 0,
          right: 0,
          left: 0,
        },
      }}
    >
      <Section
        sx={{
          color: "text.secondary",
          position: "relative",
          pb: { xs: "86px", sm: "75px", md: "96px" },
          pt: {
            xs: `${86 - crumbsLineHeight}px`,
            sm: `${75 - crumbsLineHeight}px`,
            md: `${96 - crumbsLineHeight}px`,
          },
          px: { xs: 2.5, sm: 0 },
          textAlign: "center",
        }}
      >
        <Breadcrumbs
          crumbs={crumbs}
          sx={{
            color: "text.secondary",
            display: "flex",
            flexBasis: "100%",
            order: { xs: 0 },
            width: "100%",
          }}
        />
        <RichTypography
          component="h2"
          variant="h5ExtraBold"
          sx={{
            pb: 5,
            textTransform: "uppercase",
          }}
        >
          {title}
        </RichTypography>
        <RichTypography
          align="center"
          component="h2"
          variant="h2"
          sx={{ typography: { md: "display2" } }}
        >
          {subtitle}
        </RichTypography>
      </Section>
    </Box>
  );
});

export default AboutPageHeader;
