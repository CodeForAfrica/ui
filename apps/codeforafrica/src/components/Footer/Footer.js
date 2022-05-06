import { Section } from "@commons-ui/core";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import PropTypes from "prop-types";
import React from "react";

import FooterMenu from "@/codeforafrica/components/FooterMenu";
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
  })
);

const Footer = React.forwardRef(function Footer(props, ref) {
  const { subscription, menu } = props;

  return (
    <FooterRoot ref={ref}>
      <Section sx={{ px: { xs: "20px", sm: 0 } }}>
        <Grid container justifyContent="flex-end">
          <Grid
            item
            xs={12}
            md={3}
            sx={{
              order: { xs: 1, md: 0 },
              display: "flex",
              justifyContent: "center",
            }}
          >
            <FooterMenu menu={menu} />
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
