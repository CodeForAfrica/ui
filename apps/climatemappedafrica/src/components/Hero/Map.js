import { RichTypography } from "@commons-ui/next";
import { Box, useTheme } from "@mui/material";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { MapContainer, GeoJSON } from "react-leaflet";

import Legend from "./Legend";
import "leaflet/dist/leaflet.css";

function Map({
  center,
  zoom,
  boundary,
  styles = {
    height: "100%",
    width: "100%",
    display: "flex",
    justifyContent: "flex-start",
  },
  geoJSONStyles = {
    color: "#2A2A2C",
    weight: 1,
    dashArray: "2",
  },
  featuredLocations,
  explorePageSlug,
  choropleth,
  legend,
  averageTemperature,
}) {
  const router = useRouter();

  const regionCodes = featuredLocations?.map(({ code }) => code);
  const [hoverGeo, setHoverGeo] = useState(null);
  const theme = useTheme();
  const onEachFeature = (feature, layer) => {
    const choroplethColor = choropleth?.find?.(
      (c) => c.code.toLowerCase() === feature.properties.code.toLowerCase(),
    );
    layer.setStyle({
      fillColor: theme.palette.background.default,
      ...choroplethColor,
      fillOpacity: 1,
    });

    if (regionCodes.includes(feature.properties.code?.toLowerCase())) {
      layer.setStyle(geoJSONStyles);
      layer.on("mouseover", () => {
        setHoverGeo(feature.properties.name.toLowerCase());
        if (explorePageSlug) {
          layer.setStyle({
            fillColor: choroplethColor?.fillColor,
            fillOpacity: 0.4,
          });
        }
      });
      layer.on("mouseout", () => {
        setHoverGeo(null);
        layer.setStyle({ ...choroplethColor, fillOpacity: 1, weight: 1 });
      });
      layer.on("click", () => {
        if (explorePageSlug) {
          router.push(
            `/${explorePageSlug}/${feature.properties.code.toLowerCase()}`,
          );
        }
      });
    }
  };

  return (
    <Box
      display="flex"
      flexWrap="wrap"
      justifyContent={{ xs: "center", md: "flex-end" }}
    >
      <Box
        display="flex"
        justifyContent={{ xs: "center", md: "flex-start" }}
        sx={{
          position: "relative",
          height: "500px",
          width: "100%",
          marginTop: { sm: "55px", lg: "42px" },
          "& .leaflet-container": {
            background: "transparent",
          },
        }}
      >
        <MapContainer
          center={center}
          zoom={zoom}
          boxZoom={false}
          dragging={false}
          doubleClickZoom={false}
          zoomControl={false}
          scrollWheelZoom={false}
          touchZoom={false}
          trackResize={false}
          zoomSnap={0.25}
          style={styles}
        >
          <GeoJSON
            data={boundary}
            style={geoJSONStyles}
            onEachFeature={onEachFeature}
          />
        </MapContainer>
        <Box
          display="flex"
          justifyContent="flex-start"
          flexDirection="column-reverse"
          alignItems="flex-start"
          gap={2}
          sx={{
            width: {
              xs: "170px",
              md: "200px",
            },
            position: "absolute",
            bottom: 0,
            left: 0,
          }}
        >
          <Legend title={averageTemperature} data={legend} />
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
      </Box>
    </Box>
  );
}

Map.propTypes = {
  center: (props, propName, componentName) => {
    const { [propName]: prop } = props;
    if (!Array.isArray(prop) || prop.length !== 2 || prop.some(Number.isNaN)) {
      return new Error(
        `Invalid prop \`${propName}\` supplied to` +
          ` \`${componentName}\`. Validation failed.`,
      );
    }
    return null;
  },
  zoom: PropTypes.number,
  styles: PropTypes.shape({}),
  boundary: PropTypes.shape({}),
  geoJSONStyles: PropTypes.shape({}),
  featuredLocations: PropTypes.arrayOf(
    PropTypes.shape({ code: PropTypes.string }),
  ),
  explorePageSlug: PropTypes.string,
  averageTemperature: PropTypes.string,
};

export default Map;
