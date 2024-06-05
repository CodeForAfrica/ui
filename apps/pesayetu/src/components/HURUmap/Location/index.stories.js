import React from "react";

import Location from ".";

import { hurumapArgs } from "@/pesayetu/config";

const { location } = hurumapArgs;

export default {
  title: "HURUmap/Components/Location",
};

function Template(args) {
  return <Location {...args} />;
}

export const Default = Template.bind({});

Default.args = location;
