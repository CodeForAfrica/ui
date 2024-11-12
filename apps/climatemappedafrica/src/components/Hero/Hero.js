import { RichTypography } from "@commons-ui/legacy";
import { Box, Grid, useMediaQuery } from "@mui/material";
import dynamic from "next/dynamic";
import PropTypes from "prop-types";
import React from "react";

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
  explorePageSlug,
  averageTemperature,
  ...props
}) {
  const isUpLg = useMediaQuery((theme) => theme.breakpoints.up("lg"));
  const continentLevelZoom = isUpLg ? 3.05 : 2.1; // We have to reduce the zoom level for continent so that all countries(Including islands) are visible within the designs
  const countryLevelZoom = isUpLg ? 6 : 5.25;
  const zoom = level === "continent" ? continentLevelZoom : countryLevelZoom;
  return (
    <Box
      sx={{
        position: "relative",
        pb: 5,
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
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
            item
            xs={12}
            md={6}
          >
            <RichHeader
              subtitle={subtitle}
              TitleProps={{
                sx: {
                  pb: { xs: 5 },
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
            <Box>
              <DropdownSearch
                label={searchLabel}
                locations={featuredLocations}
                placeholder={searchPlaceholder}
                sx={{ mb: 1 }}
                {...props}
              />
              <RichTypography
                variant="caption"
                sx={{
                  fontSize: { xs: "11px" },
                  color: "#707070",
                }}
              >
                {comment}
              </RichTypography>
            </Box>
          </Grid>
          {/* Since map is dynamic-ally loaded, no need for implementation="css" */}

          <Grid item md={6} xs={12} justifyContent="flex-end">
            {center ? (
              <Map
                center={[center[1], center[0]]}
                zoom={zoom}
                tileLayer={{
                  url: "https://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}.png",
                }}
                featuredLocations={featuredLocations}
                explorePageSlug={explorePageSlug}
                {...props}
              />
            ) : null}
          </Grid>
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
  title: PropTypes.arrayOf(PropTypes.shape({})),
  featuredLocations: PropTypes.arrayOf(PropTypes.shape({})),
  properties: PropTypes.shape({}),
  level: PropTypes.string,
  explorePageSlug: PropTypes.string,
  averageTemperature: PropTypes.string,
};

export default Hero;
