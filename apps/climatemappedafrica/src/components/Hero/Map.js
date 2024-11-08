import { Box, useTheme } from "@mui/material";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import React from "react";
import { MapContainer, GeoJSON } from "react-leaflet";

import "leaflet/dist/leaflet.css";

function Map({
  center,
  zoom,
  boundary,
  styles = {
    height: "100%",
    width: "100%",
  },
  geoJSONStyles = {
    color: "#2A2A2C",
    weight: 1,
    dashArray: "2",
  },
  onLayerMouseOver,
  featuredLocations,
  explorePageSlug,
  choropleth,
}) {
  const router = useRouter();

  const regionCodes = featuredLocations?.map(({ code }) => code);
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
        onLayerMouseOver(feature.properties.name.toLowerCase());
        if (explorePageSlug) {
          layer.setStyle({
            fillColor: choroplethColor?.fillColor,
            fillOpacity: 0.4,
          });
        }
      });
      layer.on("mouseout", () => {
        onLayerMouseOver(null);
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
    <Box display="flex" justifyContent={{ xs: "center", md: "flex-end" }}>
      <Box
        sx={{
          position: "relative",
          height: { sm: "350px", lg: "471px" },
          width: { xs: "100%", sm: "300px", lg: "500px" },
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
  onLayerMouseOver: PropTypes.func,
  featuredLocations: PropTypes.arrayOf(
    PropTypes.shape({ code: PropTypes.string }),
  ),
  explorePageSlug: PropTypes.string,
};

export default Map;
