import React from "react";

import TreeView from "@/hurumap/components/HURUmap/TreeView";
import { treeViewArgs } from "@/hurumap/config";

export default {
  title: "Components/HURUmap/TreeView",
  argTypes: {},
};

function Template({ ...args }) {
  return <TreeView {...args} />;
}

export const Default = Template.bind({});

Default.args = treeViewArgs;
