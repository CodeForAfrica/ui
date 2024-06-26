import React from "react";

import HowItWorks from ".";

export default {
  title: "PesaYetu/Sections/HowItWorks",
  argTypes: {
    title: {
      control: {
        type: "text",
      },
    },
    description: {
      control: {
        type: "text",
      },
    },
    ctaText: {
      control: {
        type: "text",
      },
    },
    href: {
      control: {
        type: "text",
      },
    },
    videoSrc: {
      control: {
        type: "text",
      },
    },
  },
};

function Template({ ...args }) {
  return <HowItWorks {...args} />;
}

export const Default = Template.bind({});

Default.parameters = {
  nextRouter: {
    pathname: "/?path=/story/components-how-it-works--default",
  },
};

Default.args = {
  title: "How it works",
  description:
    "Learn how the PesaYetu tool works and start using the provided data visualisations for free.",
  ctaText: "Find out more",
  href: "/?path=/story/components-how-it-works--default",
  videoSrc:
    "https://www.youtube.com/watch?v=lXKDBoRSqxo&list=PL7MJ_sFHs952CYcKHPQp786HVVy83nBwH&t=2s",
};
