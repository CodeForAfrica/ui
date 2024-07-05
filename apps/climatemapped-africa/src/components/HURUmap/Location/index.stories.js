import React from "react";

import Location from ".";

import { hurumapArgs } from "@/climatemapped-africa/config";

const { location } = hurumapArgs;

export default {
  title: "Components/HURUmap/Location",
};

function Template(args) {
  return <Location {...args} />;
}

export const Default = Template.bind({});

Default.args = location;
