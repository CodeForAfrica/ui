import { RichTypography, Section } from "@commons-ui/core";
import { Link, Figure } from "@commons-ui/next";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import SvgIcon from "@mui/material/SvgIcon";
import PropTypes from "prop-types";
import React from "react";

import MailIcon from "@/charterafrica/assets/icons/Type=mail, Size=32, Color=CurrentColor.svg";
import { neutral } from "@/charterafrica/colors";

const Footer = React.forwardRef(function Footer(props, ref) {
  const {
    contact,
    copyright,
    links,
    logo,
    projectDescription,
    siteDescription,
  } = props;
  return (
    <Box
      component="footer"
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
      ref={ref}
    >
      <Box sx={{ backgroundColor: neutral[800], color: "text.secondary" }}>
        <Section sx={{ px: { xs: 5, sm: 0 }, py: { xs: 5, md: 7.5 } }}>
          <Grid
            container
            alignItems={{ sm: "center" }}
            justifyContent={{ sm: "space-between" }}
            rowSpacing={2.5}
          >
            <Grid
              item
              xs={12}
              sm="auto"
              sx={{
                order: { xs: 0, sm: 1 },
              }}
            >
              <Figure
                sx={{
                  height: { xs: "118.11px", sm: "103px" },
                  width: { xs: "172px", sm: "150px" },
                }}
                ImageProps={{
                  ...logo,
                  sx: { objectPosition: "top" },
                }}
              />
            </Grid>
            <Grid item xs={12} sm={8} sx={{ order: { xs: 1, sm: 0 } }}>
              <Box
                sx={{ display: "flex", flexDirection: "column", gap: "13px" }}
              >
                {contact?.email?.href?.length > 0 ? (
                  <Link
                    href={contact.email.href}
                    color="inherit"
                    variant="p2"
                    underline="none"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: "17px",
                    }}
                  >
                    <SvgIcon
                      component={MailIcon}
                      viewBox="0 0 32 32"
                      sx={{
                        color: "text.secondary",
                        display: "inline-flex",
                        fill: "none",
                        fontSize: "32px",
                      }}
                    />
                    {contact.email.content || contact.email.href}
                  </Link>
                ) : null}
                <RichTypography
                  color="inherit"
                  variant="p2"
                  component="p"
                  sx={{ maxWidth: { md: "648px" } }}
                >
                  {siteDescription}
                </RichTypography>
                <RichTypography
                  color="inherit"
                  variant="p2SemiBold"
                  component="p"
                >
                  {projectDescription}
                </RichTypography>
                {links?.length > 0 ? (
                  <Box display="flex" gap="10px">
                    {links.map((link) => (
                      <Link
                        color="inherit"
                        href={link.href}
                        underline="always"
                        variant="p1"
                      >
                        {link.content || link.href}
                      </Link>
                    ))}
                  </Box>
                ) : null}
              </Box>
            </Grid>
          </Grid>
        </Section>
      </Box>
      <Box
        sx={{
          backgroundColor: neutral[900],
          color: "text.secondary",
        }}
      >
        <Section sx={{ px: { xs: 5, sm: 0 }, py: { xs: 3.75, md: 1.25 } }}>
          <RichTypography
            color="inherit"
            variant="p2SemiBold"
            textAlign="center"
          >
            {copyright}
          </RichTypography>
        </Section>
      </Box>
    </Box>
  );
});

Footer.propTypes = {
  contact: PropTypes.shape({}),
  copyright: PropTypes.string,
  links: PropTypes.shape(PropTypes.arrayOf(PropTypes.shape({}))),
  logo: PropTypes.shape({}),
  projectDescription: PropTypes.string,
  siteDescription: PropTypes.string,
};

Footer.defaultProps = {
  contact: undefined,
  copyright: undefined,
  links: undefined,
  logo: undefined,
  projectDescription: undefined,
  siteDescription: undefined,
};

export default Footer;
