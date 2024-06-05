import React from "react";

import Navigation from ".";

import { navigationArgs } from "@/pesayetu/config";

export default {
  title: "PesaYetu/Sections/Navigation",
  argTypes: {},
};

function Template({ ...args }) {
  return <Navigation {...args} />;
}
export const Default = Template.bind({});

Default.args = {
  ...navigationArgs,
};
