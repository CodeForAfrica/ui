import React from "react";

import StartLearning from ".";

export default {
  title: "PesaYetu/Sections/StartLearning",
  argTypes: {
    title: {
      control: {
        type: "string",
      },
    },
    subtitle: {
      control: {
        type: "string",
      },
    },
    ctaText: {
      control: {
        type: "string",
      },
    },
    href: {
      control: {
        type: "string",
      },
    },
  },
};

function Template(args) {
  return <StartLearning {...args} />;
}

export const Default = Template.bind({});

Default.args = {
  title: '<span class="highlight">Start learning</span>',
  subtitle:
    "Interested in digital journalism? Sign up for the free world-class courses that feature mixed media lessons, concise tip-sheets and practical exercises.",
  ctaText: "Learn More",
  href: "#",
};
