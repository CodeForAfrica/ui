import { RichTypography, Section } from "@commons-ui/core";
import React from "react";

export default {
  title: "@commons-ui/core/RichTypography",
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
