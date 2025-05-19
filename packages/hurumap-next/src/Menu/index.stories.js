import React from "react";

import Menu from ".";

export const navigationArgs = {
  desktopLogoProps: {
    width: 200,
    height: 80,
    alt: "desktop logo",
    href: "https://codeforafrica.org",
    src: "https://cfa.dev.codeforafrica.org/media/cfa-logo.svg",
  },

  mobileLogoProps: {
    width: 180,
    height: 70,
    alt: "mobile logo",
    href: "https://codeforafrica.org",
    src: "https://cfa.dev.codeforafrica.org/media/cfa-logo.svg",
  },
};
export default {
  title: "Components/Menu",
  argTypes: {
    links: {
      control: {
        type: "array",
      },
    },
    socialLinks: {
      control: {
        type: "array",
      },
    },
  },
};

function Template({ ...args }) {
  return <Menu {...args} />;
}

export const Default = Template.bind({});

Default.args = {
  links: navigationArgs.menuProps,
  socialLinks: navigationArgs.socialLinks,
};
