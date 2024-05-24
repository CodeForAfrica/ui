import React from "react";

import Metrics from ".";

import { metrics } from "@/hurumap/config";

export default {
  title: "Sections/Metrics",
  argTypes: {},
};

function Template({ ...args }) {
  return <Metrics {...args} />;
}

export const Default = Template.bind({});

Default.args = {
  title: metrics.title,
  items: metrics.items,
};
