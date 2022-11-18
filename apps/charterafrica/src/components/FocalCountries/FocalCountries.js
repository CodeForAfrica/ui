import { RichTypography, Section } from "@commons-ui/core";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Popover from "@mui/material/Popover";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import dynamic from "next/dynamic";
import PropTypes from "prop-types";
import React, { useRef, useState } from "react";

import Popup from "./Popup";

import { neutral, secondary } from "@/charterafrica/colors";

const Map = dynamic(() => import("./Map"), {
  ssr: false,
});

const MAP_PROPS = {
  xs: {
    center: [-1.62, 15.64],
    zoom: 2.6,
  },
  md: {
    center: [0.62, 15.64],
    zoom: 3.2,
  },
};

const FocalCountries = React.forwardRef(function FocalCountries(props, ref) {
  const { countries: countriesProp, description, sx, title } = props;
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));
  const mapRef = useRef();
  const [countries] = useState(() =>
    countriesProp?.reduce((acc, cur) => {
      acc[cur.code] = cur;
      return acc;
    }, {})
  );
  const [selectedCode, setSelectedCode] = useState();
  const mapSize = isMdUp ? "md" : "xs";

  const handleClose = () => {
    setSelectedCode(undefined);
  };
  const handleClickMarker = (e) => {
    setSelectedCode(e.target.options.code);
  };
  const handleEachFeature = (feature, layer) => {
    layer.setStyle({
      color: "#3E202C",
      fillColor: "#EDDDB9",
      fillOpacity: 1,
      interactive: false,
      weight: 0.1,
    });
    if (Object.keys(countries)?.includes(feature.properties.iso_a3)) {
      layer.setStyle({
        color: "#3E202C",
        fillColor: "#3E202C",
        fillOpacity: 0.2,
        interactive: true,
        weight: 0.1,
      });
      layer.on("click", () => {
        setSelectedCode(feature.properties.iso_a3);
      });
    }
  };
  const open = Boolean(selectedCode);

  if (!countriesProp?.length) {
    return null;
  }
  const markers = countriesProp.map(({ code, position }) => ({
    code,
    position,
  }));
  return (
    <div ref={ref}>
      <Box backgroundColor={secondary[100]} sx={sx}>
        <Section sx={{ px: { xs: 5, sm: 0 }, py: { xs: 2, sm: 0 } }}>
          <Grid
            container
            alignItems="center"
            justifyContent={{ xs: "center", sm: "space-between" }}
          >
            <Grid item xs={12} sm={6} order={{ xs: 0, sm: 1 }}>
              <Box
                bgcolor="common.white"
                maxWidth={524}
                p={{ xs: 2.5, md: "50px" }}
                mx="auto"
              >
                <RichTypography
                  color={neutral[800]}
                  html={false}
                  variant="h1Small"
                  typography={{ md: "h1" }}
                >
                  {title}
                </RichTypography>
                <RichTypography mt={{ xs: "30px", md: 5 }} variant="p1">
                  {description}
                </RichTypography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} order={{ xs: 1, sm: 0 }}>
              <Box
                height={{ xs: 403, sm: 418, md: 629 }}
                width={{ xs: "calc(100vw - 80px)", sm: "100%" }}
                ref={mapRef}
              >
                <Map
                  {...MAP_PROPS[mapSize]}
                  GeoJSONProps={{
                    onEachFeature: handleEachFeature,
                  }}
                  MarkerProps={{
                    eventHandlers: { click: handleClickMarker },
                  }}
                  markers={markers}
                  zoomSnap={0.25}
                />
              </Box>
            </Grid>
          </Grid>
        </Section>
      </Box>
      <Popover
        open={open}
        anchorEl={mapRef.current}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        PaperProps={{
          sx: {
            boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.1)",
          },
        }}
      >
        <Popup {...countries[selectedCode]} onClose={handleClose} />
      </Popover>
    </div>
  );
});

FocalCountries.propTypes = {
  description: PropTypes.node,
  image: PropTypes.shape({}),
  title: PropTypes.node,
};

FocalCountries.defaultProps = {
  description: undefined,
  image: undefined,
  title: undefined,
};

export default FocalCountries;
