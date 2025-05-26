import { Section, StayInTouch } from "@commons-ui/core";
import { Link, HtmlEmbed } from "@commons-ui/next";
import { Box, Grid } from "@mui/material";
import React from "react";

import FooterDescription from "./FooterDescription";

import FooterLinks from "@/trustlab/components/FooterLinks";

const Footer = React.forwardRef(function Footer(props, ref) {
  const { connect, description, newsletter, primaryMenus, secondaryMenus } =
    props;

  const htmlEmbedStyles = (theme) => ({
    "& #mc_embed_signup": {
      typography: "body1",
      backgroundColor: "unset",
      color: "inherit",
      width: "100%",
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
      border: `1px solid ${theme.palette?.text?.secondary}`,
      color: "inherit",
      padding: `${theme.typography.pxToRem(6)} ${theme.typography.pxToRem(12)}`,
      textDecoration: "none",
    },
    "& #mc_embed_signup input[type=submit]:hover": {
      cursor: "pointer",
      background: theme.palette?.text?.secondary,
      color: theme.palette?.text?.primary,
    },
  });

  return (
    <Box
      sx={({ palette }) => ({
        backgroundColor: palette.common.black,
        color: palette.text.secondary,
        px: 0,
        py: { xs: 10, md: 13.75, lg: 12.5 },
      })}
      component="footer"
      ref={ref}
    >
      <Section sx={{ px: { xs: 2.5, sm: 0 } }}>
        {/* Increase number of columns to getter columns size */}
        <Grid container columns={24} justifyContent="space-between">
          <Grid
            item
            xs={24}
            md={15}
            lg={16}
            sx={{
              order: { xs: 1, md: 0 },
            }}
          >
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
                  <FooterDescription
                    description={description}
                    logo={null}
                    sx={{ mt: { xs: 10, md: 0 } }}
                  />
                </Grid>
                <Grid item>
                  <StayInTouch
                    {...connect}
                    LinkProps={{ component: Link }}
                    TitleProps={{ variant: "footerCap" }}
                    sx={{ mt: "52px" }}
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
              {...newsletter}
            />
          </Grid>
        </Grid>
      </Section>
    </Box>
  );
});

export default Footer;
