/* eslint-env browser */

import { Section } from "@commons-ui/core";
import { RichTypography } from "@commons-ui/next";
import React from "react";

export default {
  title: "@commons-ui/next/RichTypography",
  argTypes: {
    content: {
      control: {
        type: "text",
      },
    },
  },
};

function Template({ content, ...args }) {
  return (
    <Section>
      <RichTypography {...args}>{content}</RichTypography>
    </Section>
  );
}

export const Default = Template.bind({});

Default.args = {
  content: `
  <h6>This is rich-text component</h6>
  <p>The component supports <a href="${window.parent.location.href}">relative</a>
     and <a href="https://github.com/CodeForAfrica/ui" target="_blank" rel="noreferrer">external</a> linking.
  `,
};
