import { Typography, Grid } from "@mui/material";
import PropTypes from "prop-types";
import React, { useCallback, useEffect, useState } from "react";
import { MapContainer, Pane, TileLayer, ZoomControl } from "react-leaflet";

import Layers from "./Layers";
import { generateChoropleth } from "./utils";

import "leaflet/dist/leaflet.css";

// TODO(kilemensi): We can't use styled and MapContainer because MapContainer
//                  is a dynamic component i.e. needs window to exist
const LazyMap = React.forwardRef(function LazyMap(props, ref) {
  const {
    center,
    choroplethColors,
    geography,
    geometries,
    isPinOrCompare,
    locations,
    mapType,
    preferredChildren,
    styles = {
      height: "100%",
      width: "100%",
    },
    sx,
    tileLayers,
    zoom,
    // Assume remaining props are for Layers component
    ...LayersProps
  } = props;
  const [selectedBoundary, setSelectedBoundary] = useState(null);

  const getSelectedBoundary = useCallback(
    (level, geoms) => {
      if (isPinOrCompare) {
        // if we are pinning/comparing do not drill down
        return geoms.boundary;
      }
      const preferredChildrenPerLevel = preferredChildren[level];
      const preferredLevel =
        preferredChildrenPerLevel?.find((l) => geoms.children[l]) ?? null;

      if (preferredLevel) {
        return geoms.children[preferredLevel];
      }
      return null;
    },
    [preferredChildren, isPinOrCompare],
  );

  const { choropleth, legend } = generateChoropleth(
    choroplethColors,
    locations,
    mapType,
  );

  useEffect(() => {
    let selectedBound =
      getSelectedBoundary(geography.level, geometries) ?? geometries.boundary;

    if (selectedBound?.type === "Feature") {
      selectedBound = {
        ...selectedBound,
        properties: {
          ...selectedBound.properties,
          selected: true,
        },
      };
    } else {
      // else its a FeatureCollection
      const selectedBoundaryFeatures = selectedBound?.features?.map((f) => {
        return {
          ...f,
          properties: {
            ...f.properties,
            selected: true,
          },
        };
      });

      selectedBound = {
        ...selectedBound,
        features: selectedBoundaryFeatures,
      };
    }
    setSelectedBoundary(selectedBound);
  }, [geometries, geography, getSelectedBoundary]);

  const locationCodes = locations?.map(({ code }) => code);

  return (
    <MapContainer
      center={center}
      zoom={zoom}
      zoomControl={false}
      zoomPosition="bottomright"
      scrollWheelZoom={false}
      touchZoom={false}
      zoomSnap={0.25}
      style={styles}
      sx={sx}
      ref={ref}
    >
      {" "}
      {tileLayers?.map(({ pane, url, zIndex }) => (
        <Pane
          key={url}
          index={pane}
          name={pane}
          style={{ zIndex, pointerEvents: "none" }}
        >
          <TileLayer url={url} />
        </Pane>
      ))}
      <Grid
        container
        spacing={2}
        sx={(theme) => ({
          position: "absolute",
          zIndex: 1000,
          width: "fit-content",
          bottom: theme.spacing(1),
          left: "50%",
          transform: "translateX(-50%)",
          backgroundColor: theme.palette.background.paper,
          padding: theme.spacing(1),
          boxShadow: theme.shadows[3],
          ...sx,
        })}
      >
        {legend?.map(({ min, max, color }) => (
          <Grid
            key={`${min}-${max}`}
            sx={(theme) => ({
              backgroundColor: color,
              padding: theme.spacing(1),
            })}
          >
            <Typography
              variant="subtitle1"
              sx={(theme) => ({ color: theme.palette.text.secondary })}
            >
              {min} - {max}
            </Typography>
          </Grid>
        ))}
      </Grid>
      <ZoomControl position="bottomright" />
      <Layers
        {...LayersProps}
        geography={geography}
        choropleth={choropleth}
        locationCodes={locationCodes}
        parentsGeometries={geometries.parents}
        selectedBoundary={selectedBoundary}
        isPinOrCompare={isPinOrCompare}
      />
    </MapContainer>
  );
});

LazyMap.propTypes = {
  LayersProps: PropTypes.shape({}),
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
  geography: PropTypes.shape({
    level: PropTypes.string,
  }),
  geometries: PropTypes.shape({
    parents: PropTypes.arrayOf(PropTypes.shape({})),
    children: PropTypes.shape({}),
    boundary: PropTypes.shape({}),
  }),
  locations: PropTypes.arrayOf(PropTypes.shape({ code: PropTypes.string })),
  preferredChildren: PropTypes.shape({}),
  setGeoCode: PropTypes.func,
  setShouldFetch: PropTypes.func,
  styles: PropTypes.shape({}),
  tileLayers: PropTypes.arrayOf(PropTypes.shape({})),
  zoom: PropTypes.number,
  isPinOrCompare: PropTypes.bool,
};

export default LazyMap;
