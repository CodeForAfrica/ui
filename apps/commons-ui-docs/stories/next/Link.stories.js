import { Link } from "@commons-ui/next";
import React from "react";

export default {
  title: "@commons-ui/next/Link",
  argTypes: {
    color: {
      control: {
        type: "select",
      },
      options: ["primary", "secondary", "textPrimary", "textSecondary"],
    },
    href: {
      control: {
        type: "text",
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
    <Link variant="button" {...args}>
      {label}
    </Link>
  );
}

export const Default = Template.bind({});

Default.parameters = {
  nextjs: {
    router: {
      asPath: "/?path=/story/commons-ui-next-link--default",
    },
  },
};

Default.args = {
  color: "primary",
  href: "/?path=/story/commons-ui-next-link--default",
  label: "Link",
};
