import Box from "@mui/material/Box";
import React from "react";

import Section from "./Section";

export default {
  title: "Component/Section",
  argTypes: {
    fixed: { control: "boolean" },
    label: {
      control: {
        type: "text",
      },
    },
  },
};

function Template({ label, ...args }) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Section {...args}>
        <Box
          sx={{ flexGrow: 1, backgroundColor: "primary.main", height: 100 }}
        />
      </Section>
    </Box>
  );
}

export const Default = Template.bind({});

Default.args = {
  fixed: true,
  label:
    "This width of this heading is limited by the size of `Section` container",
};
