import React from "react";

import ShareBar from ".";

export default {
  title: "PesaYetu/Components/ShareBar",
  argTypes: {
    title: {
      control: {
        type: "text",
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
  return <ShareBar {...args} />;
}

export const Default = Template.bind({});

Default.args = {
  children: "Share",
  title: "This is the article title",
  socialLinks: [
    { name: "copyurl", alt: "Copy Url" },
    { name: "facebook", alt: "facebook" },
    { name: "twitter", alt: "twitter" },
    { name: "linkedin", alt: "linkedin" },
    { name: "email", alt: "email" },
  ],
};
