import React from "react";

import NavList from ".";

export default {
  title: "Component/NavList",
  argTypes: {
    menu: {
      control: {
        type: "array",
      },
    },
  },
};

function Template({ ...args }) {
  return <NavList {...args} />;
}

export const Default = Template.bind({});

Default.args = {
  menu: [
    {
      label: "Our Work",
      href: "/our-work",
    },
    {
      label: "About",
      href: "/about",
    },
    {
      label: "Stories",
      href: "/about",
    },
    {
      label: "Opportunity",
      href: "/opportunity",
    },
    {
      label: "Contact",
      href: "/contact",
    },
  ],
};
