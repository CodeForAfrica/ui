import React from "react";

import ProjectOwner from ".";

export default {
  title: "PesaYetu/Components/ProjectOwner",
};

function Template({ ...args }) {
  return <ProjectOwner {...args} />;
}
export const Default = Template.bind({});

Default.args = {
  name: "Code for Africa",
  description: "This site is a Code for Africa project.",
  link: "https://codeforafrica.org",
  logo: {
    url: "https://cms.dev.codeforafrica.org/pesayetu/wp-content/uploads/sites/2/2021/07/Group-4462.svg",
  },
  logoProps: {
    alt: "Group 4462",
    fill: true,
  },
};
