import { RichTypography } from "@commons-ui/core";
import { Box, Grid, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import dynamic from "next/dynamic";
import PropTypes from "prop-types";
import React, { useState } from "react";

import heroBg from "@/climatemappedafrica/assets/images/bg-map-white.jpg";
import DropdownSearch from "@/climatemappedafrica/components/DropdownSearch";
import Image from "@/climatemappedafrica/components/Image";
import RichHeader from "@/climatemappedafrica/components/RichHeader";
import Section from "@/climatemappedafrica/components/Section";

const Map = dynamic(() => import("./Map"), { ssr: false });

function Hero({
  comment,
  title,
  subtitle,
  searchLabel,
  featuredLocations,
  searchPlaceholder,
  properties,
  location: { center },
  level,
  ...props
}) {
  const theme = useTheme();
  const { typography, breakpoints } = theme;
  const isUpLg = useMediaQuery(theme.breakpoints.up("lg"));

  const [hoverGeo, setHoverGeo] = useState(null);

  const continentLevelZoom = isUpLg ? 2.4 : 2.1;
  const countryLevelZoom = isUpLg ? 6 : 5.25;
  const zoom = level === "continent" ? continentLevelZoom : countryLevelZoom;

  return (
    <Box
      sx={{
        position: "relative",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          zIndex: -1,
          height: typography.pxToRem(468),
          width: "100%",
          [breakpoints.up("md")]: {
            height: typography.pxToRem(456),
          },
          [breakpoints.up("lg")]: {
            height: typography.pxToRem(600),
          },
        }}
      >
        <Image src={heroBg} layout="fill" unoptimized />
      </Box>
      <Section
        sx={{
          paddingBottom: typography.pxToRem(40),
          [breakpoints.up("md")]: {
            paddingBottom: typography.pxToRem(22),
          },
          [breakpoints.up("lg")]: {
            paddingBottom: typography.pxToRem(64),
          },
        }}
      >
        <Grid container>
          <Box
            sx={{
              display: {
                xs: "none",
                md: "block",
              },
            }}
          >
            <Grid item lg={1} />
          </Box>
          <Grid item xs={12} md={7} lg={6}>
            <RichHeader
              subtitle={subtitle}
              TitleProps={{
                sx: {
                  marginTop: typography.pxToRem(40),
                  [breakpoints.up("md")]: {
                    marginTop: typography.pxToRem(46),
                  },
                  [breakpoints.up("lg")]: {
                    marginTop: typography.pxToRem(65),
                  },
                },
              }}
              SubtitleProps={{
                sx: {
                  margin: `${typography.pxToRem(20)} 0`,
                  [breakpoints.up("md")]: {
                    maxWidth: typography.pxToRem(335),
                  },
                  [breakpoints.up("lg")]: {
                    margin: `${typography.pxToRem(40)} 0`,
                    maxWidth: typography.pxToRem(474),
                  },
                },
              }}
            >
              {title}
            </RichHeader>
            <DropdownSearch
              label={searchLabel}
              locations={featuredLocations}
              placeholder={searchPlaceholder}
              {...props}
            />
            <RichTypography
              variant="subtitle1"
              sx={{
                fontSize: typography.pxToRem(11),
                color: "#707070",
                marginTop: typography.pxToRem(20),
                [breakpoints.up("lg")]: {
                  marginTop: typography.pxToRem(40),
                },
              }}
            >
              {comment}
            </RichTypography>
          </Grid>
          {/* Since map is dynamic-ally loaded, no need for implementation="css" */}
          <Box
            sx={{
              display: {
                xs: "none",
                md: "block",
              },
            }}
          >
            <Grid item md={5}>
              {center ? (
                <Map
                  center={center.reverse?.()}
                  zoom={zoom}
                  tileLayer={{
                    url: "https://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}.png",
                  }}
                  onLayerMouseOver={setHoverGeo}
                  featuredLocations={featuredLocations}
                  {...props}
                />
              ) : null}
              <Box sx={{ height: 80 }}>
                <RichTypography
                  variant="h6"
                  className={{
                    lineHeight: 23 / 18,
                    lineSpacing: typography.pxToRem(0.9),
                    fontWeight: "normal",
                    textTransform: "capitalize",
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                >
                  {hoverGeo}
                </RichTypography>
              </Box>
            </Grid>
          </Box>
        </Grid>
      </Section>
    </Box>
  );
}

Hero.propTypes = {
  comment: PropTypes.string,
  subtitle: PropTypes.string,
  searchLabel: PropTypes.string,
  title: PropTypes.string,
  featuredLocations: PropTypes.arrayOf(PropTypes.shape({})),
  properties: PropTypes.shape({}),
  level: PropTypes.string,
};

export default Hero;
