import React from "react";

import InsightsData from "@/pesayetu/components/InsightsData";
import { insightData } from "@/pesayetu/config";

export default {
  title: "PesaYetu/Sections/InsightsData",
  argTypes: {},
};

function Template({ ...args }) {
  return <InsightsData {...args} />;
}

export const Default = Template.bind({});

Default.args = insightData;
