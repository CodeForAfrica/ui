import React from "react";

import LocationHighlight from ".";

import { hurumapArgs } from "@/climatemappedafrica/config";

const {
  location: {
    highlights: [highlight],
  },
} = hurumapArgs;
export default {
  title: "Components/HURUmap/LocationHighlight",
};

function Template(args) {
  return <LocationHighlight {...args} />;
}

export const Default = Template.bind({});

Default.args = highlight;
