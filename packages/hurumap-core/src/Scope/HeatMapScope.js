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
    isCompare,
    isMobile,
    theme,
    args,
  } = props;

  const { stepDivider = null } = config;

  const { primary_group: primaryGroup } = metadata;

  const transform = [];

  if (stepDivider !== null) {
    transform.push({
      type: "formula",
      as: "stepTransform",
      expr: `floor(datum.year / ${stepDivider}) * ${stepDivider}`,
    });
  }

  return merge(
    Scope({
      primaryData,
      metadata,
      config,
      secondaryData,
      primaryParentData,
      secondaryParentData,
      transform,
      chartType: "heatmap",
      theme,
      args,
    }),
    {
      signals: [
        {
          name: "height",
          value: isMobile && isCompare && secondaryData?.length > 1 ? 620 : 310,
        },
        {
          name: "isMobile",
          value: isMobile,
        },
        {
          name: "isCompare",
          value: isCompare,
        },
      ],
      width: {
        signal: "isMobile ? 300 : 600",
      },
      height: {
        signal: "height",
      },
      scales: [
        {
          name: "x",
          type: "band",
          domain: {
            data: "primary_formatted",
            field: stepDivider !== null ? "stepTransform" : primaryGroup,
          },
          range: "width",
        },
        {
          name: "y",
          type: "band",
          range: "height",
        },
        {
          name: "color",
          type: "linear",
          range: [theme.palette.primary.main, theme.palette.primary.light],
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
              x: {
                scale: "x",
                field: stepDivider !== null ? "stepTransform" : primaryGroup,
              },
              y: { scale: "y", field: { signal: "datatype[Units]" } },
              height: { scale: "y", band: 1 },
              width: { scale: "x", band: 1 },
              tooltip: {
                signal: `datum.${primaryGroup} + " : " + format(datum.count, ',')`,
              },
            },
            update: {
              fill: { scale: "color", field: { signal: "datatype[Units]" } },
            },
          },
        },
      ],
      axes: [
        {
          orient: "bottom",
          scale: "x",
          title: primaryGroup,
        },
        {
          orient: "left",
          scale: "y",
          title: { signal: "datatype[Units]" },
        },
      ],
      legends: [
        {
          fill: "color",
          title: { signal: "datatype[Units]" },
          type: "gradient",
          titleFontSize: 12,
          titlePadding: 4,
          gradientLength: { signal: "height - 16" },
        },
      ],
    },
  );
}
