import React from "react";

import Header from ".";

export default {
  title: "PesaYetu/Components/Header",
};

function Template({ title, ...args }) {
  return <Header {...args}>{title}</Header>;
}

export const Default = Template.bind({});

Default.args = {
  overline: "Overline",
  title: 'Title with <span class="highlight">Highlight</span>',
  subtitle: "A short paragraph to describe what the header is all about.",
};
