import { Section } from "@commons-ui/core";
import { Figure } from "@commons-ui/next";
import { Box, Grid } from "@mui/material";
import React from "react";

import { secondary } from "@/charterafrica/colors";
import RichText from "@/charterafrica/components/RichText";

const Impressum = React.forwardRef(function Impressum(props, ref) {
  const { content, image, sx } = props;

  if (!content) {
    return null;
  }
  return (
    <Box bgcolor={secondary[50]} sx={sx} ref={ref}>
      <Section
        sx={{
          px: { xs: 5, sm: 0 },
          py: { xs: 5, md: "74.5px" },
        }}
      >
        <Grid container justifyContent="space-between" spacing={5}>
          {image?.url?.length > 0 ? (
            <Grid item xs={12} md="auto" order={{ xs: 0, md: 1 }}>
              <Figure
                sx={{
                  alignItems: "center",
                  backgroundColor: "common.white",
                  boxShadow: "px 6px 12px rgba(0, 0, 0, 0.1)",
                  borderRadius: 5,
                  display: "flex",
                  justifyContent: "center",
                  maxWidth: { xs: "100%", md: "270px" },
                  minHeight: { xs: "auto", sm: "390px", md: "187px" },
                  overflow: "hidden",
                  objectFit: {
                    xs: "fill",
                    md: "contain",
                  },
                }}
                ImageProps={{
                  alt: image.alt,
                  fill: false,
                  height: 0,
                  priority: true,
                  src: image.url,
                  style: {
                    height: "auto",
                    objectFit: "inherit",
                    width: "100%",
                  },
                  width: 0,
                }}
              />
            </Grid>
          ) : null}
          <Grid item xs={12} md order={{ xs: 1, md: 0 }}>
            <Box
              color="neutral.dark"
              sx={(theme) => ({
                "& h1": {
                  ...theme.typography.h1Small,
                  mb: 3.75,
                  [theme.breakpoints.up("md")]: {
                    ...theme.typography.h1,
                  },
                },
                "& h2": {
                  mb: 2.5,
                  ...theme.typography.h2Small,
                  [theme.breakpoints.up("md")]: {
                    ...theme.typography.h2,
                  },
                },
                "& p": {
                  ...theme.typography.p1,
                  mb: 2,
                  [theme.breakpoints.up("md")]: {
                    ...theme.typography.subheading,
                  },
                },
                "& p:last-of-type": {
                  mb: 0,
                },
              })}
            >
              <RichText color="neutral.dark" elements={content} />
            </Box>
          </Grid>
        </Grid>
      </Section>
    </Box>
  );
});

export default Impressum;
