import { ChartTooltip } from "@hurumap/core";
import React, { useRef } from "react";

export default {
  title: "@hurumap/core/ChartTooltip",
  argTypes: {
    title: {
      control: {
        type: "text",
      },
    },
    value: {
      control: {
        type: "object",
      },
    },
    formattedValue: {
      control: {
        type: "text",
      },
    },
    group: {
      control: {
        type: "text",
      },
    },
    itemColor: {
      control: {
        type: "color",
      },
    },
    position: {
      control: {
        type: "object",
      },
    },
  },
};

function Template({ ...args }) {
  const tooltipRef = useRef(null);
  return <ChartTooltip {...args} tooltipRef={tooltipRef} />;
}

export const Default = Template.bind({});

Default.args = {
  title: "Residental Areas",
  value: { count: "176", category: "Default" },
  group: "category",
  itemColor: "red",
  position: { x: 100, y: 100 },
};
