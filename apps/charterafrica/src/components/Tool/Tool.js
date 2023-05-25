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

import ContributeIcon from "@/charterafrica/assets/icons/Type=contribute, Size=24, Color=CurrentColor.svg";
import ExternalLink from "@/charterafrica/assets/icons/Type=external-link, Size=24, Color=CurrentColor.svg";
import GithubIcon from "@/charterafrica/assets/icons/Type=github, Size=24, Color=CurrentColor.svg";
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
    donors,
    donorsTitle,
    contributorsTitle,
    contributors,
    topic,
    image,
    organisationName,
    contribute,
    topicLabel,
  } = props;
  return (
    <Box bgcolor="common.white" ref={ref}>
      <Section>
        <Grid container wrap="wrap-reverse">
          <Grid item sm={12} md={8} container sx={{ p: 2 }}>
            <Grid
              xs={12}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              item
            >
              <RichTypography color="neutral.dark" variant="h2SemiBold">
                {name}
              </RichTypography>
              <Link href={link.href}>
                <SvgIcon
                  inheritViewBox
                  component={ExternalLink}
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
            <Grid item container>
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
                  sx={{ fontWeight: 400, mt: 0.625 }}
                  variant="h6Small"
                >
                  {topic && `${topicLabel}:${topic}`}
                </RichTypography>
              </Grid>
              <Grid sx={{ textAlign: "right", mt: 3.75 }} xs={12} sm={4} item>
                <Button
                  component={contribute.href ? Link : undefined}
                  href={contribute.href}
                  variant="contained"
                  sx={{ width: { xs: "100%", sm: "fit-content" }, height: 50 }}
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
                  sx={{
                    mt: 1.25,
                    width: { xs: "100%", sm: "fit-content" },
                    height: 50,
                  }}
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
            <Grid item>
              <RichTypography
                textAlign="left"
                color="neutral.dark"
                sx={{ mt: 3.75 }}
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
          </Grid>
          <Grid md={4} xs={12} item>
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
        {donors.length ? (
          <Box sx={{ mt: 6.25 }}>
            <RichTypography
              color="neutral.dark"
              variant="h4Small"
              textAlign={{ xs: "center", sm: "left" }}
            >
              {donorsTitle}
            </RichTypography>
            <Grid
              columnSpacing={4.375}
              rowSpacing={2.5}
              sx={{ mt: 2.5 }}
              container
            >
              {donors.map((item) => (
                <Grid xs={12} sm={6} md={4} lg={3} key={item.id} item>
                  <RichTypography
                    textAlign={{ xs: "center", sm: "left" }}
                    variant="p3SemiBold"
                  >
                    {item.name}
                  </RichTypography>
                </Grid>
              ))}
            </Grid>
          </Box>
        ) : null}
        {contributors.length && donors.length ? (
          <Divider sx={{ my: 3.75 }} />
        ) : null}
        {contributors.length ? (
          <Box sx={{ p: 2 }}>
            <RichTypography
              color="neutral.dark"
              variant="h4Small"
              textAlign={{ xs: "center", sm: "left" }}
            >
              {contributorsTitle}
            </RichTypography>
            <Grid
              columnSpacing={4.375}
              rowSpacing={2.5}
              sx={{ mt: 2.5, pb: 10 }}
              container
            >
              {contributors.map((item) => (
                <Grid xs={12} sm={6} md={4} lg={3} key={item.id} item>
                  <RichTypography
                    textAlign={{ xs: "center", sm: "left" }}
                    variant="p3SemiBold"
                  >
                    {item.name}
                  </RichTypography>
                </Grid>
              ))}
            </Grid>
          </Box>
        ) : null}
        {tools.length ? (
          <Box sx={{ p: 2 }}>
            <RichTypography
              sx={{ mt: 20 }}
              color="neutral.dark"
              variant="h3Small"
              textAlign="left"
            >
              {toolsTitle}
            </RichTypography>
            <Grid sx={{ mt: 5 }} spacing={2.5} container>
              {tools.map((tool) => (
                <Grid xs={12} sm={6} md={4} lg={12} item key={tool.id}>
                  <ToolCard showButton linkText="Explore" {...tool} />
                </Grid>
              ))}
            </Grid>
          </Box>
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
