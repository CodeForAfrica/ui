import React from "react";

import TreeView from "@/climatemapped-africa/components/HURUmap/TreeView";
import { treeViewArgs } from "@/climatemapped-africa/config";

export default {
  title: "Components/HURUmap/TreeView",
  argTypes: {},
};

function Template({ ...args }) {
  return <TreeView {...args} />;
}

export const Default = Template.bind({});

Default.args = treeViewArgs;
