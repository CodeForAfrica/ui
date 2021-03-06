import { Section } from "@commons-ui/core";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import PropTypes from "prop-types";
import React from "react";

import FooterDescription from "./FooterDescription";

import FooterLinks from "@/codeforafrica/components/FooterLinks";
import NewsletterSubscription from "@/codeforafrica/components/NewsletterSubscription";
import StayInTouch from "@/codeforafrica/components/StayInTouch";

const FooterRoot = styled(Box)(
  ({ theme: { breakpoints, palette, typography } }) => ({
    backgroundColor: palette.common.black,
    color: palette.text.secondary,
    padding: `${typography.pxToRem(80)} 0`,
    [breakpoints.up("md")]: {
      padding: `${typography.pxToRem(110)} 0`,
    },
    [breakpoints.up("lg")]: {
      padding: `${typography.pxToRem(100)} 0`,
    },
  })
);

const Footer = React.forwardRef(function Footer(props, ref) {
  const { subscription, description, additionalLinks, socialMedia, menu } =
    props;

  return (
    <FooterRoot component="footer" ref={ref}>
      <Section sx={{ px: { xs: 2.5, sm: 0 } }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4} sx={{ order: { xs: 2, md: 0 } }}>
            <Grid container>
              <Grid
                sx={{ textAlign: { xs: "center", md: "left" } }}
                item
                xs={12}
              >
                <FooterDescription description={description} />
              </Grid>
              <Grid item xs={12}>
                <StayInTouch socialMedia={socialMedia} />
              </Grid>
            </Grid>
          </Grid>
          <Grid
            item
            container
            justifyContent="center"
            xs={12}
            md={4}
            sx={{ order: { xs: 2, md: 1 } }}
          >
            <FooterLinks additionalLinks={additionalLinks} menu={menu} />
          </Grid>
          <Grid item xs={12} md={4} sx={{ order: { md: 2 } }}>
            <NewsletterSubscription {...subscription} />
          </Grid>
        </Grid>
      </Section>
    </FooterRoot>
  );
});

Footer.propTypes = {
  subscription: PropTypes.shape({}),
  menu: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      href: PropTypes.string,
    })
  ),
};

Footer.defaultProps = {
  subscription: undefined,
  menu: undefined,
};

export default Footer;
