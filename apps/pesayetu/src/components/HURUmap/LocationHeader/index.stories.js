import React from "react";

import Print from "@/pesayetu/assets/icons/print.svg";
import LocationHeader from "@/pesayetu/components/HURUmap/LocationHeader";

export default {
  title: "HURUmap/Components/LocationHeader",
  argTypes: {},
};

function Template(args) {
  return <LocationHeader {...args} />;
}

export const Default = Template.bind({});

Default.args = {
  title: "Isiolo",
  level: "County",
  parent: "Kenya",
  icon: Print,
};
