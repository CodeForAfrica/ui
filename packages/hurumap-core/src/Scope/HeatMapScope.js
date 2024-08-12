import merge from "deepmerge";

import Scope from "./Scope";

export default function HeatMapScope(props) {
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
      height: isMobile && isCompare && secondaryData?.length > 1 ? 620 : 310,
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
        { name: "stripeWidth", update: "width/length(data('primary'))" },
      ],
      scales: [
        {
          name: "scaleX",
          type: "linear",
          domain: {
            data: "primary",
            field: primaryGroup,
          },
          range: [0, { signal: "width" }],
          zero: false,
        },
        {
          name: "color",
          type: "linear",
          domain: {
            data: "primary",
            field: {
              signal: "datatype[Units]",
            },
          },
          range: [theme.palette.secondary.main, theme.palette.primary.main],
          reverse: true,
        },
      ],
      marks: [
        {
          name: "stripe",
          type: "rect",
          interactive: true,
          from: {
            data: "primary",
          },
          encode: {
            enter: {
              xc: {
                scale: "scaleX",
                field: primaryGroup,
              },
              fill: {
                scale: "color",
                field: {
                  signal: "datatype[Units]",
                },
              },
            },
            update: {
              y: {
                signal: 0,
              },
              height: {
                signal: "height",
              },
              width: {
                signal: "stripeWidth",
              },
              tooltip: {
                signal: "{'group': datum[mainGroup], 'count': datum.count}",
              },
            },
            hover: {
              y: {
                value: -4,
              },
              height: {
                signal: "height + 8",
              },
            },
          },
        },
      ],
      axes: [
        {
          scale: "scaleX",
          orient: "bottom",
          domain: false,
          format: ".4",
          labelColor: "black",
        },
      ],
      legends: [
        {
          fill: "color",
          type: "gradient",
          titleFontSize: 12,
          titlePadding: 4,
          gradientLength: { signal: "height" },
        },
      ],
    },
  );
}
