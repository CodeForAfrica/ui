import React from "react";

import KeyMetric from "@/pesayetu/components/HURUmap/KeyMetric";

export default {
  title: "HURUmap/Components/KeyMetric",
};

function Template({ ...args }) {
  return <KeyMetric {...args} />;
}

export const Default = Template.bind({});

Default.args = {
  color: "Primary",
  formattedValue: "11%",
  value: 11,
  title: "Voter registration %",
  description: "10.1% National Average",
  parentName: undefined,
  parentFormattedValue: undefined,
};
