import { LocationTag } from "@hurumap/core";
import React from "react";

const tags = [
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
];

export default {
  title: "@hurumap/core/LocationTag",
  argTypes: {
    variant: {
      control: {
        type: "select",
      },
      options: ["default", "highlight"],
    },
  },
};

function Template({ ...args }) {
  return <LocationTag {...args} />;
}

export const Default = Template.bind({});

Default.args = {
  active: true,
  isLoading: false,
  ...tags[1],
  variant: "default",
};
