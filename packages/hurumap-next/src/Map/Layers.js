import { LocationTag } from "@hurumap/core";
import { useTheme } from "@mui/material";
import { StyledEngineProvider, ThemeProvider } from "@mui/material/styles";
import L from "leaflet";
import PropTypes from "prop-types";
import { useCallback, useEffect, useRef } from "react";
import ReactDOMServer from "react-dom/server";
import { FeatureGroup, GeoJSON, useMap } from "react-leaflet";

import {
  defaultPrimaryGeoStyles,
  defaultSecondaryGeoStyles,
  defaultChoroplethStyles,
} from "./geoStyles";

function Layers({
  PinnedLocationTagProps,
  PopUpLocationTagProps,
  geography,
  choroplethColors,
  isPinOrCompare = false,
  locations,
  mapType,
  onClick,
  onClickUnpin,
  parentsGeometries,
  primaryGeoStyles: primaryGeoStylesProp,
  secondaryGeoStyles: secondaryGeoStylesProp,
  secondaryGeography,
  selectedBoundary,
}) {
  const map = useMap();
  const groupRef = useRef();
  const siblingRef = useRef();
  const theme = useTheme();
  const primaryGeoStyles = primaryGeoStylesProp || defaultPrimaryGeoStyles;
  const secondaryGeoStyles =
    secondaryGeoStylesProp || defaultSecondaryGeoStyles;

  const pinIcon = L.divIcon({
    html: ReactDOMServer.renderToStaticMarkup(
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <LocationTag
            MarkerProps={{
              ...PinnedLocationTagProps,
              sx: {
                ...PinnedLocationTagProps?.sx,
              },
            }}
            level={geography?.level}
            name={geography?.name?.toLowerCase()}
            code={geography?.code}
            color="primary"
            variant="marker"
            sx={{
              left: 0,
              position: "absolute",
              top: 0,
            }}
          />
        </ThemeProvider>
      </StyledEngineProvider>,
    ),
  });

  const generateChoropleth = useCallback(() => {
    if (mapType !== "choropleth") return null;

    const filteredLocations = locations.filter(({ count }) => count !== null);

    const counts = filteredLocations.map(({ count }) => count);

    const maxCount = Math.max(...counts);
    const minCount = Math.min(...counts);

    const negativeColorRange =
      choroplethColors?.negative_color_range ||
      defaultChoroplethStyles.negative_color_range;
    const positiveColorRange =
      choroplethColors?.positive_color_range ||
      defaultChoroplethStyles.positive_color_range;
    const zeroColor =
      choroplethColors?.zero_color || defaultChoroplethStyles.zero_color;
    const opacity =
      choroplethColors?.opacity || defaultChoroplethStyles.opacity;

    // Calculate color thresholds based on count range
    const calculateThresholds = (colorRange) => {
      const range = maxCount - minCount;
      return colorRange.map(
        (_, index) => minCount + range * ((index + 1) / colorRange.length),
      );
    };

    const negativeThresholds = calculateThresholds(negativeColorRange);
    const positiveThresholds = calculateThresholds(positiveColorRange);

    const getColor = (count) => {
      if (count === 0) return zeroColor;

      if (count < 0) {
        for (let i = 0; i < negativeThresholds.length; i += 1) {
          if (count <= negativeThresholds[i]) return negativeColorRange[i];
        }
        return negativeColorRange[negativeColorRange.length - 1];
      }

      for (let i = 0; i < positiveThresholds.length; i += 1) {
        if (count <= positiveThresholds[i]) return positiveColorRange[i];
      }
      return positiveColorRange[positiveColorRange.length - 1];
    };

    return filteredLocations.map(({ code, count }) => ({
      code,
      count,
      fillColor: getColor(count),
      opacity,
    }));
  }, [choroplethColors, locations, mapType]);

  const onEachFeature = useCallback(
    (feature, layer) => {
      const choropleth = generateChoropleth();

      const choroplethColor = choropleth?.find(
        (c) => c.code.toLowerCase() === feature.properties.code.toLowerCase(),
      );
      let geoStyles =
        isPinOrCompare && feature.properties.code === secondaryGeography?.code
          ? secondaryGeoStyles
          : primaryGeoStyles;
      // assume ISO 3166-1 codes so comparing uppercase should be good
      const locationCodes =
        locations?.map(({ code }) => code)?.map((c) => c.toUpperCase()) || [];
      if (!locationCodes?.includes(feature.properties.code.toUpperCase())) {
        layer.setStyle(geoStyles.inactive);
      } else {
        const popUpContent = (level, name) =>
          ReactDOMServer.renderToStaticMarkup(
            <StyledEngineProvider injectFirst>
              <ThemeProvider theme={theme}>
                <LocationTag
                  color={isPinOrCompare ? "secondary" : "primary"}
                  level={level}
                  name={name.toLowerCase()}
                  {...PopUpLocationTagProps}
                  sx={{
                    left: 0,
                    position: "absolute",
                    top: 0,
                    ...PopUpLocationTagProps?.sx,
                  }}
                  NameTypographyProps={{
                    style: {
                      minWidth: 60,
                      textAlign: "center",
                    },
                  }}
                  LevelTypographyProps={{
                    style: {
                      top: -12,
                      left: "50%",
                      transform: "translateX(-50%)",
                    },
                  }}
                />
              </ThemeProvider>
            </StyledEngineProvider>,
          );

        if (!(isPinOrCompare && feature.properties.code === geography?.code)) {
          layer
            .bindTooltip(
              popUpContent(feature.properties.level, feature.properties.name),
              { direction: "top", opacity: 1, className: "tooltip" },
            )
            .openTooltip();
        }

        let style;
        if (feature?.properties?.selected) {
          style = geoStyles.selected.out;
          style = {
            ...style,
            ...(choroplethColor && { ...choroplethColor }),
          };
        } else if (
          isPinOrCompare &&
          feature.properties.code === secondaryGeography?.code
        ) {
          style = geoStyles.hoverOnly.over;
        } else {
          style = geoStyles.hoverOnly.out;
        }
        layer.setStyle(style);

        layer.on("mouseover", () => {
          geoStyles = isPinOrCompare ? secondaryGeoStyles : primaryGeoStyles;
          layer.setStyle({
            ...(feature?.properties?.selected
              ? geoStyles.selected.over
              : geoStyles.hoverOnly.over),
            ...(choroplethColor && { ...choroplethColor }),
          });
        });
        layer.on("mouseout", () => {
          geoStyles = isPinOrCompare ? secondaryGeoStyles : primaryGeoStyles;
          let outStyle;
          if (feature?.properties?.selected) {
            outStyle = geoStyles.selected.out;
            outStyle = {
              ...outStyle,
              ...(choroplethColor && { ...choroplethColor }),
            };
          } else if (
            isPinOrCompare &&
            feature.properties.code === secondaryGeography?.code
          ) {
            outStyle = geoStyles.hoverOnly.over;
          } else {
            outStyle = geoStyles.hoverOnly.out;
          }
          layer.setStyle(outStyle);
        });
        if (onClick) {
          layer.on("click", (e) => {
            const { code: featureCode } = feature.properties;
            const { code: geoCode } = geography || {};
            if (featureCode !== geoCode) {
              onClick(e, feature);
            }
          });
        }
      }
    },
    [
      generateChoropleth,
      PopUpLocationTagProps,
      geography,
      isPinOrCompare,
      locations,
      onClick,
      primaryGeoStyles,
      secondaryGeoStyles,
      secondaryGeography,
      theme,
    ],
  );

  useEffect(() => {
    const layer = groupRef.current;
    const otherLayers = siblingRef.current;
    if (otherLayers) {
      otherLayers.clearLayers();
      const siblings = new L.GeoJSON(parentsGeometries, {
        onEachFeature,
      });
      otherLayers.addLayer(siblings);
      if (isPinOrCompare && otherLayers.getBounds().isValid()) {
        map.fitBounds(otherLayers.getBounds(), {
          animate: true,
          duration: 0.5, // in seconds
        });
      }
    }

    if (layer) {
      layer.clearLayers();
      const featuredGeo = new L.GeoJSON(selectedBoundary, {
        onEachFeature,
      });
      layer.addLayer(featuredGeo);
      if (!isPinOrCompare) {
        const bounds = layer.getBounds();
        if (bounds.isValid()) {
          map.fitBounds(layer.getBounds(), {
            animate: true,
            duration: 0.5, // in seconds
          });
        }
      } else {
        const mark = new L.Marker(layer.getBounds().getCenter(), {
          icon: pinIcon,
        });
        mark.on("click", () => {
          onClickUnpin(geography.code);
        });
        mark.addTo(layer);
      }
    }
  }, [
    geography.code,
    groupRef,
    isPinOrCompare,
    map,
    onClickUnpin,
    onEachFeature,
    parentsGeometries,
    pinIcon,
    selectedBoundary,
    siblingRef,
  ]);

  return (
    <>
      <FeatureGroup ref={siblingRef}>
        <GeoJSON data={parentsGeometries} onEachFeature={onEachFeature} />
      </FeatureGroup>
      <FeatureGroup ref={groupRef}>
        <GeoJSON data={selectedBoundary} onEachFeature={onEachFeature} />
      </FeatureGroup>
    </>
  );
}

Layers.propTypes = {
  PinnedLocationTagProps: PropTypes.shape({}),
  PopUpLocationTagProps: PropTypes.shape({}),
  geography: PropTypes.shape({
    code: PropTypes.string,
    level: PropTypes.string,
    name: PropTypes.string,
  }),
  isPinOrCompare: PropTypes.bool,
  locations: PropTypes.arrayOf(PropTypes.shape({})),
  onClick: PropTypes.func,
  onClickUnpin: PropTypes.func,
  parentsGeometries: PropTypes.arrayOf(PropTypes.shape({})),
  primaryGeoStyles: PropTypes.shape({}),
  secondaryGeography: PropTypes.shape({
    code: PropTypes.string,
  }),
  secondaryGeoStyles: PropTypes.shape({}),
  selectedBoundary: PropTypes.shape({}),
};

export default Layers;
