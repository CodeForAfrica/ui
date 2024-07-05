import React from "react";

import DropdownSearch from ".";

import { searchArgs } from "@/climatemapped-africa/config";

export default {
  title: "Components/DropdownSearch",
  argTypes: {
    title: {
      control: {
        type: "string",
      },
    },
    counties: {
      control: {
        type: "object",
      },
    },
  },
};

function Template({ ...args }) {
  return <DropdownSearch {...args} />;
}

export const Default = Template.bind({});

Default.args = {
  ...searchArgs,
};
