import { RichTypography, Section } from "@commons-ui/core";
import { Link, Figure } from "@commons-ui/next";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import SvgIcon from "@mui/material/SvgIcon";
import PropTypes from "prop-types";
import React from "react";

import MailIcon from "@/charterafrica/assets/icons/Type=mail, Size=32, Color=CurrentColor.svg";
import { neutral } from "@/charterafrica/colors";
import NewsletterSubscription from "@/charterafrica/components/NewsletterSubscription";
import RichText from "@/charterafrica/components/RichText";
import StayInTouch from "@/charterafrica/components/StayInTouch";

const Footer = React.forwardRef(function Footer(props, ref) {
  const {
    contact,
    copyright,
    links,
    funder,
    projectDescription,
    siteDescription,
    newsletter,
    connect,
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
            alignItems={{ sm: "flex-end" }}
            justifyContent={{ sm: "space-between" }}
            gap={4}
          >
            <Grid
              item
              xs={12}
              sm="auto"
              alignItems={{ sm: "flex-end" }}
              display="flex"
              justifyContent="center"
              sx={{
                order: { xs: 0, sm: 1 },
                justifyContent: { xs: "center", sm: "flex-start" },
              }}
            >
              <Grid
                display="flex"
                flexDirection="column"
                alignItems="center"
                sx={{
                  display: "flex",
                  gap: 4,
                  alignItems: { md: "flex-end", sm: "center", xs: "center" },
                  justifyContent: {
                    md: "flex-end",
                    sm: "center",
                    xs: "center",
                  },
                }}
              >
                <NewsletterSubscription {...newsletter} />
                <Box
                  sx={{
                    marginBottom: "20px",
                    width: { xs: "172px", sm: "150px" },
                  }}
                >
                  <RichTypography
                    fontSize={16}
                    textAlign={{ xs: "center", sm: "right" }}
                    variant="p2SemiBold"
                  >
                    {funder?.title}
                  </RichTypography>
                </Box>

                <Figure
                  sx={{
                    height: { xs: "118.11px", sm: "103px" },
                    width: { xs: "172px", sm: "150px" },
                  }}
                  ImageProps={{
                    alt: funder?.logo?.alt,
                    src: funder?.logo?.url,
                    sx: { objectPosition: "top" },
                  }}
                />
              </Grid>
            </Grid>
            <Grid container xs={12} sm={7} sx={{ order: { xs: 1, sm: 0 } }}>
              <Grid
                sx={{ display: "flex", flexDirection: "column", gap: "13px" }}
              >
                <Grid
                  item
                  display="flex"
                  sx={{ justifyContent: { xs: "center", sm: "flex-start" } }}
                >
                  {contact?.email?.length > 0 ? (
                    <Link
                      href={`mailto:${contact.email}`}
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
                      <RichTypography variant="p2">
                        {contact.email}
                      </RichTypography>
                    </Link>
                  ) : null}
                </Grid>
                <RichText
                  sx={{
                    textAlign: { xs: "center", sm: "left" },
                  }}
                  variant="p2"
                  elements={siteDescription}
                />
                <StayInTouch title={connect?.stayInTouch} {...connect} />
                <RichText
                  variant="p2SemiBold"
                  sx={{
                    textAlign: { xs: "center", sm: "left" },
                  }}
                  elements={projectDescription}
                />

                {links?.length > 0 ? (
                  <Grid
                    sx={{ justifyContent: { xs: "center", sm: "flex-start" } }}
                    item
                    display="flex"
                    gap="10px"
                  >
                    {links.map((link) => (
                      <Link
                        key={link.id}
                        color="inherit"
                        href={link?.href}
                        underline="always"
                        variant="p1"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </Grid>
                ) : null}
              </Grid>
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
  links: PropTypes.arrayOf(PropTypes.shape({})),
  logo: PropTypes.shape({}),
  projectDescription: PropTypes.arrayOf(PropTypes.shape({})),
  siteDescription: PropTypes.arrayOf(PropTypes.shape({})),
  newsletter: PropTypes.shape({}),
  connect: PropTypes.shape({}),
};

Footer.defaultProps = {
  contact: undefined,
  connect: {},
  copyright: undefined,
  links: undefined,
  logo: undefined,
  newsletter: {},
  projectDescription: [{ children: [{ text: null }] }],
  siteDescription: [{ children: [{ text: null }] }],
};

export default Footer;
