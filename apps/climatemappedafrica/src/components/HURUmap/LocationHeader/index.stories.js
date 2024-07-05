import React from "react";

import Print from "@/climatemappedafrica/assets/icons/print.svg";
import LocationHeader from "@/climatemappedafrica/components/HURUmap/LocationHeader";

export default {
  title: "Components/HURUmap/LocationHeader",
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
