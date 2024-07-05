import React from "react";

import PanelButtonGroup from ".";

import { panelArgs } from "@/climatemappedafrica/config";

export default {
  title: "Components/HURUmap/PanelButtonGroup",
  argTypes: {},
};

function Template({ ...args }) {
  return <PanelButtonGroup {...args} />;
}

export const Default = Template.bind({});

Default.args = panelArgs;
