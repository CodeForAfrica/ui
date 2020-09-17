import React from "react";
import PropTypes from "prop-types";

import { Grid, Hidden, Typography } from "@material-ui/core";

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

function MainFooter({
  page: {
    about,
    legal_links: legalLinksLinks,
    organization_logo: organizationLogoProp,
    quick_links: quickLinksLinks,
    social_media: socialMedia,
  },
  ...props
}) {
  const classes = useStyles({ props });

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
  const quickLinks = quickLinksLinks.map((q) => ({
    ...q,
    links: q.links.map((l) => ({ ...l, as: l.href, href: "/about/[...slug]" })),
    linkComponent: Link,
  }));

  return (
    <>
      <div className={classes.primary}>
        <Section classes={{ root: classes.section }}>
          <FooterLogo hasdivider={false} {...organizationLogo} />
          <Grid container>
            <Grid item xs={12} md={7}>
              <FooterAbout
                options={{
                  about: {
                    variant: "body2",
                  },
                  initiative: {
                    variant: "body2",
                  },
                }}
                classes={classes.aboutAbout}
                initiative={about.initiative}
              >
                {about.about}
              </FooterAbout>
            </Grid>
            <Grid item md={2} implementation="css" smDown component={Hidden} />
            <Grid item xs={6} md={2} className={classes.quickLinksMore}>
              <div className={classes.links}>
                <FooterQuickLinks
                  options={{
                    link: {
                      variant: "body1",
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
                      variant: "body1",
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
                <FooterCopyright
                  variant="body2"
                  color="white"
                  classes={{ section: classes.section }}
                />
                <FooterLegalLinks
                  variant="body2"
                  {...legalLinks}
                  classes={{ section: classes.section }}
                />
              </div>
            </Grid>
            <Grid item xs={12} md={6} className={classes.secondaryGridItem}>
              <FooterStayInTouch
                socialMedia={socialMedia}
                options={{
                  socialMedia: {
                    color: "white",
                  },
                  support: {
                    color: "white",
                  },
                  title: {
                    variant: "h5",
                  },
                }}
                classes={{
                  root: classes.stayInTouch,
                  links: classes.stayInTouchLinks,
                }}
              />
            </Grid>
          </Grid>
        </Section>
      </div>
    </>
  );
}

MainFooter.propTypes = {
  page: PropTypes.shape({
    about: PropTypes.shape({
      initiative: PropTypes.string,
      about: PropTypes.string,
    }),
    social_media: PropTypes.arrayOf(PropTypes.shape({})),
    legal_links: PropTypes.arrayOf(PropTypes.shape({})),
    quick_links: PropTypes.arrayOf(PropTypes.shape({})),
    organization_logo: PropTypes.shape({}),
  }).isRequired,
};

export default MainFooter;
