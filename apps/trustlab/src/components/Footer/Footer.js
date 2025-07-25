import { Section } from "@commons-ui/core";
import { Box, Grid } from "@mui/material";
import React from "react";

import FooterDescription from "./FooterDescription";
import Funders from "./Funders";

import { grey } from "@/trustlab/colors";
import FooterLinks from "@/trustlab/components/FooterLinks";

const Footer = React.forwardRef(function Footer(props, ref) {
  const {
    description,
    primaryMenus,
    secondaryMenus,
    logo,
    donorTitle,
    funders = [],
  } = props;

  return (
    <Box
      sx={({ palette }) => ({
        backgroundColor: grey[900],
        color: palette.text.secondary,
        px: 0,
        py: 8,
      })}
      component="footer"
      ref={ref}
    >
      <Section
        sx={(theme) => ({
          px: { xs: 2.5, sm: 0 },
          maxWidth: {
            xs: "100%",
            sm: theme.breakpoints.values.sm,
            md: theme.breakpoints.values.sm,
            lg: theme.breakpoints.values.sm,
            xl: theme.breakpoints.values.sm,
          },
        })}
      >
        {/* Increase number of columns to getter columns size */}
        <Grid container columns={24} justifyContent="space-between">
          <Grid item xs={24} md={17}>
            <Grid container justifyContent="space-between">
              <Grid
                item
                xs={12}
                md="auto"
                container
                direction="column"
                sx={{
                  maxWidth: { xs: "none", md: "337px" },
                }}
              >
                <Grid item>
                  <FooterDescription description={description} logo={logo} />
                </Grid>
              </Grid>
              <Grid item xs={12} md="auto">
                <FooterLinks
                  primaryMenus={primaryMenus}
                  secondaryMenus={secondaryMenus}
                  sx={{ mt: { xs: "52px", md: 0 }, mb: 2 }}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={24} md="auto" sx={{ order: { xs: 0, md: 1 } }}>
            <Funders title={donorTitle} funders={funders} />
          </Grid>
        </Grid>
      </Section>
    </Box>
  );
});

export default Footer;
