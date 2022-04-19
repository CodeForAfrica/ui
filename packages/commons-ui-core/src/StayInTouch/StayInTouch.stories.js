import React from "react";

import StayInTouch from "./index";

export default {
  title: "Component/StayInTouch",
  argTypes: {
    socialMedia: { control: "object" },
    title: {
      control: {
        type: "text",
      },
    },
  },
};

function Template({ ...args }) {
  return <StayInTouch {...args} />;
}

export const Default = Template.bind({});

Default.args = {
  title: "Stay in touch",
};
