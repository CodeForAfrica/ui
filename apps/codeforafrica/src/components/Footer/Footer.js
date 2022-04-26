import { Section } from "@commons-ui/core";
import { Link } from "@commons-ui/next";
import { Grid, Typography, List, ListItem } from "@mui/material";
import { styled } from "@mui/material/styles";
import PropTypes from "prop-types";
import React from "react";

import FooterDescription from "./FooterDescription";

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

const LinkRoot = styled(Link)(({ theme: { palette } }) => ({
  textDecoration: "none",
  color: palette.text.secondary,
}));

const ListRoot = styled(List)(({ theme: { breakpoints, typography } }) => ({
  marginTop: typography.pxToRem(85),
  [breakpoints.up("lg")]: {
    marginTop: 0,
  },
}));

const ListItemRoot = styled(ListItem)(({ theme: { breakpoints } }) => ({
  paddingTop: 0,
  paddingLeft: 0,
  display: "flex",
  justifyContent: "center",
  [breakpoints.up("md")]: {
    display: "block",
    justifyContent: "flex-start",
  },
}));

const ListItemLinks = styled(ListItem)(
  ({ theme: { typography, breakpoints } }) => ({
    padding: 0,
    paddingBottom: typography.pxToRem(20),
    display: "flex",
    justifyContent: "center",
    [breakpoints.up("md")]: {
      display: "block",
      justifyContent: "flex-start",
    },
  })
);

const ListGridRoot = styled(Grid)(({ theme: { typography } }) => ({
  marginTop: typography.pxToRem(20),
}));

const ImageGrid = styled(Grid)(({ theme: { breakpoints } }) => ({
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
      <Section>
        <Grid container>
          <Grid item xs={12} md={4}>
            <Grid container>
              <ImageGrid item xs={12}>
                <FooterDescription description={description} />
              </ImageGrid>
              <Grid item xs={12}>
                <StayInTouch socialMedia={socialMedia} />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={4}>
            <Grid container justifyContent="center">
              <Grid item xs={12}>
                <ListRoot>
                  {footerLinks &&
                    footerLinks.main.map((item) => (
                      <ListItemLinks>
                        <LinkRoot href={item.href}>
                          <Typography variant="h5">{item.name}</Typography>
                        </LinkRoot>
                      </ListItemLinks>
                    ))}
                </ListRoot>
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
