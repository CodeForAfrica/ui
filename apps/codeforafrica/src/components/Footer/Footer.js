import { Section } from "@commons-ui/core";
import { Link } from "@commons-ui/next";
import { Grid, Typography, List, ListItem } from "@mui/material";
import { styled } from "@mui/material/styles";
import Image from "next/image";
import PropTypes from "prop-types";
import React from "react";

import cfaIcon from "@/codeforafrica/assets/images/CfAlogoBW.png";
import NewsletterSubscription from "@/codeforafrica/components/NewsletterSubscription";
import StayInTouch from "@/codeforafrica/components/StayInTouch";
import { socialMedia, footerLinks } from "@/codeforafrica/config";

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

const ListItemRoot = styled(ListItem)(() => ({
  paddingTop: 0,
  paddingLeft: 0,
}));

const ListItemLinks = styled(ListItem)(({ theme: { typography } }) => ({
  padding: 0,
  paddingBottom: typography.pxToRem(20),
}));

const ListGridRoot = styled(Grid)(({ theme: { typography } }) => ({
  marginTop: typography.pxToRem(40),
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
                <StayInTouch socialMedia={socialMedia} />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={3}>
            <Grid container justifyContent="center">
              <Grid item xs={12}>
                <List>
                  {footerLinks &&
                    footerLinks.main.map((item) => (
                      <ListItemLinks>
                        <LinkRoot href={item.href}>
                          <Typography variant="h5">{item.name}</Typography>
                        </LinkRoot>
                      </ListItemLinks>
                    ))}
                </List>
              </Grid>
              <ListGridRoot item xs={12}>
                <List>
                  {footerLinks &&
                    footerLinks.secondary.map((item) => (
                      <ListItemRoot>
                        <LinkRoot href={item.href}>
                          <Typography variant="p2">{item.name}</Typography>
                        </LinkRoot>
                      </ListItemRoot>
                    ))}
                </List>
              </ListGridRoot>
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
