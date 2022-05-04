import { Section } from "@commons-ui/core";
import { Grid } from "@mui/material";
import { styled } from "@mui/material/styles";
import PropTypes from "prop-types";
import React from "react";

import FooterDescription from "./FooterDescription";

import FooterLinks from "@/codeforafrica/components/FooterLinks";
import NewsletterSubscription from "@/codeforafrica/components/NewsletterSubscription";
import StayInTouch from "@/codeforafrica/components/StayInTouch";
import { socialMedia, footerLinks, footer } from "@/codeforafrica/config";

const FooterRoot = styled("footer")(
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

const DescriptionGrid = styled(Grid)(({ theme: { breakpoints } }) => ({
  textAlign: "center",
  [breakpoints.up("md")]: {
    textAlign: "left",
  },
}));

const Footer = React.forwardRef(function Footer(props, ref) {
  const { subscription } = props;
  const { description } = footer;

  return (
    <FooterRoot ref={ref}>
      <Section sx={{ px: { xs: "20px", sm: 0 } }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <Grid container>
              <DescriptionGrid item xs={12}>
                <FooterDescription description={description} />
              </DescriptionGrid>
              <Grid item xs={12}>
                <StayInTouch socialMedia={socialMedia} />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={4}>
            <Grid container justifyContent="center">
              <Grid item container justifyContent="center" xs={12}>
                <FooterLinks footerLinks={footerLinks} />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={4} sx={{ order: { xs: 0, md: 1 } }}>
            <NewsletterSubscription {...subscription} />
          </Grid>
        </Grid>
      </Section>
    </FooterRoot>
  );
});

Footer.propTypes = {
  subscription: PropTypes.shape({}),
};

Footer.defaultProps = {
  subscription: undefined,
};

export default Footer;
