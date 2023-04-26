import { Section, RichTypography } from "@commons-ui/core";
import { Avatar, Grid, SvgIcon, Link } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";

import GithubIcon from "@/charterafrica/assets/icons/github.svg";
import EmailIcon from "@/charterafrica/assets/icons/Type=mail, Size=32, Color=CurrentColor.svg";
import TwitterIcon from "@/charterafrica/assets/icons/Type=twitter, Size=24, Color=CurrentColor.svg";
import ToolCard from "@/charterafrica/components/ToolCard";

const OrgAndContributor = React.forwardRef(function OrgAndContributor(
  props,
  ref
) {
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
    <Section ref={ref}>
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
            {twitter ? (
              <Grid item>
                <Link href={twitter}>
                  <SvgIcon
                    component={TwitterIcon}
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
            ) : null}
            {github ? (
              <Grid item>
                <Link href={github}>
                  <SvgIcon
                    component={GithubIcon}
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
            ) : null}
            {email ? (
              <Grid item>
                <Link href={`maito:${email}`}>
                  <SvgIcon
                    inheritViewBox
                    component={EmailIcon}
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
            ) : null}
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
        {tools.map((tool) => {
          return (
            <Grid xs={12} sm={6} md={4} lg={12} item key={tool.id}>
              <ToolCard showButton linkText="Go to Repo" {...tool} />
            </Grid>
          );
        })}
      </Grid>
    </Section>
  );
});

OrgAndContributor.propTypes = {
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

OrgAndContributor.defaultProps = {
  location: undefined,
  description: undefined,
  twitter: undefined,
  github: undefined,
  email: undefined,
  image: undefined,
  tools: undefined,
  toolsTitle: undefined,
};

export default OrgAndContributor;
