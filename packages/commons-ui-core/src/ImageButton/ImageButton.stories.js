import React from "react";

import ImageButton from "./ImageButton";

export default {
  title: "Component/ImageButton",
  argTypes: {
    height: {
      control: {
        type: "text",
      },
    },
    src: {
      control: {
        type: "text",
      },
    },
    width: {
      control: {
        type: "text",
      },
    },
  },
};

function Template(args) {
  return <ImageButton {...args} />;
}

export const Default = Template.bind({});

Default.args = {
  height: "62px",
  src: "/CfA logo.png",
  width: "136px",
};
