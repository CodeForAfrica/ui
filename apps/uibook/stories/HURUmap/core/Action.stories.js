import { Action } from "@hurumap/core";
import { Add as AddIcon } from "@mui/icons-material";
import React from "react";

export default {
  title: "@hurumap/core/Action",
  component: Action,
  argTypes: {
    title: {
      control: {
        type: "text",
      },
    },
    header: {
      control: {
        type: "text",
      },
    },
    icon: {
      control: {
        type: "element",
      },
    },
  },
};

function Template(args) {
  return <Action {...args} />;
}

export const Default = Template.bind({});
Default.args = {
  id: "1",
  title: "Action",
  icon: <AddIcon />,
  header: "Header",
  children: <div>Children</div>,
};
