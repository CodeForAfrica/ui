import makeStyles from "@mui/styles/makeStyles";
import clsx from "clsx";
import React, { useCallback, useEffect, useState } from "react";
import { MapContainer, ZoomControl, TileLayer, Pane } from "react-leaflet";

import Layers from "./Layers";

import "leaflet/dist/leaflet.css";

const useStyles = makeStyles((theme) => {
  const { typography } = theme;
  return {
    root: {
      "& .tooltip": {
        height: typography.pxToRem(38),
        width: typography.pxToRem(88),
        position: "relative",
      },
    },
  };
});

export default function Map({
  center,
  className,
  geography,
  geometries,
  locations,
  preferredChildren,
  styles = {
    height: "100%",
    width: "100%",
  },
  tileLayers,
  zoom,
  isPinOrCompare,
  ...props
}) {
  const classes = useStyles(props);
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
      className={clsx(classes.root, className)}
    >
      {tileLayers?.map(({ pane, url, zIndex }) => (
        <Pane
          index={pane}
          name={pane}
          style={{ zIndex, pointerEvents: "none" }}
        >
          <TileLayer url={url} />
        </Pane>
      ))}
      <ZoomControl position="bottomright" />
      <Layers
        {...props}
        geography={geography}
        locationCodes={locationCodes}
        parentsGeometries={geometries.parents}
        selectedBoundary={selectedBoundary}
        isPinOrCompare={isPinOrCompare}
      />
    </MapContainer>
  );
}
