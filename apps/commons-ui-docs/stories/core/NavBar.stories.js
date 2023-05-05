import { NavBar, RichTypography } from "@commons-ui/core";
import Box from "@mui/material/Box";
import React from "react";

export default {
  title: "@commons-ui/core/NavBar",
  argTypes: {
    color: {
      options: ["default", "inherit", "primary", "secondary", "transparent"],
      control: {
        type: "select",
      },
    },
    position: {
      options: ["absolute", "fixed", "relative", "static", "sticky"],
      control: {
        type: "select",
      },
    },
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
      <NavBar {...args}>
        <RichTypography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {label}
        </RichTypography>
      </NavBar>
    </Box>
  );
}

export const Default = Template.bind({});

Default.args = {
  color: "inherit",
  position: "sticky",
  label: "LOGO",
};
