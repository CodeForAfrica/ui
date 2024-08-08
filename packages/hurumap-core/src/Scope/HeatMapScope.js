import merge from "deepmerge";

import Scope from "./Scope";

export default function HeatMapScope(props) {
  console.log("HeatMapScope props: ", props);

  const {
    primaryData,
    metadata,
    config,
    secondaryData,
    primaryParentData,
    secondaryParentData,
    // profileNames,
    // isCompare,
    theme,
    args,
  } = props;
  // const { parentLabel } = config;

  const { primary_group: primaryGroup } = metadata;

  return merge(
    Scope({
      primaryData,
      metadata,
      config,
      secondaryData,
      primaryParentData,
      secondaryParentData,
      chartType: "heatmap",
      theme,
      args,
    }),
    {
      width: 800,
      height: 500,
      padding: 5,
      signals: [],
      scales: [
        {
          name: "x",
          type: "time",
          domain: {
            data: "primary_formatted",
            field: primaryGroup,
          },
          range: "width",
        },
        {
          name: "y",
          type: "band",
          domain: {
            data: "primary_formatted",
            field: { signal: "datatype[Units]" },
          },
          range: "height",
        },
        {
          name: "color",
          type: "linear",
          range: {
            scheme: theme.palette.primary.main,
          },
          domain: {
            data: "primary_formatted",
            field: { signal: "datatype[Units]" },
          },
        },
      ],
      marks: [
        {
          type: "rect",
          from: {
            data: "primary_formatted",
          },
          encode: {
            enter: {
              y: { scale: "yscale", field: { signal: "mainGroup" } },
              height: { scale: "yscale", band: 1 },
              x: { scale: "xscale", field: { signal: "datatype[Units]" } },
              width: { value: 1 },
            },
            update: {
              fill: { value: theme.palette.primary.main },
            },
          },
        },
      ],
    },
  );
}
