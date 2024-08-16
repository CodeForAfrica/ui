import { Location } from "@hurumap/core";
import React from "react";

export default {
  title: "@hurumap/core/Location",
  argTypes: {
    highlights: {
      control: {
        type: "array",
      },
    },
    tags: {
      control: {
        type: "array",
      },
    },
  },
};

function Template({ ...args }) {
  return <Location {...args} />;
}

export const Default = Template.bind({});

Default.args = {
  isLoading: false,
  highlights: [
    {
      title: "Population",
      value: "10,000,000",
    },
    {
      title: "GDP",
      value: "10,000,000",
    },
  ],
  tags: [
    {
      href: "/explore",
      level: "Country",
      name: "Kenya",
    },
    {
      href: "/explore/county-11",
      level: "County",
      name: "Isiolo",
    },
  ],
};
