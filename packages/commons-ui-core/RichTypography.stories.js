import React from "react";

import RichTypography from "./RichTypography";

export default {
  title: "Component/RichTypography",
  argTypes: {},
};

function Template() {
  return <RichTypography> This is an example</RichTypography>;
}

export const Default = Template.bind({});

Default.args = {};
