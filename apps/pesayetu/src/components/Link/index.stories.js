import React from "react";

import Link from ".";

export default {
  title: "PesaYetu/Components/Link",
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
  nextRouter: {
    pathname: "/?path=/story/components-link--default",
  },
};

Default.args = {
  color: "primary",
  href: "/?path=/story/components-link--default",
  label: "Link",
};
