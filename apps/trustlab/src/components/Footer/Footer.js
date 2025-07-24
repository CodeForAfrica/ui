import { Section } from "@commons-ui/core";
import { HtmlEmbed } from "@commons-ui/next";
import { Box, Grid } from "@mui/material";
import React from "react";

import FooterDescription from "./FooterDescription";

import { grey } from "@/trustlab/colors";
import FooterLinks from "@/trustlab/components/FooterLinks";

const Footer = React.forwardRef(function Footer(props, ref) {
  const { description, newsletter, primaryMenus, secondaryMenus, logo } = props;

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
      <Section sx={{ px: { xs: 2.5, sm: 0 } }}>
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
                  <FooterDescription description={description} logo={logo} />
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
  );
});

export default Footer;
