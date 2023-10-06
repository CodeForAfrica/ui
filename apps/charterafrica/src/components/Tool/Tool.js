import { Section, RichTypography } from "@commons-ui/core";
import { Link } from "@commons-ui/next";
import { Box, Grid, SvgIcon, CardMedia, Button } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";

import ExternalLink from "@/charterafrica/assets/icons/Type=external-link, Size=24, Color=CurrentColor.svg";
import GithubIcon from "@/charterafrica/assets/icons/Type=github, Size=24, Color=CurrentColor.svg";
import Contributors from "@/charterafrica/components/Tool/Contributors";
import DescriptionAndShare from "@/charterafrica/components/Tool/DescriptionAndShare";
import Metrics from "@/charterafrica/components/Tool/Metrics";
import OrgThemeAndOperatingCountries from "@/charterafrica/components/Tool/OrgThemeAndOperatingCountries";
import Partners from "@/charterafrica/components/Tool/Partners";
import TechSkills from "@/charterafrica/components/Tool/TechSkills";
import ToolCard from "@/charterafrica/components/ToolCard";

const Tool = React.forwardRef(function Tool(props, ref) {
  const {
    image,
    name,
    organisation,
    theme,
    operatingCountries,
    description,
    lastCommit,
    goToRepo,
    techSkills,
    contributors,
    contributorsTitle,
    supportersTitle,
    partnersTitle,
    supporters,
    partners,
    tools,
    toolsTitle,
    externalLink,
  } = props;
  return (
    <Box bgcolor="common.white" ref={ref}>
      <Section sx={{ pb: { xs: 10 } }}>
        <Grid sx={{ py: { sm: 10 } }} container ref={ref}>
          <Grid container item sm={6} sx={{ pr: { sm: 6.25 } }}>
            <Grid item>
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
            <Grid xs={12} item>
              <Box
                sx={{ width: "100%", mt: 3.75 }}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                flex={1}
              >
                <RichTypography color="neutral.dark" variant="h2SemiBold">
                  {name}
                </RichTypography>
                <Button
                  component={externalLink?.href ? Link : undefined}
                  href={externalLink?.href}
                >
                  <SvgIcon
                    inheritViewBox
                    component={ExternalLink}
                    sx={{
                      color: "text.primary",
                      fill: "none",
                      height: 32,
                      width: 32,
                    }}
                  />
                </Button>
              </Box>
            </Grid>
            <Grid item>
              <OrgThemeAndOperatingCountries
                sx={{ mt: 3.75, textAlign: "left" }}
                organisation={organisation}
                theme={theme}
                operatingCountries={operatingCountries}
              />
              <Metrics
                sx={{ mt: 3.75, justifyContent: "space-between" }}
                {...props}
              />
              <DescriptionAndShare
                description={description}
                lastActive={lastCommit?.committedDate}
                sx={{ mb: 6.75 }}
              />
            </Grid>
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            sx={() => ({
              borderLeft: `1px solid rgba(0, 0, 0, 0.1)`,
              textAlign: { sm: "right", xs: "center" },
              pl: { sm: 6.25 },
            })}
          >
            <Box
              ref={ref}
              sx={{ width: { xs: "100%", sm: "fit-content" }, ml: "auto" }}
            >
              <Button
                component={goToRepo?.href ? Link : undefined}
                href={goToRepo?.href}
                variant="contained"
                target="_blank"
                sx={{
                  mt: 1.25,
                  width: "100%",
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
                {goToRepo?.label}
              </Button>
            </Box>
            <TechSkills
              list={techSkills}
              title="Skills Needed"
              sx={{ mt: 3.75 }}
            />
            <Box sx={{ mt: 3.75 }}>
              <RichTypography variant="p3" color="neutral.dark">
                Collection
              </RichTypography>
              <RichTypography sx={{ mt: 1 }} variant="p3">
                Tool
              </RichTypography>
            </Box>
            <Contributors
              sx={{ mt: 3.75 }}
              list={contributors}
              title={contributorsTitle}
            />
            <Partners sx={{ mt: 3.75 }} list={partners} title={partnersTitle} />
            <Partners
              sx={{ mt: 3.75 }}
              list={supporters}
              title={supportersTitle}
            />
          </Grid>
        </Grid>
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
  theme: PropTypes.string,
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
      id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      name: PropTypes.string,
      theme: PropTypes.string,
      lastActive: PropTypes.string,
      description: PropTypes.string,
      image: PropTypes.string,
    }),
  ),
  contributors: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      updatedAt: PropTypes.string,
      externalId: PropTypes.string,
      type: PropTypes.string,
      name: PropTypes.string,
      description: PropTypes.string,
      location: PropTypes.string,
      twitter: PropTypes.string,
      createdAt: PropTypes.string,
      source: PropTypes.string,
    }),
  ),
  constribute: linkProp,
};

Tool.defaultProps = {
  image: undefined,
  name: undefined,
  theme: undefined,
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
