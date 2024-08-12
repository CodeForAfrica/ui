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
        {
          name: "selectedStripeTemp",
          value: 0,
          on: [
            { events: "@stripe:pointerover", update: "datum.count" },
            { events: "@stripe:pointerout", update: "0" },
          ],
        },
      ],
      width: {
        signal: "isMobile ? 400 : 800",
      },
      height: {
        signal: "height",
      },
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
            field: "count",
          },
          range: [theme.palette.primary.main, theme.palette.primary.light],
          reverse: true,
        },
        {
          name: "scaleYForLegendTick",
          type: "linear",
          domain: { data: "primary", field: "count" },
          range: [0, { signal: "height" }],
          zero: false,
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
                field: "count",
              },
              // TODO: check why tooltip is not working correctly
              // tooltip: [
              //   {
              //     signal: `datum.${primaryGroup} + ' : ' + datum.count`
              //   }
              // ]
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
        {
          scale: "scaleYForLegendTick",
          orient: "right",
          domain: false,
          labels: false,
          ticks: true,
          tickColor: "black",
          offset: 45,
          encode: {
            ticks: {
              update: {
                x: { value: -7 },
                x2: { value: 13 },
                y: {
                  scale: "scaleYForLegendTick",
                  signal: "selectedStripeTemp",
                },
              },
            },
          },
        },
      ],
      legends: [
        {
          fill: "color",
          type: "gradient",
          titleFontSize: 12,
          titlePadding: 4,
          gradientLength: { signal: "height-16" },
        },
      ],
    },
  );
}
