import { Section } from "@commons-ui/core";
import { Box, Grid, SvgIcon } from "@mui/material";
import React from "react";

import FooterDescription from "./FooterDescription";
import Funders from "./Funders";

import LeftIcon from "@/trustlab/assets/left-footer-icon.svg";
import RightIcon from "@/trustlab/assets/right-footer-icon.svg";
import { grey } from "@/trustlab/colors";
import FooterLinks from "@/trustlab/components/FooterLinks";

const Footer = React.forwardRef(function Footer(props, ref) {
  const {
    description,
    secondaryNavigation,
    primaryNavigation,
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
        position: "relative",
        overflow: "hidden",
      })}
      component="footer"
      ref={ref}
    >
      <SvgIcon
        component={LeftIcon}
        width="155"
        height="299"
        viewBox="0 0 155 299"
        fill={grey[900]}
        sx={{
          color: "transparent",
          position: "absolute",
          left: { md: -120, lg: -75 },
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 1,
          fontSize: 300,
          display: { xs: "none", sm: "block" },
        }}
      />
      <SvgIcon
        component={RightIcon}
        viewBox="0 0 297 297"
        sx={{
          color: "common.white",
          position: "absolute",
          right: -90,
          bottom: -170,
          zIndex: 1,
          width: "240px",
          height: "240px",
          display: { xs: "none", sm: "block" },
        }}
      />
      <Section
        sx={{
          px: { xs: 2.5, sm: 0 },
        }}
      >
        <Grid container columns={24} justifyContent="space-between">
          <Grid item xs={24} md={16}>
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
                  primaryNavigation={primaryNavigation}
                  secondaryNavigation={secondaryNavigation}
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
