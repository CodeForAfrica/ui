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
      <Box color="text.secondary" sx={{ backgroundColor: neutral[800] }}>
        <Section sx={{ px: { xs: 5, sm: 0 }, py: { xs: 5, md: 7.5 } }}>
          <Grid container justifyContent={{ md: "space-between" }}>
            <Grid
              item
              xs={12}
              md={4}
              order={{ xs: 0, md: 1 }}
              container
              flexDirection="column"
              alignItems={{ xs: "center", md: "flex-end" }}
            >
              <Grid item>
                <NewsletterSubscription {...newsletter} />
              </Grid>
              <Grid item>
                <RichTypography
                  fontSize={16}
                  textAlign={{ xs: "center", sm: "right" }}
                  variant="p2SemiBold"
                  mt={{ xs: 3, md: 5 }}
                  width={{ xs: "100%", md: "170px" }}
                >
                  {funder?.title}
                </RichTypography>
              </Grid>
              <Grid item>
                <Figure
                  sx={{
                    height: { xs: "118.11px", md: "103px" },
                    mt: 2,
                    width: { xs: "172px", md: "150px" },
                  }}
                  ImageProps={{
                    alt: funder?.logo?.alt,
                    src: funder?.logo?.url,
                    sx: { objectPosition: "top" },
                  }}
                />
              </Grid>
            </Grid>
            <Grid
              item
              xs={12}
              md={7}
              sx={{ mt: { xs: 5, md: 0 }, order: { xs: 1, md: 0 } }}
            >
              <Grid
                container
                flexDirection="column"
                rowSpacing={3}
                alignItems={{ xs: "center", md: "flex-start" }}
              >
                {contact?.email?.length > 0 ? (
                  <Grid item>
                    <Link
                      href={`mailto:${contact.email}`}
                      color="inherit"
                      variant="p2"
                      underline="none"
                      sx={{
                        display: "inline-flex",
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
                      {contact.email}
                    </Link>
                  </Grid>
                ) : null}
                <Grid item>
                  <RichText
                    sx={{
                      textAlign: { xs: "center", sm: "left" },
                    }}
                    variant="p2"
                    elements={siteDescription}
                  />
                </Grid>
                <Grid item>
                  <StayInTouch {...connect} />
                </Grid>
                <Grid item>
                  <RichText
                    variant="p2SemiBold"
                    sx={{
                      textAlign: { xs: "center", sm: "left" },
                    }}
                    elements={projectDescription}
                  />
                </Grid>

                {links?.length > 0 ? (
                  <Grid
                    item
                    container
                    flexDirection={{ xs: "column", md: "row" }}
                    alignItems={{ xs: "center", md: "flex-start" }}
                    gap={1.25}
                  >
                    {links.map((link) => (
                      <Grid item xs={12} md="auto" key={link.id}>
                        <Link
                          color="inherit"
                          href={link?.href}
                          underline="always"
                          variant="p1"
                        >
                          {link.label}
                        </Link>
                      </Grid>
                    ))}
                  </Grid>
                ) : null}
              </Grid>
            </Grid>
          </Grid>
        </Section>
      </Box>
      <Box
        color="text.secondary"
        sx={{
          backgroundColor: neutral[900],
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
