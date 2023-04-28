import { Section, RichTypography } from "@commons-ui/core";
import {
  Box,
  Button,
  Grid,
  SvgIcon,
  Link,
  CardMedia,
  Divider,
} from "@mui/material";
import PropTypes from "prop-types";
import React from "react";

import ContributeIcon from "@/charterafrica/assets/icons/contribute.svg";
import GithubIcon from "@/charterafrica/assets/icons/github.svg";
import LinkToTool from "@/charterafrica/assets/icons/link.svg";
import ShareThisPage from "@/charterafrica/components/ShareThisPage";
import ToolCard from "@/charterafrica/components/ToolCard";

const Tool = React.forwardRef(function Tool(props, ref) {
  const {
    name,
    location,
    description,
    link,
    tools,
    toolsTitle,
    contributorsTitle,
    contributors,
    topic,
    image,
    organisationName,
    contribute,
  } = props;
  return (
    <Box bgcolor="common.white">
      <Section ref={ref}>
        <Grid sx={{ flexWrap: "wrap-reverse" }} container>
          <Grid item container sx={{ p: 2 }} sm={12} md={8}>
            <Grid
              xs={12}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              item
            >
              <RichTypography
                color="neutral.dark"
                sx={{ flex: 1 }}
                variant="h2SemiBold"
              >
                {name}
              </RichTypography>
              <Link href={link.href}>
                <SvgIcon
                  inheritViewBox
                  component={LinkToTool}
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
            <Grid container>
              <Grid xs={12} sm={8} item>
                <RichTypography
                  textAlign="left"
                  color="neutral.dark"
                  sx={{ mt: 3.75, fontWeight: 400 }}
                  variant="h4"
                >
                  {organisationName}
                </RichTypography>
                <RichTypography
                  textAlign="left"
                  color="neutral.dark"
                  sx={{ mt: 4, fontWeight: 400 }}
                  variant="h6Small"
                >
                  {location}
                </RichTypography>
                <RichTypography
                  textAlign="left"
                  color="neutral.dark"
                  sx={{ fontWeight: 400 }}
                  variant="h6Small"
                >
                  {topic}
                </RichTypography>
              </Grid>
              <Grid sx={{ textAlign: "right" }} xs={12} sm={4} item>
                <Button
                  component={contribute.href ? Link : undefined}
                  href={contribute.href}
                  variant="contained"
                  sx={{ mt: 2.5, width: { xs: "100%", sm: "fit-content" } }}
                >
                  <SvgIcon
                    inheritViewBox
                    component={ContributeIcon}
                    sx={{
                      color: "text.secondary",
                      display: "inline-flex",
                      fill: "none",
                      width: 16,
                      height: 16,
                      mr: 1,
                    }}
                  />
                  {contribute.label}
                </Button>
                <br />
                <Button
                  component={link.href ? Link : undefined}
                  href={link?.href}
                  variant="contained"
                  sx={{ mt: 2.5, width: { xs: "100%", sm: "fit-content" } }}
                >
                  <SvgIcon
                    component={GithubIcon}
                    sx={{
                      color: "text.secondary",
                      display: "inline-flex",
                      fill: "none",
                      width: 16,
                      height: 16,
                      mr: 1,
                    }}
                  />
                  {link.label}
                </Button>
              </Grid>
            </Grid>
            <Divider sx={{ my: 3.75 }} />
            <RichTypography
              textAlign="left"
              color="neutral.dark"
              sx={{ mt: 2.5 }}
              variant="p1"
            >
              {description}
            </RichTypography>
            <Box
              display="flex"
              sx={{
                mt: 3.75,
                width: "100%",
                justifyContent: { xs: "center", sm: "flex-end" },
              }}
            >
              <ShareThisPage
                sx={{ textAlign: { sm: "right", xs: "center" } }}
                title="Share via"
              />
            </Box>
          </Grid>
          <Grid md={4} item>
            <CardMedia
              component="img"
              image={image}
              alt={name}
              sx={{
                width: "100%",
                height: "auto",
              }}
            />
          </Grid>
        </Grid>
        {contributors.length ? (
          <>
            <RichTypography
              sx={{ mt: 8, fontWeight: 400 }}
              color="neutral.dark"
              variant="h4Small"
              textAlign={{ xs: "center", sm: "left" }}
            >
              {contributorsTitle}
            </RichTypography>
            <Grid
              columnSpacing={4.375}
              rowSpacing={2.5}
              sx={{ mt: 2.5 }}
              container
            >
              {contributors.map((item) => {
                return (
                  <Grid xs={12} sm={6} md={4} lg={3} key={item.id} item>
                    <RichTypography
                      textAlign={{ xs: "center", sm: "left" }}
                      variant="p3SemiBold"
                    >
                      {item.name}
                    </RichTypography>
                  </Grid>
                );
              })}
            </Grid>
          </>
        ) : null}
        {tools.length ? (
          <>
            <RichTypography
              sx={{ mt: 20 }}
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
          </>
        ) : null}
      </Section>
    </Box>
  );
});

const linkProp = PropTypes.shape({
  label: PropTypes.string,
  href: PropTypes.string,
});
Tool.propTypes = {
  image: PropTypes.string,
  name: PropTypes.string,
  topic: PropTypes.string,
  link: linkProp,
  toolsTitle: PropTypes.string,
  contributorsTitle: PropTypes.string,
  lastActive: PropTypes.string,
  contributeText: PropTypes.string,
  organisationName: PropTypes.string,
  twitter: PropTypes.string,
  github: PropTypes.string,
  email: PropTypes.string,
  location: PropTypes.string,
  description: PropTypes.string,
  tools: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      topic: PropTypes.string,
      lastActive: PropTypes.string,
      description: PropTypes.string,
      image: PropTypes.string,
    })
  ),
  contributors: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      updatedAt: PropTypes.string,
      externalId: PropTypes.string,
      type: PropTypes.string,
      name: PropTypes.string,
      description: PropTypes.string,
      location: PropTypes.string,
      twitter: PropTypes.string,
      createdAt: PropTypes.string,
      source: PropTypes.string,
    })
  ),
  constribute: linkProp,
};

Tool.defaultProps = {
  image: undefined,
  name: undefined,
  topic: undefined,
  link: undefined,
  toolsTitle: undefined,
  contributorsTitle: undefined,
  lastActive: undefined,
  constribute: undefined,
  contributeText: undefined,
  organisationName: undefined,
  twitter: undefined,
  github: undefined,
  email: undefined,
  location: undefined,
  description: undefined,
  tools: undefined,
  contributors: undefined,
};

export default Tool;
