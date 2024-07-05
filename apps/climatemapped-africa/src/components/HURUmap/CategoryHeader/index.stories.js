import React from "react";

import Group4658 from "@/climatemapped-africa/assets/icons/Group 4658-white.svg";
import CategoryHeader from "@/climatemapped-africa/components/HURUmap/CategoryHeader";

export default {
  title: "Components/HURUmap/CategoryHeader",
  argTypes: {},
};

function Template({ ...args }) {
  return <CategoryHeader {...args} />;
}

export const Default = Template.bind({});

Default.args = {
  icon: Group4658, // using data indicator icon, has margins
  title: "Overview",
  description:
    "Population, Political, Land Use Type, Agriculture, Industries & Trade, Health Access, Education And Literacy",
};
