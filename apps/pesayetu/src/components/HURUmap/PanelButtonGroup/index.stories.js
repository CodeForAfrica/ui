import React from "react";

import PanelButtonGroup from ".";

import { panelArgs } from "@/pesayetu/config";

export default {
  title: "HURUmap/Components/PanelButtonGroup",
  argTypes: {},
};

function Template({ ...args }) {
  return <PanelButtonGroup {...args} />;
}

export const Default = Template.bind({});

Default.args = panelArgs;
