import { Section, StayInTouch } from "@commons-ui/core";
import { Link, NewsletterSubscription } from "@commons-ui/next";
import { Box, Grid } from "@mui/material";
import React from "react";

import FooterDescription from "./FooterDescription";

import FooterLinks from "@/trustlab/components/FooterLinks";

const Footer = React.forwardRef(function Footer(props, ref) {
  const {
    connect,
    description,
    logo,
    newsletter,
    primaryMenus,
    secondaryMenus,
  } = props;

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
        <Grid
          container
          sx={{ flexGrow: 1, width: "100%" }}
          columns={24}
          justifyContent="space-between"
        >
          <Grid
            size={{
              xs: 24,
              md: 15,
              lg: 16,
            }}
            order={{ xs: 1, md: 0 }}
          >
            <Grid
              container
              sx={{ flexGrow: 1, width: "100%" }}
              justifyContent="space-between"
            >
              <Grid
                size={{ xs: 12, md: "auto" }}
                container
                sx={{
                  width: "100%",
                  flexGrow: 1,
                  maxWidth: { xs: "none", md: "337px" },
                }}
              >
                <Grid>
                  <FooterDescription
                    description={description}
                    logo={logo}
                    sx={{ mt: { xs: 10, md: 0 } }}
                  />
                </Grid>
                <Grid sx={{ width: { xs: "100%", md: "auto" } }}>
                  <StayInTouch
                    {...connect}
                    LinkProps={{ component: Link }}
                    TitleProps={{ variant: "footerCap" }}
                    sx={{ mt: "52px" }}
                  />
                </Grid>
              </Grid>
              <Grid
                size={{
                  xs: 12,
                }}
                sx={{
                  width: { xs: "100%", md: "auto" },
                  px: 24,
                }}
              >
                <FooterLinks
                  primaryMenus={primaryMenus}
                  secondaryMenus={secondaryMenus}
                  sx={{ mt: { xs: "52px", md: 0 } }}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid
            size={{
              xs: 24,
              md: "auto",
            }}
            order={{ xs: 0, md: 1 }}
            sx={{ width: { xs: "100%", md: "auto" } }}
          >
            <NewsletterSubscription {...newsletter} />
          </Grid>
        </Grid>
      </Section>
    </Box>
  );
});

export default Footer;
