import { Link } from "@commons-ui/next";
import { RichText } from "@commons-ui/payload";
import { Box, Grid, Typography } from "@mui/material";
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
  image: foregroundImage,
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
        sx={{
          position: "absolute",
          height: {
            xs: "390px",
            md: "618px",
            lg: "728px",
          },
          width: "100%",
          zIndex: -1,
          backgroundImage: `url(${backgroundImage.src})`,
          backgroundSize: "cover",
        }}
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
        <Grid
          container
          direction={{
            xs: "column-reverse",
            md: "row",
          }}
          wrap="nowrap"
          alignItems="center"
        >
          <Grid
            item
            xs={12}
            md={7}
            lg={6}
            sx={(theme) => ({
              position: {
                md: "relative",
              },
              top: {
                md: 0,
              },
              backgroundColor: {
                lg: theme.palette.background.default,
              },
              opacity: {
                md: 0.9,
              },
              height: {
                md: theme.typography.pxToRem(524),
                lg: theme.typography.pxToRem(600),
              },
              padding: {
                md: `${theme.typography.pxToRem(66)} ${theme.typography.pxToRem(
                  77,
                )} ${theme.typography.pxToRem(69)} 0`,
                lg: `${theme.typography.pxToRem(81)} ${theme.typography.pxToRem(98)}`,
              },
            })}
          >
            <Box
              sx={(theme) => ({
                position: "relative",
                "& .video-js": {
                  width: "100%",
                  height: "100%",
                },
                "& .vjs-poster": {
                  backgroundColor: "#ffffffE6",
                  backgroundSize: {
                    xs: "120%",
                    md: "auto",
                  },
                },
                "& .video-js .vjs-big-play-button": {
                  display: "none",
                },
                height: {
                  xs: theme.typography.pxToRem(227),
                  md: theme.typography.pxToRem(194),
                  lg: theme.typography.pxToRem(244),
                },
                width: {
                  xs: "100%",
                  md: theme.typography.pxToRem(299),
                  lg: theme.typography.pxToRem(376),
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
                width: {
                  md: theme.typography.pxToRem(278),
                },
              })}
            />
            <Link
              href={link.href}
              sx={{
                textDecoration: "none",
              }}
            >
              <Typography variant="button">{link.label}</Typography>
            </Link>
          </Grid>
          <Grid item lg={1} />
          <Grid
            container
            item
            xs={12}
            md={5}
            alignItems="center"
            justifyContent={{
              xs: "center",
              md: "flex-end",
            }}
            sx={(theme) => ({
              marginBottom: {
                xs: theme.typography.pxToRem(23),
                md: 0,
              },
            })}
          >
            <Box
              sx={(theme) => ({
                position: "relative",
                height: {
                  xs: theme.typography.pxToRem(265),
                  md: theme.typography.pxToRem(211),
                  lg: theme.typography.pxToRem(441.6),
                },
                width: {
                  xs: theme.typography.pxToRem(253.6),
                  md: theme.typography.pxToRem(202),
                  lg: theme.typography.pxToRem(422.5),
                },
                backgroundImage: `url(${foregroundImage.src})`,
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                marginBottom: theme.typography.pxToRem(23),
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
  description: PropTypes.arrayOf(PropTypes.shape({})),
  href: PropTypes.string,
  title: PropTypes.string,
};

export default HowItWorks;
