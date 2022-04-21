import React from "react";

import A from ".";

export default {
  title: "Component/A",
  argTypes: {
    href: {
      control: {
        type: "text",
      },
    },
    ref: {
      control: {
        type: "object",
      },
    },
  },
};

function Template({ ...args }) {
  return <A {...args}>Link</A>;
}

export const Default = Template.bind({});

Default.args = {
  href: "www.link.com",
};
