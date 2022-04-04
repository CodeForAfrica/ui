import { styled } from "@mui/material/styles";
import React from "react";

import RichTypography from ".";

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

const Section = styled("div")(({ theme }) => ({
  display: "flex",
  [theme.breakpoints.up("sm")]: {
    justifyContent: "center",
    maxWidth: theme.contentWidths.values.sm,
  },
  [theme.breakpoints.up("md")]: {
    maxWidth: theme.contentWidths.values.md,
  },
}));

function Template({ content, ...args }) {
  return (
    <Section>
      <RichTypography {...args}>{content}</RichTypography>
    </Section>
  );
}

export const Default = Template.bind({});

Default.args = {
  content: `<b>This is where the test example goes</b>`,
};
