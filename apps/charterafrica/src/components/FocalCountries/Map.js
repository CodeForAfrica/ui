import Leaflet from "leaflet";
import PropTypes from "prop-types";
import React from "react";
import { GeoJSON, MapContainer, Marker } from "react-leaflet";

import "leaflet/dist/leaflet.css";
import useFeatures from "./useFeatures";

import markerIconUrl from "@/charterafrica/assets/icons/Type=map-pin, Size=32, Color=Neutral900.svg?url";

const markerIcon = new Leaflet.Icon({
  iconUrl: markerIconUrl,
  iconSize: [20.52, 20.52],
  iconAnchor: [10, 10],
});

const Map = React.forwardRef(function Map(props, ref) {
  const {
    GeoJSONProps,
    MarkerProps,
    center,
    markers,
    style: styleProp,
    zoom,
    zoomSnap,
  } = props;
  const { data } = useFeatures();
  const style = {
    background: "none",
    height: "100%",
    width: "100%",
    ...styleProp,
  };

  if (!data) {
    return null;
  }
  return (
    <MapContainer
      center={center}
      boxZoom={false}
      doubleClickZoom={false}
      dragging={false}
      scrollWheelZoom={false}
      style={style}
      touchZoom={false}
      trackResize={false}
      zoom={zoom}
      zoomControl={false}
      zoomSnap={zoomSnap}
      ref={ref}
    >
      {markers?.map((marker) => (
        <Marker
          key={marker.position}
          icon={markerIcon}
          {...MarkerProps}
          {...marker}
        />
      )) || null}
      <GeoJSON data={data} {...GeoJSONProps} />
    </MapContainer>
  );
});

Map.propTypes = {
  GeoJSONProps: PropTypes.shape({}),
  MarkerProps: PropTypes.shape({}),
  center: PropTypes.arrayOf(PropTypes.number),
  featuredCountries: PropTypes.arrayOf(
    PropTypes.shape({ code: PropTypes.string })
  ),
  markers: PropTypes.arrayOf(PropTypes.shape({})),
  style: PropTypes.shape({}),
  zoom: PropTypes.number,
  zoomSnap: PropTypes.number,
};

Map.defaultProps = {
  GeoJSONProps: undefined,
  MarkerProps: undefined,
  center: undefined,
  featuredCountries: undefined,
  markers: undefined,
  style: undefined,
  zoom: undefined,
  zoomSnap: undefined,
};

export default Map;
