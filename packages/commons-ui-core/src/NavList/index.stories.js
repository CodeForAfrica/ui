import * as React from "react";

import NavList from ".";

import Section from "@/commons-ui/core/Section/index";

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
  return (
    <Section {...args}>
      <NavList {...args} />
    </Section>
  );
}

export const Default = Template.bind({});

Default.args = {
  fixed: true,
  typographyVariant: "body1",
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
