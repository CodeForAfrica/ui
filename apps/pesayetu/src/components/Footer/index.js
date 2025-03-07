import {
  StayInTouch,
  QuickLinks,
  RichTypography,
  LogoButton,
  Copyright,
} from "@commons-ui/core";
import { Grid } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";

import useStyles from "./useStyles";

import Link from "@/pesayetu/components/Link";
import Section from "@/pesayetu/components/Section";

function Footer({
  title,
  logoProps,
  aboutVariant,
  description,
  copyrightProps,
  quickLinks: quickLinksProp,
  socialMedia,
  ...props
}) {
  const classes = useStyles(props);
  return (
    <div className={classes.root}>
      <Section
        classes={{
          root: classes.section,
        }}
      >
        <Grid container direction="row" justifyContent="space-between">
          <Grid item xs={12} container>
            {logoProps && (
              <LogoButton
                {...logoProps}
                component={Link}
                classes={{
                  root: classes.logoButton,
                }}
              />
            )}
          </Grid>
          <Grid item xs={12} lg={6}>
            {description && (
              <RichTypography
                variant={aboutVariant}
                className={classes.description}
              >
                {description}
              </RichTypography>
            )}
            {copyrightProps && (
              <Copyright
                {...copyrightProps}
                classes={{
                  root: classes.copyright,
                  text: classes.copyrightText,
                }}
              />
            )}
          </Grid>
          <Grid item xs={12} lg={4}>
            <Grid
              container
              classes={{
                root: classes.allLinks,
              }}
            >
              <Grid item xs={12} lg={6}>
                {quickLinksProp && (
                  <QuickLinks
                    linkComponent={Link}
                    {...quickLinksProp}
                    classes={{
                      root: classes.quickLinkRoot,
                      list: classes.quickList,
                      link: classes.quickLink,
                      title: classes.quickLinksTitle,
                    }}
                  />
                )}
              </Grid>
              <Grid item xs={12} lg={6}>
                {socialMedia && (
                  <StayInTouch
                    title={title}
                    socialMedia={socialMedia}
                    classes={{
                      root: classes.stayInTouch,
                      icon: classes.stayInTouchIcon,
                      links: classes.stayInTouchLinks,
                      text: classes.stayInTouchText,
                      link: classes.stayInTouchLink,
                    }}
                  />
                )}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Section>
    </div>
  );
}

Footer.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  socialMedia: PropTypes.arrayOf(PropTypes.shape({})),
  quickLinks: PropTypes.PropTypes.shape({}),
  logoProps: PropTypes.shape({
    src: PropTypes.string,
    alt: PropTypes.string,
    href: PropTypes.string,
  }),
  aboutVariant: PropTypes.string,
  copyrightProps: PropTypes.shape({}),
};

Footer.defaultProps = {
  title: undefined,
  description: undefined,
  socialMedia: undefined,
  quickLinks: undefined,
  copyrightProps: undefined,
  logoProps: undefined,
  aboutVariant: "subtitle1",
};

export default Footer;
