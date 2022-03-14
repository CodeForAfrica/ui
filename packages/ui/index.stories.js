import React from "react";


import Button from ".";

export default {
  title: "Component/Button",
  argTypes: {},
};

const Template = ({ ...args }) => <Button {...args} />;

export const Default = Template.bind({});

Default.args = {};
