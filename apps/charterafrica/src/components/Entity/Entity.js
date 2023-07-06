import { Section, RichTypography } from "@commons-ui/core";
import { Figure, Link } from "@commons-ui/next";
import { Grid, SvgIcon, Box } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";

import GithubIcon from "@/charterafrica/assets/icons/Type=github, Size=24, Color=CurrentColor.svg";
import EmailIcon from "@/charterafrica/assets/icons/Type=mail, Size=24, Color=CurrentColor.svg";
import TwitterIcon from "@/charterafrica/assets/icons/Type=twitter, Size=24, Color=CurrentColor.svg";
import ToolCard from "@/charterafrica/components/ToolCard";

const SocialMediaLink = React.forwardRef(function SocialMediaLink(props, ref) {
  const { href, variant } = props;
  const icons = {
    twitter: TwitterIcon,
    github: GithubIcon,
    email: EmailIcon,
  };
  return href ? (
    <Link ref={ref} href={href}>
      <SvgIcon
        inheritViewBox
        component={icons[variant]}
        sx={{
          color: "text.primary",
          display: "inline-flex",
          fill: "none",
          height: 32,
          width: 32,
        }}
      />
    </Link>
  ) : null;
});

const Entity = React.forwardRef(function Entity(props, ref) {
  const {
    name,
    location,
    description,
    twitter,
    github,
    email,
    image,
    tools,
    toolsTitle,
  } = props;

  const icons = [
    {
      href: twitter,
      variant: "twitter",
    },
    {
      href: github,
      variant: "github",
    },
    {
      href: `maito:${email}`,
      variant: "email",
    },
  ];
  return (
    <Box ref={ref} bgcolor="common.white">
      <Section sx={{ py: { xs: 3.75 } }}>
        <Grid container columnSpacing={{ sm: 6.25 }} sx={{ p: 5 }}>
          <Grid item xs={12} sm={4} sx={{ p: 2 }}>
            <Figure
              ImageProps={{
                src: image,
                alt: name,
                fill: false,
                height: 0,
                width: 0,
                style: {
                  width: "100%",
                  height: "auto",
                  borderRadius: "50%",
                },
              }}
            />
          </Grid>
          <Grid
            display="flex"
            flexDirection="column"
            alignItems="flex-start"
            justifyContent="center"
            item
            sx={{ p: 2 }}
            xs={12}
            sm={8}
          >
            <RichTypography
              textAlign={{ xs: "center", sm: "left" }}
              color="neutral.dark"
              variant="h2SemiBold"
              sx={{ width: "100%" }}
            >
              {name}
            </RichTypography>
            <RichTypography
              textAlign={{ xs: "center", sm: "left" }}
              color="neutral.dark"
              sx={{ mt: 2.5, width: "100%" }}
              variant="h4Small"
            >
              {location}
            </RichTypography>
            <RichTypography
              textAlign={{ xs: "center", sm: "left" }}
              color="neutral.dark"
              sx={{ mt: 2.5, width: "100%" }}
              variant="p1"
            >
              {description}
            </RichTypography>
            <Grid
              item
              xs="auto"
              container
              sx={{ mt: 3, width: "100%" }}
              justifyContent={{ xs: "center", sm: "flex-start" }}
              columnSpacing={2}
            >
              {icons.map((icon) => (
                <Grid key={icon.variant} item>
                  <SocialMediaLink {...icon} />
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
        {tools.length ? (
          <>
            <RichTypography
              sx={{ mt: 6.25 }}
              color="neutral.dark"
              variant="h3Small"
              textAlign="left"
            >
              {toolsTitle}
            </RichTypography>
            <Grid sx={{ mt: 5 }} spacing={2.5} container>
              {tools.map((tool) => (
                <Grid xs={12} sm={6} md={4} lg={12} item key={tool.id}>
                  <ToolCard
                    direction="row"
                    showButton
                    exploreText="Explore"
                    {...tool}
                  />
                </Grid>
              ))}
            </Grid>
          </>
        ) : null}
      </Section>
    </Box>
  );
});

Entity.propTypes = {
  name: PropTypes.string.isRequired,
  location: PropTypes.string,
  description: PropTypes.string,
  twitter: PropTypes.string,
  github: PropTypes.string,
  email: PropTypes.string,
  image: PropTypes.string,
  tools: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      theme: PropTypes.string.isRequired,
      description: PropTypes.string,
      image: PropTypes.string,
    })
  ),
  toolsTitle: PropTypes.string,
  entity: PropTypes.oneOf(["contributors", "organisation"]),
};

Entity.defaultProps = {
  location: undefined,
  description: undefined,
  twitter: undefined,
  github: undefined,
  email: undefined,
  image: undefined,
  tools: undefined,
  toolsTitle: undefined,
  entity: undefined,
};

export default Entity;
