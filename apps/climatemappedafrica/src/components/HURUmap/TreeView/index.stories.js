import React from "react";

import TreeView from "@/climatemappedafrica/components/HURUmap/TreeView";

export default {
  title: "Components/HURUmap/TreeView",
  argTypes: {},
};

function Template({ ...args }) {
  return <TreeView {...args} />;
}

export const Default = Template.bind({});

Default.args = {};
