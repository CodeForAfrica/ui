import React from "react";

import Panel from ".";

import { hurumapArgs, panelArgs } from "@/pesayetu/config";

const { locations } = hurumapArgs;

export default {
  title: "HURUmap/Components/Panel",
  argTypes: {},
};

function Template({ ...args }) {
  return <Panel {...args} />;
}

export const Default = Template.bind({});

Default.args = {
  locations,
  ...panelArgs,
};
