import { Section } from "@commons-ui/core";
import { Box, Grid2 as Grid, SvgIcon } from "@mui/material";
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
        backgroundColor: "common.black",
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
          left: -130,
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
        }}
      />
      <Section
        sx={{
          px: { xs: 2.5, sm: 0 },
        }}
      >
        <Grid container spacing={4} sx={{ mt: 2 }}>
          <Grid size={{ xs: 12, sm: 5, md: 5 }}>
            <FooterDescription description={description} logo={logo} />
          </Grid>
          <Grid size={{ xs: 12, sm: 5, md: 3 }}>
            <FooterLinks
              primaryNavigation={primaryNavigation}
              secondaryNavigation={secondaryNavigation}
              sx={{ mt: { xs: "52px", md: 0 }, mb: 2 }}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <Funders
              sx={{ width: "max-content" }}
              title={donorTitle}
              funders={funders}
            />
          </Grid>
        </Grid>
      </Section>
    </Box>
  );
});

export default Footer;
