import { Source } from "@hurumap/core";
import React from "react";

export default {
  title: "@hurumap/core/Source",
  argTypes: {
    children: {
      control: {
        type: "text",
      },
    },
    href: {
      control: {
        type: "text",
      },
    },
  },
};

function Template({ ...args }) {
  return <Source {...args} />;
}

export const Default = Template.bind({});

Default.args = {
  children: "Source Name",
  href: "Source Url",
};
