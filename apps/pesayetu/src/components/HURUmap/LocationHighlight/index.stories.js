import React from "react";

import LocationHighlight from ".";

import { hurumapArgs } from "@/pesayetu/config";

const {
  location: {
    highlights: [highlight],
  },
} = hurumapArgs;
export default {
  title: "HURUmap/Components/LocationHighlight",
};

function Template(args) {
  return <LocationHighlight {...args} />;
}

export const Default = Template.bind({});

Default.args = highlight;
