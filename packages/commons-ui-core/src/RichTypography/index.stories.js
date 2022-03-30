import React from "react";

import RichTypography from ".";

export default {
  title: "Component/RichTypography",
  argTypes: {
    children: {
      control: {
        type: "text",
      },
    },
  },
};

function Template({children}) {
  return <RichTypography><b>{childrem}</b></RichTypography>;
}

export const Default = Template.bind({});

Default.args = {
  children: "This is where the test example goes"
};
