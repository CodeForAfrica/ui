import { Section, RichTypography } from "@commons-ui/core";
import { Avatar, Grid, SvgIcon, Link, Box } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";

import GithubIcon from "@/charterafrica/assets/icons/Type=github, Size=24, Color=CurrentColor.svg";
import EmailIcon from "@/charterafrica/assets/icons/Type=mail, Size=24, Color=CurrentColor.svg";
import TwitterIcon from "@/charterafrica/assets/icons/Type=twitter, Size=24, Color=CurrentColor.svg";
import ToolCard from "@/charterafrica/components/ToolCard";

const SocialIcon = React.forwardRef(function SocialIcon(props, ref) {
  const { href, variant } = props;
  const icons = {
    twitter: TwitterIcon,
    github: GithubIcon,
    email: EmailIcon,
  };
  return href ? (
    <Grid ref={ref} item>
      <Link href={href}>
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
    </Grid>
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
  return (
    <Box ref={ref} sx={{ p: 10 }} bgcolor="common.white">
      <Section>
        <Grid container>
          <Grid sx={{ p: 2 }} item xs={12} sm={4}>
            <Avatar
              src={image}
              sx={{ aspectRatio: "1/1", width: "100%", height: "auto" }}
            />
          </Grid>
          <Grid item sx={{ p: 2 }} xs={12} sm={8}>
            <RichTypography
              textAlign={{ xs: "center", sm: "left" }}
              color="neutral.dark"
              variant="h2SemiBold"
            >
              {name}
            </RichTypography>
            <RichTypography
              textAlign={{ xs: "center", sm: "left" }}
              color="neutral.dark"
              sx={{ mt: 2.5, fontWeight: 400 }}
              variant="h4Small"
            >
              {location}
            </RichTypography>
            <RichTypography
              textAlign={{ xs: "center", sm: "left" }}
              color="neutral.dark"
              sx={{ mt: 2.5 }}
              variant="p1"
            >
              {description}
            </RichTypography>
            <Grid
              item
              xs="auto"
              container
              sx={{ mt: 3 }}
              justifyContent={{ xs: "center", sm: "flex-start" }}
              columnSpacing={2}
            >
              <SocialIcon href={twitter} variant="twitter" />
              <SocialIcon href={github} variant="github" />
              <SocialIcon href={`maito:${email}`} variant="email" />
            </Grid>
          </Grid>
        </Grid>
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
              <ToolCard responsive showButton linkText="Go to Repo" {...tool} />
            </Grid>
          ))}
        </Grid>
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
      topic: PropTypes.string.isRequired,
      lastActive: PropTypes.string.isRequired,
      description: PropTypes.string,
      image: PropTypes.string,
    })
  ),
  toolsTitle: PropTypes.string,
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
};

export default Entity;
