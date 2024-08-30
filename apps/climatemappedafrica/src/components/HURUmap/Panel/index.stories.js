import React from "react";

import Panel from ".";

import { hurumapArgs } from "@/climatemappedafrica/config";

const { locations } = hurumapArgs;

export default {
  title: "Components/HURUmap/Panel",
  argTypes: {},
};

function Template({ ...args }) {
  return <Panel {...args} />;
}

export const Default = Template.bind({});

Default.args = {
  locations,
};
