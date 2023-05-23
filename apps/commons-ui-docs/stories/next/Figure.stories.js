import { Section } from "@commons-ui/core";
import { Figure } from "@commons-ui/next";
import React from "react";

export default {
  title: "@commons-ui/next/Figure",
  argTypes: {
    ImageProps: {
      control: {
        type: "object",
      },
    },
  },
};

function Template({ height, width, ...args }) {
  return (
    <Section>
      <Figure {...args} sx={{ height, width }} />
    </Section>
  );
}

export const Default = Template.bind({});

Default.args = {
  height: 300,
  width: 600,
  ImageProps: {
    src: "/images/cfa-logo.svg",
  },
};
