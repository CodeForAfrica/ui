/* eslint-disable import/no-anonymous-default-export */
import React from "react";

import InsightsData from "@/hurumap/components/InsightsData";
import { insightData } from "@/hurumap/config";

export default {
  title: "Sections/InsightsData",
  argTypes: {},
};

function Template({ ...args }) {
  return <InsightsData {...args} />;
}

export const Default = Template.bind({});

Default.args = insightData;
