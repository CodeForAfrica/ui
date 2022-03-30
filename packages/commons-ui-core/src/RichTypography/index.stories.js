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

function Template({ content, ...args }) {
  return <RichTypography {...args}>{content}</RichTypography>;
}

export const Default = Template.bind({});

Default.args = {
  content: `<b>This is where the test example goes</b>`,
};
