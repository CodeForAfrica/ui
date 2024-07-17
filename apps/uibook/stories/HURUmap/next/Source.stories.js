import { Source } from "@hurumap/next";
import React from "react";

export default {
  title: "@hurumap/next/Source",
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
    title: {
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
  href: "https://example.com",
  title: "Source",
};
