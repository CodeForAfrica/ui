import { RichTypography } from "@commons-ui/core";
import { Box, Grid, useMediaQuery } from "@mui/material";
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
  center,
  comment,
  title,
  subtitle,
  searchLabel,
  featuredLocations,
  searchPlaceholder,
  properties,
  level,
  ...props
}) {
  const isUpLg = useMediaQuery((theme) => theme.breakpoints.up("lg"));
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
          width: "100%",
          height: { xs: "468px", md: "456px", lg: "600px" },
        }}
      >
        <Image src={heroBg} layout="fill" unoptimized />
      </Box>
      <Section
        sx={{
          paddingBottom: { xs: "40px", md: "22px", lg: "22px" },
          px: 0,
        }}
      >
        <Grid container>
          <Grid
            sx={{
              display: {
                xs: "none",
                md: "block",
              },
            }}
            item
            lg={1}
          />
          <Grid sx={{ pb: { xs: 5 } }} item xs={12} md={7} lg={6}>
            <RichHeader
              subtitle={subtitle}
              TitleProps={{
                sx: {
                  marginTop: { xs: "40px", md: "46px", lg: "65px" },
                },
              }}
              SubtitleProps={{
                sx: {
                  margin: {
                    xs: `20px 0`,
                    lg: `40px 0`,
                  },
                  maxWidth: {
                    md: "335px",
                    lg: "474px",
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
                fontSize: "11px",
                color: "#707070",
                marginTop: {
                  sm: "20px",
                  xs: "40px",
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
                  sx={{
                    lineHeight: 23 / 18,
                    lineSpacing: "0.9px",
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
  center: PropTypes.arrayOf(PropTypes.number),
  comment: PropTypes.string,
  subtitle: PropTypes.arrayOf(PropTypes.shape({})),
  searchLabel: PropTypes.string,
  title: PropTypes.string,
  featuredLocations: PropTypes.arrayOf(PropTypes.shape({})),
  properties: PropTypes.shape({}),
  level: PropTypes.string,
};

export default Hero;
