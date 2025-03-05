import { Section } from "@commons-ui/core";
import { RichTypography } from "@commons-ui/next";
import { Image, RichHeader } from "@hurumap/next";
import { Box, Grid, useMediaQuery } from "@mui/material";
import dynamic from "next/dynamic";
import PropTypes from "prop-types";
import React from "react";

import heroBg from "@/climatemappedafrica/assets/images/bg-map-white.jpg";
import DropdownSearch from "@/climatemappedafrica/components/DropdownSearch";

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
  zoom: zoomProp,
  ...props
}) {
  const isUpLg = useMediaQuery((theme) => theme.breakpoints.up("lg"));
  const { desktop, mobile } = zoomProp;
  const zoom = isUpLg ? desktop : mobile;
  return (
    <Box
      sx={{
        pb: 5,
        position: "relative",
      }}
    >
      <Box
        sx={{
          height: { xs: "468px", md: "456px", lg: "600px" },
          position: "absolute",
          width: "100%",
          zIndex: -1,
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
        <Grid container columnSpacing={1}>
          <Grid
            item
            xs={12}
            md={6}
            container
            direction="column"
            justifyContent="space-between"
          >
            <Grid item>
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
            </Grid>
            <Grid>
              <Box>
                <DropdownSearch
                  InputBaseProps={{
                    sx: ({ typography }) => ({
                      width: {
                        md: typography.pxToRem(238),
                      },
                    }),
                  }}
                  label={searchLabel}
                  locations={featuredLocations}
                  placeholder={searchPlaceholder}
                  sx={{
                    mb: 1,
                  }}
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
          </Grid>
          {/* Since map is dynamic-ally loaded, no need for implementation="css" */}
          <Grid item xs={12} md={6}>
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
