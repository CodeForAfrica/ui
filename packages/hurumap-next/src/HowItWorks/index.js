import { Section } from "@commons-ui/core";
import { Link } from "@commons-ui/next";
import { RichText } from "@commons-ui/payload";
import { Box, Grid, Typography, useTheme } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";

import Player from "./Player";

function HowItWorks({
  title,
  description,
  link,
  video,
  backgroundImage,
  image: foregroundImage,
}) {
  const theme = useTheme();

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
        sx={({ typography }) => ({
          display: {
            xs: "none",
            md: "block",
            lg: "none",
          },
          position: "absolute",
          left: 0,
          top: typography.pxToRem(42),
          width: "100%",
          background: `linear-gradient(to right, #ffffffE6 0%, #ffffffE6 56%, transparent 56%, transparent 100%)`,
          height: typography.pxToRem(524),
        })}
      />
      <Section
        sx={{
          zIndex: 1,
          position: "relative",
          paddingTop: `${theme.typography.pxToRem(62)} !important`,
          padding: {
            md: `${theme.typography.pxToRem(42)} 0 !important`,
            lg: `${theme.typography.pxToRem(64)} 0 !important`,
          },
        }}
      >
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
            sx={({ palette, typography }) => ({
              position: {
                md: "relative",
              },
              top: {
                md: 0,
              },
              backgroundColor: {
                lg: palette.background.default,
              },
              opacity: {
                md: 0.9,
              },
              height: {
                md: typography.pxToRem(524),
                lg: typography.pxToRem(600),
              },
              padding: {
                md: `${typography.pxToRem(66)} ${typography.pxToRem(
                  77,
                )} ${typography.pxToRem(69)} 0`,
                lg: `${typography.pxToRem(81)} ${typography.pxToRem(98)}`,
              },
            })}
          >
            <Box
              sx={({ typography }) => ({
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
                  img: {
                    objectFit: "cover",
                  },
                },
                "& .video-js .vjs-big-play-button": {
                  display: "none",
                },
                height: {
                  xs: typography.pxToRem(227),
                  md: typography.pxToRem(194),
                  lg: typography.pxToRem(244),
                },
                width: {
                  xs: "100%",
                  md: typography.pxToRem(299),
                  lg: typography.pxToRem(376),
                },
              })}
            >
              <Player {...video} />
            </Box>
            <Typography
              sx={({ typography }) => ({
                marginTop: typography.pxToRem(18),
              })}
              variant="h4"
            >
              {title}
            </Typography>
            <RichText
              elements={description}
              sx={({ typography, palette }) => ({
                fontFamily: typography.body1.fontFamily,
                margin: `${typography.pxToRem(16.5)} 0`,
                color: palette.grey.dark,
                width: {
                  md: typography.pxToRem(278),
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
          >
            <Box
              sx={({ typography }) => ({
                position: "relative",
                height: {
                  xs: typography.pxToRem(265),
                  md: typography.pxToRem(211),
                  lg: typography.pxToRem(441.6),
                },
                width: {
                  xs: typography.pxToRem(253.6),
                  md: typography.pxToRem(202),
                  lg: typography.pxToRem(422.5),
                },
                backgroundImage: `url(${foregroundImage.src})`,
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                marginBottom: typography.pxToRem(23),
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
