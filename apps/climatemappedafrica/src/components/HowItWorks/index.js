import { RichText } from "@commons-ui/payload";
import { Box, Button, Grid, Typography } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";

import Player from "@/climatemappedafrica/components/HowItWorks/Player";
import useStyles from "@/climatemappedafrica/components/HowItWorks/useStyles";
import Section from "@/climatemappedafrica/components/Section";

function HowItWorks({
  title,
  description,
  link,
  video,
  backgroundImage,
  foregroundImage,
  ...props
}) {
  const classes = useStyles(props);

  return (
    <Box
      sx={{
        height: { xs: "820px", md: "618px", lg: "728px" },
        position: "relative",
      }}
    >
      <Box
        sx={(theme) => ({
          position: "absolute",
          height: theme.typography.pxToRem(390),
          width: "100%",
          zIndex: -1,
          [theme.breakpoints.up("md")]: {
            height: theme.typography.pxToRem(618),
          },
          [theme.breakpoints.up("lg")]: {
            height: theme.typography.pxToRem(728),
          },
          backgroundImage: `url(${backgroundImage.src})`,
          backgroundSize: "cover",
        })}
      />
      <Box
        sx={(theme) => ({
          display: {
            xs: "none",
            md: "block",
            lg: "none",
          },
          position: "absolute",
          left: 0,
          top: theme.typography.pxToRem(42),
          width: "100%",
          background: `linear-gradient(to right, #ffffffE6 0%, #ffffffE6 56%, transparent 56%, transparent 100%)`,
          height: theme.typography.pxToRem(524),
        })}
      />
      <Section classes={{ root: classes.section }}>
        <Grid container direction={{ xs: "column-reverse", lg: "row" }}>
          <Grid
            item
            xs={12}
            md={7}
            lg={6}
            sx={(theme) => ({
              [theme.breakpoints.up("md")]: {
                position: "relative",
                top: 0,
                height: theme.typography.pxToRem(524),
                padding: `${theme.typography.pxToRem(66)} ${theme.typography.pxToRem(
                  77,
                )} ${theme.typography.pxToRem(69)} 0`,
              },
              [theme.breakpoints.up("lg")]: {
                backgroundColor: theme.palette.background.default,
                height: theme.typography.pxToRem(600),
                opacity: 0.9,
                padding: `${theme.typography.pxToRem(81)} ${theme.typography.pxToRem(98)}`,
              },
            })}
          >
            <Box
              sx={(theme) => ({
                position: "relative",
                height: theme.typography.pxToRem(227),
                width: "100%",
                "& .video-js": {
                  width: "100%",
                  height: "100%",
                },
                "& .vjs-poster": {
                  backgroundColor: "#ffffffE6",
                  backgroundSize: "120%",
                },
                "& .video-js .vjs-big-play-button": {
                  display: "none",
                },
                [theme.breakpoints.up("md")]: {
                  height: theme.typography.pxToRem(194),
                  width: theme.typography.pxToRem(299),
                  "& .vjs-poster": {
                    backgroundSize: "auto",
                  },
                },
                [theme.breakpoints.up("lg")]: {
                  height: theme.typography.pxToRem(244),
                  width: theme.typography.pxToRem(376),
                },
              })}
            >
              <Player {...video} />
            </Box>
            <Typography
              sx={(theme) => ({
                marginTop: theme.typography.pxToRem(18),
              })}
              variant="h4"
            >
              {title}
            </Typography>
            <RichText
              elements={description}
              sx={(theme) => ({
                fontFamily: theme.typography.body1.fontFamily,
                margin: `${theme.typography.pxToRem(16.5)} 0`,
                color: theme.palette.grey.dark,
                [theme.breakpoints.up("lg")]: {
                  width: theme.typography.pxToRem(278),
                },
              })}
            />
            <Button href={link.href} variant="text">
              {link.label}
            </Button>
          </Grid>
          <Grid item lg={1} />
          <Grid
            item
            xs={12}
            md={5}
            sx={(theme) => ({
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: theme.typography.pxToRem(23),
              [theme.breakpoints.up("md")]: {
                justifyContent: "flex-end",
              },
            })}
          >
            <Box
              sx={(theme) => ({
                position: "relative",
                height: theme.typography.pxToRem(265),
                width: theme.typography.pxToRem(253.6),
                [theme.breakpoints.up("md")]: {
                  height: theme.typography.pxToRem(211),
                  width: theme.typography.pxToRem(202),
                },
                [theme.breakpoints.up("lg")]: {
                  height: theme.typography.pxToRem(441.6),
                  width: theme.typography.pxToRem(422.5),
                },
                backgroundImage: `url(${foregroundImage.src})`,
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
              })}
            />
          </Grid>
        </Grid>
      </Section>
    </Box>
  );
}

HowItWorks.propTypes = {
  ctaText: PropTypes.string,
  description: PropTypes.string,
  href: PropTypes.string,
  title: PropTypes.string,
};

export default HowItWorks;
