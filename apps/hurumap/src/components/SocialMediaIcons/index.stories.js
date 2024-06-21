import React from "react";

import SocialMediaIcons from ".";

import { navigationArgs } from "@/hurumap/config";

export default {
  title: "Components/SocialMediaIcons",
  argTypes: {
    socialLinks: {
      control: {
        type: "array",
      },
    },
  },
};

function Template({ ...args }) {
  return <SocialMediaIcons {...args} />;
}

export const Default = Template.bind({});

Default.args = {
  socialLinks: navigationArgs.socialLinks,
};
