import { Section, StayInTouch } from "@commons-ui/core";
import { Link, HtmlEmbed } from "@commons-ui/next";
import { Box, Grid } from "@mui/material";
import React from "react";

import FooterDescription from "./FooterDescription";

import DonorOverviewList from "@/trustlab/components/DonorOverviewList";
import FooterLinks from "@/trustlab/components/FooterLinks";
import PartnerOverviewList from "@/trustlab/components/PartnerOverviewList";

const Footer = React.forwardRef(function Footer(props, ref) {
  const {
    connect,
    description,
    newsletter,
    primaryMenus,
    secondaryMenus,
    partners = [],
    partnerTitle = "Partners",
    donors = [],
    donorTitle = "Donors",
  } = props;

  const htmlEmbedStyles = (theme) => ({
    "& #mc_embed_signup": {
      typography: "body1",
      backgroundColor: "unset",
      color: "inherit",
      width: "100%",
    },
    "& #mc_embed_signup label": {
      fontFamily: "Barlow",
      fontSize: "14px",
      lineHeight: "23px",
      fontWeight: 400,
    },
    "& #mc_embed_signup input[type=text], & #mc_embed_signup input[type=email]":
      {
        typography: "body1",
        border: "1px solid #D0CBCB",
        borderRadius: 0,
        display: "flex",
        height: theme.typography.pxToRem(36),
        marginTop: 0,
        marginBottom: theme.typography.pxToRem(30),
        outline: "none",
        padding: `0 ${theme.typography.pxToRem(12)}`,
        width: "100%",
      },
    "& #mc_embed_signup input::placeholder": {
      color: "#D0CBCB",
      opacity: 1.0,
      WebkitTextFillColor: "#D0CBCB",
    },
    "& #mc_embed_signup input:focus,  #mc_embed_signup textarea:focus": {
      border: `1px solid ${theme.palette?.primary?.main}`,
    },
    "& #mc_embed_signup input:active,  #mc_embed_signup textarea:active": {
      border: `1px solid ${theme.palette?.highlight?.main}`,
    },
    "& #mc_embed_signup input[type=submit]": {
      typography: "subtitle1",
      background: "none",
      border: `none`,
      color: "inherit",
      padding: 0,
      textDecoration: "underline",
      fontFamily: "Barlow",
      fontSize: "16px",
      lineHeight: "24px",
      fontWeight: 600,
      textAlign: "center",
      width: "100%",
      [theme.breakpoints.up("md")]: {
        cursor: "pointer",
        width: "unset",
      },
    },
    "& #mc_embed_signup input[type=submit]:hover": {
      cursor: "pointer",
    },
  });

  return (
    <Section
      component="footer"
      sx={{ maxWidth: { md: "100%" } }}
      fixed={false}
      ref={ref}
    >
      <DonorOverviewList donors={donors} title={donorTitle} />
      <PartnerOverviewList partners={partners} title={partnerTitle} />
      <Box
        sx={({ palette }) => ({
          backgroundColor: palette.common.black,
          color: palette.text.secondary,
          px: 0,
          py: 8,
        })}
      >
        <Section component="div" sx={{ px: { xs: 2.5, sm: 0 } }}>
          {/* Increase number of columns to getter columns size */}
          <Grid container columns={24} justifyContent="space-between">
            <Grid item xs={24} md={15} lg={16}>
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
                    <FooterDescription description={description} logo={null} />
                  </Grid>
                  <Grid item>
                    <StayInTouch
                      {...connect}
                      LinkProps={{ component: Link }}
                      TitleProps={{
                        sx: {
                          textTransform: "uppercase",
                          fontSize: "10px",
                          fontWeight: 700,
                          mb: 0,
                          mr: 4,
                        },
                      }}
                      sx={{
                        mt: "52px",
                        justifyContent: { xs: "center", md: "flex-start" },
                      }}
                      direction="row"
                    />
                  </Grid>
                </Grid>
                <Grid item xs={12} md="auto">
                  <FooterLinks
                    primaryMenus={primaryMenus}
                    secondaryMenus={secondaryMenus}
                    sx={{ mt: { xs: "52px", md: 0 } }}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={24} md="auto" sx={{ order: { xs: 0, md: 1 } }}>
              <HtmlEmbed
                EmbedCodeProps={{ sx: htmlEmbedStyles }}
                TitleProps={{
                  fontSize: "23px",
                  lineHeight: "28px",
                  letterSpacing: "-2%",
                  fontFamily: "Barlow",
                  textAlign: { xs: "center", md: "left" },
                  mt: { xs: 8, md: 0 },
                }}
                {...newsletter}
              />
            </Grid>
          </Grid>
        </Section>
      </Box>
    </Section>
  );
});

export default Footer;
