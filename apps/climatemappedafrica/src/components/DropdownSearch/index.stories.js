import React from "react";

import DropdownSearch from ".";

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
  label: "Search for Location",
  counties: [
    {
      name: "Nairobi",
      code: 47,
    },
    {
      name: "Marsabit",
      code: 10,
    },
    {
      name: "Meru",
      code: 6,
    },
  ],
};
