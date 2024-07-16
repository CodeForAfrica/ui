import { LocationHighlight } from "@hurumap/core";
import React from "react";

const highlights = [
  {
    title: "Population",
    value: "1,000,000",
  },
  {
    title: "GDP",
    value: "1,000,000",
  },
  {
    title: "Area",
    value: "1,000,000",
  },
];

export default {
  title: "@hurumap/core/LocationHighlight",
  argTypes: {
    isLoading: {
      control: {
        type: "boolean",
      },
    },
  },
};

function Template({ ...args }) {
  return <LocationHighlight {...args} />;
}

export const Default = Template.bind({});

Default.args = {
  isLoading: false,
  ...highlights[0],
};
