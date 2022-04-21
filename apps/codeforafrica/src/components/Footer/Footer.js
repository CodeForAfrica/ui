import { Section } from "@commons-ui/core";
// import Box from "@mui/material/Box";
import { Grid, Typography, List, ListItem } from "@mui/material";
import { styled } from "@mui/material/styles";
import PropTypes from "prop-types";
import Image from "next/image";

import React from "react";
import cfaIcon from "@/codeforafrica/assets/images/CfAlogoBW.png";

import NewsletterSubscription from "@/codeforafrica/components/NewsletterSubscription";

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

const Footer = React.forwardRef(function Footer(props, ref) {
  const { subscription } = props;

  return (
    <FooterRoot ref={ref}>
      <Section>
        <Grid container>
          <Grid item xs={12} md={4}>
            <Image src={cfaIcon} />
            <Typography>
              This site is a project of Code for Africa, the continent’s largest
              network of civic technology and data journalism labs. All content
              is released under a Creative Commons 4 Attribution Licence. Reuse
              it to help empower your own community.
            </Typography>
          </Grid>
          <Grid container item justifyContent="center" xs={12} md={3}>
            <List>
              <ListItem>Our Work</ListItem>
              <ListItem>About</ListItem>
              <ListItem>Stories</ListItem>
              <ListItem>Opportunities</ListItem>
              <ListItem>Contact</ListItem>
            </List>
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
