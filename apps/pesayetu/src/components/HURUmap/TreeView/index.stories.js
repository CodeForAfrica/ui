import React from "react";

import TreeView from "@/pesayetu/components/HURUmap/TreeView";
import { treeViewArgs } from "@/pesayetu/config";

export default {
  title: "HURUmap/Components/TreeView",
  argTypes: {},
};

function Template({ ...args }) {
  return <TreeView {...args} />;
}

export const Default = Template.bind({});

Default.args = treeViewArgs;
