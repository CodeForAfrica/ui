/* eslint-disable import/prefer-default-export */

import { defaultChoroplethStyles } from "./geoStyles";

const roundToNearestHalf = (num) => {
  return Math.round(num * 2) / 2;
};

const calculateThresholds = (min, max, steps) => {
  const stepSize = (max - min) / steps;
  const thresholds = [];

  for (let i = 0; i < steps; i += 1) {
    thresholds.push({
      min: roundToNearestHalf(min + i * stepSize),
      max: roundToNearestHalf(min + (i + 1) * stepSize),
    });
  }

  return thresholds;
};

const generateLegend = (
  min,
  max,
  positiveThresholds,
  positiveColorRange,
  negativeThresholds,
  negativeColorRange,
  zeroColor,
) => {
  const legend = [];

  if (negativeThresholds.length) {
    negativeThresholds.forEach((threshold, index) => {
      legend.push({
        min: threshold.min,
        max: threshold.max,
        color: negativeColorRange[index],
      });
    });
  }

  if (min <= 0 && max >= 0) {
    legend.push({
      min: 0,
      max: 0,
      color: zeroColor,
    });
  }

  if (positiveThresholds.length) {
    positiveThresholds.forEach((threshold, index) => {
      legend.push({
        min: threshold.min,
        max: threshold.max,
        color: positiveColorRange[index],
      });
    });
  }

  return legend;
};

export const generateChoropleth = (choroplethProps, locations, mapType) => {
  if (mapType !== "choropleth") {
    return null;
  }

  const filteredLocations = locations.filter(({ count }) => count !== null);
  const counts = filteredLocations.map(({ count }) => count);
  const hasNegativeValues = counts.some((count) => count < 0);
  const hasPositiveValues = counts.some((count) => count > 0);
  const maxCount = Math.max(...counts);
  const minCount = Math.min(...counts);
  const roundedMinCount = Math.floor(minCount);
  const roundedMaxCount = Math.ceil(maxCount);

  const negativeColorRange =
    choroplethProps?.negative_color_range ||
    defaultChoroplethStyles.negative_color_range;
  const positiveColorRange =
    choroplethProps?.positive_color_range ||
    defaultChoroplethStyles.positive_color_range;
  const zeroColor =
    choroplethProps?.zero_color || defaultChoroplethStyles.zero_color;
  const opacity = choroplethProps?.opacity || defaultChoroplethStyles.opacity;
  const borderColor =
    choroplethProps.border_color || defaultChoroplethStyles.color;

  const positiveThresholds = hasPositiveValues
    ? calculateThresholds(
        roundedMinCount,
        roundedMaxCount,
        positiveColorRange.length,
      )
    : [];
  const negativeThresholds = hasNegativeValues
    ? calculateThresholds(
        roundedMinCount,
        roundedMaxCount,
        negativeColorRange.length,
      )
    : [];

  const legend = generateLegend(
    roundedMinCount,
    roundedMaxCount,
    positiveThresholds,
    positiveColorRange,
    negativeThresholds,
    negativeColorRange,
    zeroColor,
  );

  const getColor = (count) => {
    if (count === 0) {
      return zeroColor;
    }
    const colorRange = count > 0 ? positiveColorRange : negativeColorRange;
    const thresholds = count > 0 ? positiveThresholds : negativeThresholds;
    const index = thresholds.findIndex(
      (threshold) => count >= threshold.min && count < threshold.max,
    );
    return colorRange[index];
  };

  const choroplethData = filteredLocations.map(({ code, count }) => {
    const color = getColor(count);

    return {
      code,
      count,
      fillColor: color,
      color: borderColor,
      opacity,
    };
  });

  return { choropleth: choroplethData, legend };
};
