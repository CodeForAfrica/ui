import { RichTypography, Section } from "@commons-ui/core";
import { Link, Figure } from "@commons-ui/next";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import SvgIcon from "@mui/material/SvgIcon";
import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";

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
    logo,
    projectDescription,
    siteDescription,
    newsletter,
  } = props;

  const [toEmbed, setToEmbed] = useState("");

  const embedCode = newsletter?.embedCode;

  useEffect(() => {
    setToEmbed(embedCode);
  }, [embedCode]);

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
            rowSpacing={2.5}
          >
            <Grid
              item
              xs={12}
              sm="auto"
              alignItems={{ sm: "flex-end" }}
              sx={{
                order: { xs: 0, sm: 1 },
              }}
            >
              <Box
                display="flex"
                sx={{ display: "flex", gap: 4 }}
                justifyContent="space-between"
                alignItems="flex-end"
              >
                <Box
                  display="flex"
                  justifyContent="flex-end"
                  flexDirection="column"
                  alignItems="flex-end"
                >
                  <NewsletterSubscription {...newsletter} embedCode={toEmbed} />
                  <Box
                    sx={{
                      marginBottom: "20px",
                      width: { xs: "172px", sm: "150px" },
                    }}
                  >
                    <RichTypography fontSize={16} textAlign="right">
                      {logo?.title}
                    </RichTypography>
                  </Box>

                  <Figure
                    sx={{
                      height: { xs: "118.11px", sm: "103px" },
                      width: { xs: "172px", sm: "150px" },
                    }}
                    ImageProps={{
                      alt: logo?.src?.alt,
                      src: logo?.src?.url,
                      sx: { objectPosition: "top" },
                    }}
                  />
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} sm={7} sx={{ order: { xs: 1, sm: 0 } }}>
              <Box
                sx={{ display: "flex", flexDirection: "column", gap: "13px" }}
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
                    {contact.email || contact.email}
                  </Link>
                ) : null}
                <RichText elements={siteDescription} />
                <StayInTouch {...contact} />
                <RichText elements={projectDescription} />

                {links?.length > 0 ? (
                  <Box display="flex" gap="10px">
                    {links.map((link) => (
                      <Link
                        key={link.id}
                        color="inherit"
                        href={link?.url || `/${link?.doc?.value?.slug || ""}`}
                        underline="always"
                        variant="p1"
                      >
                        {link.label || link?.href || link?.url}
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
  links: PropTypes.arrayOf(PropTypes.shape({})),
  logo: PropTypes.shape({}),
  projectDescription: PropTypes.arrayOf(PropTypes.shape({})),
  siteDescription: PropTypes.arrayOf(PropTypes.shape({})),
  newsletter: PropTypes.shape({}),
};

Footer.defaultProps = {
  contact: undefined,
  copyright: undefined,
  links: undefined,
  logo: undefined,
  newsletter: {},
  projectDescription: [{ children: [{ text: null }] }],
  siteDescription: [{ children: [{ text: null }] }],
};

export default Footer;
