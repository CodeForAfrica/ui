import React from "react";

import DataIndicators from ".";

import { dataIndicator } from "@/pesayetu/config";

export default {
  title: "PesaYetu/Sections/DataIndicators",
};

function Template({ ...args }) {
  return <DataIndicators {...args} />;
}

export const Default = Template.bind({});

Default.args = dataIndicator;
