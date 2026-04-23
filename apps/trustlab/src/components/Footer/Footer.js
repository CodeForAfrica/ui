import { Section, StayInTouch } from "@commons-ui/core";
import { Link } from "@commons-ui/next";
import { LexicalRichText } from "@commons-ui/payload";
import { Box, Grid2 as Grid } from "@mui/material";
import React from "react";

import FooterDescription from "./FooterDescription";
import Funders from "./Funders";

import LeftImageUrl from "@/trustlab/assets/left-footer-icon.svg?url";
import RightImage from "@/trustlab/assets/right-footer-icon.webp";
import FooterLinks from "@/trustlab/components/FooterLinks";

const Footer = React.forwardRef(function Footer(props, ref) {
  const {
    description,
    secondaryNavigation,
    primaryNavigation,
    logo,
    donorTitle,
    funders = [],
    initiativeAttribution,
    connect = {},
  } = props;
  return (
    <Box
      sx={({ palette }) => ({
        backgroundColor: "common.black",
        color: palette.text.secondary,
        px: 2.5,
        py: 8,
        position: "relative",
        overflow: "hidden",
        backgroundImage: {
          xs: `url(${RightImage.src})`,
          sm: `url(${RightImage.src})`,
          md: `url(${LeftImageUrl}), url(${RightImage.src})`,
        },
        backgroundPosition: {
          xs: "right bottom",
          sm: "right -2px bottom",
          md: "left -30px center, right -2px bottom",
        },
        backgroundRepeat: "no-repeat",
        backgroundSize: {
          xs: "120px auto",
          sm: "152px auto",
          md: "155px auto, 152px auto",
          lg: "155px auto, 240px auto",
        },
      })}
      component="footer"
      ref={ref}
    >
      <Section
        sx={{
          px: { xs: 2.5, sm: 8.5, md: 15, lg: 15 },
        }}
        component="div"
      >
        <Grid container columnSpacing={5} sx={{ mt: 2 }}>
          <Grid order={1} sx={{ mb: 2 }} size={{ xs: 12, sm: 7, md: 4 }}>
            <FooterDescription description={description} logo={logo} />
          </Grid>
          <Grid
            order={2}
            justifyContent={{ xs: "flex-start", md: "center" }}
            display="flex"
            size={{ xs: 12, sm: 5, md: 4 }}
          >
            <FooterLinks
              primaryNavigation={primaryNavigation}
              secondaryNavigation={secondaryNavigation}
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid
            justifyContent={{ xs: "flex-start", md: "center" }}
            display="flex"
            order={{ xs: 4, md: 3 }}
            size={{ xs: 12, sm: 6, md: 3 }}
          >
            <Funders
              sx={{ width: "max-content" }}
              title={donorTitle}
              funders={funders}
            />
          </Grid>
          <Grid
            sx={{ mt: { md: -4, xs: 0 }, mb: 2 }}
            size={{ xs: 12, md: 6 }}
            order={{ xs: 3, md: 4 }}
          >
            <StayInTouch
              links={connect?.links}
              LinkProps={{ component: Link, sx: { mr: 2 } }}
              TitleProps={{
                sx: {
                  textTransform: "uppercase",
                  fontSize: "10px",
                  fontWeight: 700,
                },
              }}
              sx={{ mb: 4 }}
              alignItems="flex-start"
            />
            <LexicalRichText
              elements={initiativeAttribution}
              TypographyProps={{
                gutterBottom: true,
                variant: "p2",
                sx: {
                  mb: 0,
                },
              }}
            />
          </Grid>
        </Grid>
      </Section>
    </Box>
  );
});

export default Footer;
