import React from "react";

import Section from "../Section";

import RichTypography from "./RichTypography";

export default {
  title: "Component/RichTypography",
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
    // Temporary Section for testing
    <Section>
      <RichTypography {...args}>{content}</RichTypography>
    </Section>
  );
}

export const Default = Template.bind({});

Default.args = {
  content: `<b>This is where the test example goes</b>`,
};
