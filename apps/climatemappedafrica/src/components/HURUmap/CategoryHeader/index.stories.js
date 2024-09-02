import React from "react";

import EyeWhite from "@/climatemappedafrica/assets/icons/eye-white.svg";
import CategoryHeader from "@/climatemappedafrica/components/HURUmap/CategoryHeader";

export default {
  title: "Components/HURUmap/CategoryHeader",
  argTypes: {},
};

function Template({ ...args }) {
  return <CategoryHeader {...args} />;
}

export const Default = Template.bind({});

Default.args = {
  icon: EyeWhite, // using data indicator icon, has margins
  title: "Overview",
  description:
    "Population, Political, Land Use Type, Agriculture, Industries & Trade, Health Access, Education And Literacy",
};
