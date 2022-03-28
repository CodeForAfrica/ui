import React from "react";

import Link from "./Link";

export default {
  title: "Component/Link",
  argTypes: {},
};

function Template() {
  return <Link href="/" />;
}

export const Default = Template.bind({});

Default.args = {};
