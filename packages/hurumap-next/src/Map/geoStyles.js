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

const defaultChoroplethStyles = {
  negative_color_range: [
    "#FEA502",
    "#FFAA54",
    "#FD928E",
    "#DFB494",
    "#9BFAFA",
    "#64F9F9",
    "#01F8F8",
  ],
  positive_color_range: [
    "#021AFE",
    "#5455FF",
    "#928EFD",
    "#B494DF",
    "#FA9B9B",
    "#F96264",
    "#F80701",
  ],
  opacity: 0.7,
  opacity_hover: 1,
  zero_color: "white",
};

export {
  defaultPrimaryGeoStyles,
  defaultSecondaryGeoStyles,
  defaultChoroplethStyles,
};
