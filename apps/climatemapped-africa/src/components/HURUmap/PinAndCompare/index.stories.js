import React from "react";

import PinAndCompare from ".";

import { hurumapArgs } from "@/climatemapped-africa/config";

const { pinAndCompare } = hurumapArgs;

export default {
  title: "Components/HURUmap/PinAndCompare",
};

function Template({ ...args }) {
  return <PinAndCompare {...args} />;
}

export const Default = Template.bind({});

Default.args = {
  ...pinAndCompare,
};
