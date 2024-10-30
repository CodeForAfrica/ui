import { Box } from "@mui/material";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import React from "react";
import { MapContainer, GeoJSON } from "react-leaflet";

import "leaflet/dist/leaflet.css";
import theme from "@/climatemappedafrica/theme";

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
    opacity: 1,
    fillColor: "#fff",
    dashArray: "2",
  },
  onLayerMouseOver,
  featuredLocations,
}) {
  const router = useRouter();

  const countyCodes = featuredLocations?.map(({ code }) => code);

  const onEachFeature = (feature, layer) => {
    layer.setStyle({
      fillColor: theme.palette.background.default,
      fillOpacity: 1,
    });

    if (countyCodes.includes(feature.properties.code?.toLowerCase())) {
      layer.setStyle({
        weight: 1.5,
        dashArray: 0,
      });
      layer.on("mouseover", () => {
        onLayerMouseOver(feature.properties.name.toLowerCase());
        layer.setStyle({
          fillColor: theme.palette.primary.main,
          fillOpacity: 0.5,
        });
      });
      layer.on("mouseout", () => {
        onLayerMouseOver(null);
        layer.setStyle({
          fillOpacity: 1,
          fillColor: theme.palette.background.default,
        });
      });
      layer.on("click", () => {
        router.push(`/explore/${feature.properties.code.toLowerCase()}`);
      });
    }
  };

  return (
    <Box
      sx={{
        position: "relative",
        height: { sm: "350px", lg: "471px" },
        width: { sm: "300px", lg: "500px" },
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
};

export default Map;
