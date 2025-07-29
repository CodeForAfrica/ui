"use client";

import { Section } from "@commons-ui/core";
import { LexicalRichText } from "@commons-ui/payload";
import { Typography, Box } from "@mui/material";
import Leaflet from "leaflet";
import React, { forwardRef } from "react";
import { MapContainer, Marker, Tooltip, ImageOverlay } from "react-leaflet";

import "leaflet/dist/leaflet.css";
// eslint-disable-next-line import/no-unresolved
import dottedMapUrl from "@/trustlab/assets/partner-locations.svg?url";
import { neutral } from "@/trustlab/colors";
import { getFlagFromAlpha2 } from "@/trustlab/utils";

const tinyCircleIcon = Leaflet.divIcon({
  html: `<div style="
      width: 40px;
      height: 40px;
      background: rgba(37, 43, 55, .1);
      border-radius: 50%;
      padding: 8px;
    "><div style="
      width: 24px;
      height: 24px;
      background: rgba(37, 43, 55, .2);
      border-radius: 50%;
      padding: 8px;
    "><div style="
      width: 8px;
      height: 8px;
      background: #252B37;
      border-radius: 50%;
    "></div></div></div>`,
  className: "",
  iconSize: [8, 8],
  iconAnchor: [4, 4],
});
const PartnerLocations = forwardRef((props, ref) => {
  const { locations, title, description } = props;
  if (!locations?.length) {
    return null;
  }
  const markers = locations.map((item) => {
    const {
      locationName: name,
      streetAddress: address,
      location,
      country,
    } = item;
    return {
      name,
      address,
      position: [location?.[1], location?.[0]],
      country,
    };
  });
  const bounds = [
    [-180, -180],
    [180, 180],
  ];

  return (
    <Section ref={ref} sx={{ py: 8, px: { xs: 2.5, md: 0 } }}>
      <Box
        display="flex"
        flexDirection={{ xs: "column", md: "row" }}
        justifyContent={{ xs: "center", md: "space-between" }}
        alignItems="center"
        sx={{ mb: 4 }}
      >
        <Typography variant="h1">{title}</Typography>
        <LexicalRichText
          elements={description}
          TypographyProps={{
            variant: "p3",
            sx: {
              textAlign: { xs: "center", md: "left" },
              maxWidth: 600,
            },
          }}
        />
      </Box>
      <MapContainer
        center={[0, 0]}
        zoom={1}
        style={{ height: "340px", backgroundColor: neutral[100] }}
        zoomControl={false}
        attributionControl={false}
      >
        <ImageOverlay url={dottedMapUrl} bounds={bounds} opacity={1} />
        {markers.map((m) => (
          <Marker
            position={m.position}
            key={`${m.name} - ${m.address}`}
            icon={tinyCircleIcon}
          >
            <Tooltip>
              <Box sx={{ p: 1, width: 160, textOverflow: "" }}>
                <Typography sx={{ textAlign: "center", whiteSpace: "wrap" }}>
                  {getFlagFromAlpha2(m.country) || ""}
                </Typography>
                <Typography
                  sx={{ textAlign: "center", whiteSpace: "wrap" }}
                  variant="p3"
                >
                  <strong>{m.name}</strong>
                </Typography>
                <Typography
                  sx={{
                    textAlign: "center",
                    whiteSpace: "wrap",
                    color: "grey",
                  }}
                  variant="p4"
                >
                  {m.address}
                </Typography>
              </Box>
            </Tooltip>
          </Marker>
        ))}
      </MapContainer>
    </Section>
  );
});

export default PartnerLocations;
