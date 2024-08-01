const CHART_PRIMARY_COLOR_SCHEME = ["#0B2AEA", "#7986D1", "#DFDFDF", "#666666"];

const CHART_SECONDARY_COLOR_SCHEME = [
  "#FC0D1B",
  "#F8A199",
  "#DFDFDF",
  "#666666",
];

const defaultPrimaryGeoStyles = {
  inactive: {
    color: CHART_PRIMARY_COLOR_SCHEME[3],
    fillColor: "#f8f8f8",
    fillOpacity: 1,
    weight: 1,
  },
  hoverOnly: {
    out: {
      color: CHART_PRIMARY_COLOR_SCHEME[3],
      fillColor: CHART_PRIMARY_COLOR_SCHEME[2],
      fillOpacity: 1,
      weight: 1,
    },
    over: {
      color: CHART_PRIMARY_COLOR_SCHEME[3],
      fillColor: CHART_PRIMARY_COLOR_SCHEME[1],
      fillOpacity: 1,
    },
  },
  selected: {
    out: {
      color: CHART_PRIMARY_COLOR_SCHEME[3],
      fillColor: CHART_PRIMARY_COLOR_SCHEME[1],
      strokeWidth: 1,
      opacity: 1,
      fillOpacity: 1,
      weight: 1.5,
    },
    over: {
      color: CHART_PRIMARY_COLOR_SCHEME[3],
      fillColor: CHART_PRIMARY_COLOR_SCHEME[1],
      opacity: 1,
    },
  },
};

const defaultSecondaryGeoStyles = {
  ...defaultPrimaryGeoStyles,
  hoverOnly: {
    out: {
      color: CHART_PRIMARY_COLOR_SCHEME[3],
      fillColor: CHART_PRIMARY_COLOR_SCHEME[2],
      fillOpacity: 1,
      weight: 1,
    },
    over: {
      color: CHART_SECONDARY_COLOR_SCHEME[3],
      fillColor: CHART_SECONDARY_COLOR_SCHEME[1],
      fillOpacity: 1,
      opacity: 1,
    },
  },
  selected: {
    out: {
      color: CHART_PRIMARY_COLOR_SCHEME[3],
      fillColor: CHART_PRIMARY_COLOR_SCHEME[1],
      strokeWidth: 1,
      opacity: 1,
      fillOpacity: 1,
      weight: 1.5,
    },
    over: {
      color: CHART_PRIMARY_COLOR_SCHEME[3],
      fillColor: CHART_PRIMARY_COLOR_SCHEME[1],
      opacity: 1,
    },
  },
};

export { defaultPrimaryGeoStyles, defaultSecondaryGeoStyles };
