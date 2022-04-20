import * as React from "react";

import Section from "../Section/index";

import NavList from ".";

export default {
  title: "Component/NavList",
  argTypes: {
    menu: {
      control: {
        type: "array",
      },
      links: {
        control: {
          type: "array",
        },
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
  links: [
    {
      src: "/twitter.svg",
      alt: "/our-work",
    },
  ],
};
