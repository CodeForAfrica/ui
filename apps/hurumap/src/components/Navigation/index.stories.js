import React from "react";

import Navigation from ".";

import { navigationArgs } from "@/hurumap/config";

export default {
  title: "Sections/Navigation",
  argTypes: {},
};

function Template({ ...args }) {
  return <Navigation {...args} />;
}
export const Default = Template.bind({});

Default.args = {
  ...navigationArgs,
};
