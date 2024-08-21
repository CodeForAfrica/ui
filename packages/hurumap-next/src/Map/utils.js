/* eslint-disable import/prefer-default-export */

import { defaultChoroplethStyles } from "./geoStyles";

export const generateChoropleth = (choroplethColors, locations, mapType) => {
  if (mapType !== "choropleth") return null;

  const filteredLocations = locations.filter(({ count }) => count !== null);
  const counts = filteredLocations.map(({ count }) => count);
  const maxCount = Math.max(...counts);
  const minCount = Math.min(...counts);
  const roundedMinCount = Math.floor(minCount);
  const roundedMaxCount = Math.ceil(maxCount);
  const range = roundedMaxCount - roundedMinCount;

  const negativeColorRange =
    choroplethColors?.negative_color_range ||
    defaultChoroplethStyles.negative_color_range;
  const positiveColorRange =
    choroplethColors?.positive_color_range ||
    defaultChoroplethStyles.positive_color_range;
  const zeroColor =
    choroplethColors?.zero_color || defaultChoroplethStyles.zero_color;
  const opacity = choroplethColors?.opacity || defaultChoroplethStyles.opacity;

  const calculateThresholds = (steps) => {
    const stepSize = range / (steps - 1);
    const thresholds = Array.from(
      { length: steps },
      (_, i) => roundedMinCount + i * stepSize,
    );
    return thresholds;
  };

  const positiveThresholds = calculateThresholds(positiveColorRange.length);
  const negativeThresholds = calculateThresholds(negativeColorRange.length);

  const generateLegend = () => {
    const legend = {};
    const thresholds = positiveThresholds.concat(negativeThresholds);
    const colorRange = positiveColorRange.concat(negativeColorRange);
    thresholds.forEach((threshold, i) => {
      legend[threshold] = colorRange[i];
    });
    return legend;
  };

  const legend = generateLegend(positiveThresholds, positiveColorRange);

  const getColor = (count) => {
    if (count === 0) return zeroColor;
    const colorRange = count > 0 ? positiveColorRange : negativeColorRange;
    const thresholds = count > 0 ? positiveThresholds : negativeThresholds;
    const index = thresholds.findIndex((threshold) => count <= threshold);
    return colorRange[index];
  };

  const choroplethData = filteredLocations.map(({ code, count }) => ({
    code,
    count,
    fillColor: getColor(count),
    opacity,
  }));

  return { choropleth: choroplethData, legend };
};
