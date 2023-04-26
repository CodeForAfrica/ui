import { Section, RichTypography } from "@commons-ui/core";
import { Box, Grid, SvgIcon, Link, CardMedia } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";

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
  } = props;
  return (
    <Section ref={ref}>
      <Grid sx={{ flexWrap: "wrap-reverse" }} container>
        <Grid item sx={{ p: 2 }} sm={12} md={8}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <RichTypography
              textAlign={{ xs: "center", sm: "left" }}
              color="neutral.dark"
              variant="h2SemiBold"
            >
              {name}
            </RichTypography>
            <Link href={link}>
              <SvgIcon
                inheritViewBox
                component={LinkToTool}
                sx={{
                  color: "text.primary",
                  display: "inline-flex",
                  fill: "none",
                  height: 33,
                  width: "100%",
                }}
              />
            </Link>
          </Box>
          <RichTypography
            textAlign={{ xs: "center", sm: "left" }}
            color="neutral.dark"
            sx={{ mt: 3.75, fontWeight: 400 }}
            variant="h4"
          >
            {organisationName}
          </RichTypography>
          <RichTypography
            textAlign={{ xs: "center", sm: "left" }}
            color="neutral.dark"
            sx={{ mt: 4, fontWeight: 400 }}
            variant="h6Small"
          >
            {location}
          </RichTypography>
          <RichTypography
            textAlign={{ xs: "center", sm: "left" }}
            color="neutral.dark"
            sx={{ fontWeight: 400 }}
            variant="h6Small"
          >
            {topic}
          </RichTypography>
          <RichTypography
            textAlign={{ xs: "center", sm: "left" }}
            color="neutral.dark"
            sx={{ mt: 2.5 }}
            variant="p1"
          >
            {description}
          </RichTypography>
          <Box display="flex" justifyContent="space-between">
            <div />
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
      <RichTypography
        sx={{ mt: 8, fontWeight: 400 }}
        color="neutral.dark"
        variant="h4Small"
        textAlign="left"
      >
        {contributorsTitle}
      </RichTypography>
      <Grid columnSpacing={4.375} rowSpacing={2.5} sx={{ mt: 2.5 }} container>
        {contributors.map((item) => {
          return (
            <Grid xs={6} sm={4} md={2.4} key={item.id} item>
              <RichTypography variant="p3SemiBold">{item.name}</RichTypography>
            </Grid>
          );
        })}
      </Grid>
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
    </Section>
  );
});

Tool.propTypes = {
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

Tool.defaultProps = {
  location: undefined,
  description: undefined,
  twitter: undefined,
  github: undefined,
  email: undefined,
  image: undefined,
  tools: undefined,
  toolsTitle: undefined,
};

export default Tool;
