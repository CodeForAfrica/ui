import { Section } from "@commons-ui/core";
import { Link } from "@commons-ui/next";
// import Box from "@mui/material/Box";
import { Grid, Typography, List, ListItem } from "@mui/material";
import { styled } from "@mui/material/styles";
import Image from "next/image";
import PropTypes from "prop-types";
import React from "react";

import cfaIcon from "@/codeforafrica/assets/images/CfAlogoBW.png";
import NewsletterSubscription from "@/codeforafrica/components/NewsletterSubscription";
import StayInTouch from "@/codeforafrica/components/StayInTouch";

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

const LinkRoot = styled(Link)(({ theme: { palette } }) => ({
  textDecoration: "none",
  color: palette.text.secondary,
}));

const FooterDescription = styled(Typography)(({ theme: { typography } }) => ({
  marginTop: typography.pxToRem(50),
}));

const Footer = React.forwardRef(function Footer(props, ref) {
  const { subscription } = props;

  return (
    <FooterRoot ref={ref}>
      <Section>
        <Grid container>
          <Grid item xs={12} md={4}>
            <Grid container>
              <Grid item xs={12}>
                <Image src={cfaIcon} />
                <FooterDescription>
                  This site is a project of Code for Africa, the continent’s
                  largest network of civic technology and data journalism labs.
                  All content is released under a Creative Commons 4 Attribution
                  Licence. Reuse it to help empower your own community.
                </FooterDescription>
              </Grid>
              <Grid item xs={12}>
                <StayInTouch />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={3}>
            <Grid container justifyContent="center">
              <Grid item xs={12}>
                <List>
                  <ListItem>
                    <LinkRoot href="www.ourwork.com">
                      <Typography variant="h5">Our Work</Typography>
                    </LinkRoot>
                  </ListItem>
                  <ListItem>
                    <LinkRoot href="www.about.com">
                      <Typography variant="h5">About</Typography>
                    </LinkRoot>
                  </ListItem>
                  <ListItem>
                    <LinkRoot href="www.stories.com">
                      <Typography variant="h5">Stories</Typography>
                    </LinkRoot>
                  </ListItem>
                  <ListItem>
                    <LinkRoot href="www.opportunities.com">
                      <Typography variant="h5">Opportunities</Typography>
                    </LinkRoot>
                  </ListItem>
                  <ListItem>
                    <LinkRoot href="www.contact.com">
                      <Typography variant="h5">Contact</Typography>
                    </LinkRoot>
                  </ListItem>
                </List>
              </Grid>
              <Grid item xs={12}>
                <List>
                  <ListItem>
                    <LinkRoot href="www.contact.com">
                      <Typography variant="p2">Imprint</Typography>
                    </LinkRoot>
                  </ListItem>
                  <ListItem>
                    <LinkRoot href="www.contact.com">
                      <Typography variant="p2">Privacy policy</Typography>
                    </LinkRoot>
                  </ListItem>
                </List>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={3} sx={{ order: { xs: 0, md: 1 } }}>
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
