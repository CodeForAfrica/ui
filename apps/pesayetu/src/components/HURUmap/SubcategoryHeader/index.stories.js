import React from "react";

import SubcategoryHeader from "@/pesayetu/components/HURUmap/SubcategoryHeader";

export default {
  title: "HURUmap/Components/SubcategoryHeader",
  argTypes: {},
};

function Template(args) {
  return <SubcategoryHeader {...args} />;
}

export const Default = Template.bind({});

Default.args = {
  title: "Population",
  description: "Population description",
};
