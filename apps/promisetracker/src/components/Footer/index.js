import React from "react";
import PropTypes from "prop-types";
import { Grid, Hidden, Typography, useMediaQuery } from "@material-ui/core";
import {
  Section,
  FooterLogo,
  FooterAbout,
  FooterQuickLinks,
  FooterStayInTouch,
  FooterLegalLinks,
  FooterCopyright,
} from "@commons-ui/core";

import Link from "@/promisetracker/components/Link";
import ptLogo from "@/promisetracker/assets/footer-pt-logo.png";

import useStyles from "@/promisetracker/components/Footer/useStyles";
import { useTheme } from "@material-ui/core/styles";

function MainFooter({
  page: {
    about,
    contacts,
    legal_links: legalLinksLinks,
    organization_logo: organizationLogoProp,
    quick_links: quickLinksProp,
    copyright,
  },
  ...props
}) {
  const classes = useStyles(props);
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("lg"));

  const organizationLogo = {
    image: { url: organizationLogoProp.image, alt: organizationLogoProp.alt },
    url: organizationLogoProp.link,
  };
  const legalLinks = {
    linkComponent: Link,
    links: legalLinksLinks.map((l) => ({
      ...l,
      as: l.href,
      href: "/legal/[...slug]",
    })),
  };
  const getPath = (href) => {
    const path = href.split("/").slice(0, 2).join("/");
    switch (path) {
      case "/about":
        return "/about/[...slug]";
      case "/analysis":
        return "/analysis/[...slug]";
      default:
        return path;
    }
  };
  const quickLinks = quickLinksProp.map((q) => ({
    ...q,
    links: q.links.map((l) => ({ ...l, as: l.href, href: getPath(l.href) })),
    linkComponent: Link,
  }));

  return (
    <div className={classes.root}>
      <div className={classes.primary}>
        <Section classes={{ root: classes.section }}>
          <FooterLogo hasDivider={false} {...organizationLogo} />
          <Grid container>
            <Grid item xs={12} md={8}>
              <FooterAbout
                options={{
                  about: {
                    variant: "body2",
                  },
                  initiative: {
                    variant: "body2",
                  },
                }}
                classes={{ aboutInitiative: classes.initiative }}
                initiative={about.initiative}
              >
                {about.about}
              </FooterAbout>
            </Grid>
            <Grid item md={1} implementation="css" smDown component={Hidden} />
            <Grid item xs={6} md={2} className={classes.quickLinksMore}>
              <div className={classes.links}>
                <FooterQuickLinks
                  options={{
                    link: {
                      variant: "h6",
                    },
                    title: {
                      color: "black",
                      variant: "h3",
                    },
                  }}
                  classes={{ root: classes.quickLinks, link: classes.link }}
                  linkComponent={Typography}
                  {...quickLinks[0]}
                />
              </div>
            </Grid>
            <Grid item xs={6} md={1} className={classes.quickLinksContact}>
              <div className={classes.links}>
                <FooterQuickLinks
                  options={{
                    link: {
                      variant: "h6",
                    },
                    title: {
                      color: "black",
                      variant: "h3",
                    },
                  }}
                  classes={{ root: classes.quickLinks, link: classes.link }}
                  {...quickLinks[1]}
                />
              </div>
            </Grid>
          </Grid>
        </Section>
      </div>
      <div className={classes.secondary}>
        <Section classes={{ root: classes.section }}>
          <Grid container>
            <Grid item xs={12} md={6} className={classes.secondaryGridItem}>
              <img
                className={classes.ptLogo}
                src={ptLogo}
                alt="promise Tracker"
              />
              <div className={classes.legalContainer}>
                {!isDesktop && (
                  <FooterStayInTouch
                    {...contacts}
                    options={{
                      socialMedia: {
                        color: "white",
                      },
                      support: {
                        color: "white",
                      },
                      title: {
                        variant: "button",
                      },
                    }}
                    classes={{
                      root: classes.stayInTouch,
                      links: classes.stayInTouchLinks,
                      text: classes.stayInTouchText,
                    }}
                  />
                )}

                <FooterCopyright
                  {...copyright}
                  variant="button"
                  classes={{
                    copyright: classes.copyright,
                    text: classes.copyrightText,
                  }}
                />

                <FooterLegalLinks
                  variant="button"
                  {...legalLinks}
                  classes={{
                    root: classes.legalLinksRoot,
                    list: classes.legalLinks,
                    link: classes.legalLink,
                  }}
                />
              </div>
            </Grid>
            {isDesktop && (
              <Grid item xs={12} md={6} className={classes.secondaryGridItem}>
                <FooterStayInTouch
                  {...contacts}
                  options={{
                    socialMedia: {
                      color: "white",
                    },
                    support: {
                      color: "white",
                    },
                    title: {
                      variant: "button",
                    },
                  }}
                  classes={{
                    root: classes.stayInTouch,
                    links: classes.stayInTouchLinks,
                    text: classes.stayInTouchText,
                  }}
                />
              </Grid>
            )}
          </Grid>
        </Section>
      </div>
    </div>
  );
}

MainFooter.propTypes = {
  page: PropTypes.shape({
    about: PropTypes.shape({
      initiative: PropTypes.string,
      about: PropTypes.string,
    }),
    contacts: PropTypes.shape({}),
    copyright: PropTypes.shape({}),
    legal_links: PropTypes.arrayOf(PropTypes.shape({})),
    quick_links: PropTypes.arrayOf(PropTypes.shape({})),
    organization_logo: PropTypes.shape({}),
  }).isRequired,
};

export default MainFooter;
