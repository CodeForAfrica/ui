import React from "react";

import ChartTooltip from "./index";

export default {
  title: "HURUmap/Components/ChartTooltip",
  argTypes: {
    title: {
      control: {
        type: "text",
      },
    },
    value: {
      control: {
        type: "text",
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
    groupColor: {
      control: {
        type: "text",
      },
    },
  },
};

function Template({ ...args }) {
  return <ChartTooltip {...args} />;
}

export const Default = Template.bind({});

Default.args = {
  title: "15-24",
  value: "1456000",
  group: "cat2",
  groupColor: "#7DB2D3",
};
