import React from "react";

import TreeView from "@/climatemappedafrica/components/HURUmap/TreeView";
import { treeViewArgs } from "@/climatemappedafrica/config";

export default {
  title: "Components/HURUmap/TreeView",
  argTypes: {},
};

function Template({ ...args }) {
  return <TreeView {...args} />;
}

export const Default = Template.bind({});

Default.args = treeViewArgs;
