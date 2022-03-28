import React from "react";

import RichTypography from "./index";

export default {
  title: "Component/RichTypography",
  argTypes: {},
};

function Template() {
  return <RichTypography>this is an example</RichTypography>;
}

export const Default = Template.bind({});

Default.args = {};
