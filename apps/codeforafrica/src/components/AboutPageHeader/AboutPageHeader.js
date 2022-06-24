import { Section, RichTypography } from "@commons-ui/core";
import Box from "@mui/material/Box";
import React from "react";

const AboutPageHeader = React.forwardRef(function AboutPageHeader(props, ref) {
  const { image: imageProp, title, subtitle } = props;

  if (!(title || subtitle)) {
    return null;
  }
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
          px: { xs: 2.5, sm: 0 },
          py: { xs: "86px", sm: "75px", md: "96px" },
          textAlign: "center",
        }}
      >
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
