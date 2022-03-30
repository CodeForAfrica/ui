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

function Template({ children, ...args }) {
  return <RichTypography {...args}>{children}</RichTypography>;
}

export const Default = Template.bind({});

Default.args = {
  children: `<b>This is where the test example goes</b>`,
};
