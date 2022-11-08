/* eslint-env browser */

import { Section } from "@commons-ui/core";
import React from "react";

import RichTypography from "./RichTypography";

export default {
  title: "Components/RichTypography",
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
  <p>The component supports <a href="${window.location.pathname}">relative</a>
     and <a href="https://github.com/CodeForAfrica/ui" target="_blank" rel="noreferrer">external</a> linking.
  `,
};
