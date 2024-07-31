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
};

function Template({ ...args }) {
  return <LocationHighlight {...args} />;
}

export const Default = Template.bind({});

Default.args = {
  ...highlights[0],
  isLoading: false,
};
