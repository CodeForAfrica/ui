import { ImageButton } from "@commons-ui/core";
import React from "react";

export default {
  title: "@commons-ui/core/ImageButton",
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
  src: "/images/cfa-logo.svg",
  width: "136px",
};
