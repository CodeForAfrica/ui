import { ShareButton } from "@hurumap/core";
import React from "react";

export default {
  title: "@hurumap/core/ShareButton",
  argTypes: {
    name: {
      control: {
        type: "select",
      },
      options: [
        "Facebook",
        "Twitter",
        "LinkedIn",
        "WhatsApp",
        "Email",
        "Telegram",
        "Pinterest",
      ],
    },
  },
};

function Template({ ...args }) {
  return <ShareButton {...args} />;
}

export const Default = Template.bind({});

Default.args = {
  url: "https://codeforafrica.org",
  name: "Facebook",
};
