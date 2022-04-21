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
  buttonVariant: "text",
  typographyVariant: "h1",
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
      height: "22px",
      width: "17.94px",
    },
  ],
};
