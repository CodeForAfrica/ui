import { Section, StayInTouch } from "@commons-ui/core";
import { Link } from "@commons-ui/next";
import { Box, Grid } from "@mui/material";
import { styled } from "@mui/material/styles";
import PropTypes from "prop-types";
import React from "react";

import FooterDescription from "./FooterDescription";

import FooterLinks from "@/codeforafrica/components/FooterLinks";
import NewsletterSubscription from "@/codeforafrica/components/NewsletterSubscription";

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
  }),
);

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
    <FooterRoot component="footer" ref={ref}>
      <Section sx={{ px: { xs: 2.5, sm: 0 } }}>
        {/* Increase number of columns to getter columns size */}
        <Grid container columns={24} justifyContent="space-between">
          <Grid
            item
            xs={24}
            md={15}
            lg={16}
            sx={{
              order: { xs: 1, md: 0 },
            }}
          >
            <Grid container justifyContent="space-between">
              <Grid
                item
                xs={12}
                md="auto"
                container
                direction="column"
                sx={{
                  maxWidth: { xs: "none", md: "337px" },
                }}
              >
                <Grid item>
                  <FooterDescription
                    description={description}
                    logo={logo}
                    sx={{ mt: { xs: 10, md: 0 } }}
                  />
                </Grid>
                <Grid item>
                  <StayInTouch
                    {...connect}
                    LinkProps={{ component: Link }}
                    TitleProps={{ variant: "footerCap" }}
                    sx={{ mt: "52px" }}
                  />
                </Grid>
              </Grid>
              <Grid item xs={12} md="auto">
                <FooterLinks
                  primaryMenus={primaryMenus}
                  secondaryMenus={secondaryMenus}
                  sx={{ mt: { xs: "52px", md: 0 } }}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={24} md="auto" sx={{ order: { xs: 0, md: 1 } }}>
            <NewsletterSubscription {...newsletter} />
          </Grid>
        </Grid>
      </Section>
    </FooterRoot>
  );
});

Footer.propTypes = {
  newsletter: PropTypes.shape({}),
  menus: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      href: PropTypes.string,
    }),
  ),
};

Footer.defaultProps = {
  newsletter: undefined,
  menus: undefined,
};

export default Footer;
