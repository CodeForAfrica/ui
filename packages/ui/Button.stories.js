import React from "react";

import { Button } from "./index";

export default {
  title: "Component/Button",
  argTypes: {},
};

function Template({ ...args }) {
  return <Button {...args} />;
}

export const Default = Template.bind({});

Default.args = {};
