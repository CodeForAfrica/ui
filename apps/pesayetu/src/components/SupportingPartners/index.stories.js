import React from "react";

import SupportingPartners from ".";

export default {
  title: "PesaYetu/Sections/SupportingPartners",
  argTypes: {
    title: {
      control: {
        type: "text",
      },
      items: {
        control: {
          type: "object",
        },
      },
    },
  },
};

function Template({ ...args }) {
  return <SupportingPartners {...args} />;
}
export const Default = Template.bind({});

Default.args = {
  title: "Supporting Partners",
  items: [
    {
      logo: "https://cms.dev.codeforafrica.org/pesayetu/wp-content/uploads/sites/2/2021/08/partner-logo_4@2x.png",
    },
    {
      logo: "https://cms.dev.codeforafrica.org/pesayetu/wp-content/uploads/sites/2/2021/08/partner-logo_4@2x.png",
    },
    {
      logo: "https://cms.dev.codeforafrica.org/pesayetu/wp-content/uploads/sites/2/2021/08/partner-logo_4@2x.png",
    },
    {
      logo: "https://cms.dev.codeforafrica.org/pesayetu/wp-content/uploads/sites/2/2021/08/partner-logo_4@2x.png",
    },
    {
      logo: "https://cms.dev.codeforafrica.org/pesayetu/wp-content/uploads/sites/2/2021/08/partner-logo_4@2x.png",
    },
    {
      logo: "https://cms.dev.codeforafrica.org/pesayetu/wp-content/uploads/sites/2/2021/08/partner-logo_4@2x.png",
    },
    {
      logo: "https://cms.dev.codeforafrica.org/pesayetu/wp-content/uploads/sites/2/2021/08/partner-logo_4@2x.png",
    },
    {
      logo: "https://cms.dev.codeforafrica.org/pesayetu/wp-content/uploads/sites/2/2021/08/partner-logo_4@2x.png",
    },
    {
      logo: "https://cms.dev.codeforafrica.org/pesayetu/wp-content/uploads/sites/2/2021/08/partner-logo_4@2x.png",
    },
    {
      logo: "https://cms.dev.codeforafrica.org/pesayetu/wp-content/uploads/sites/2/2021/08/partner-logo_4@2x.png",
    },
    {
      logo: "https://cms.dev.codeforafrica.org/pesayetu/wp-content/uploads/sites/2/2021/08/partner-logo_4@2x.png",
    },
    {
      logo: "https://cms.dev.codeforafrica.org/pesayetu/wp-content/uploads/sites/2/2021/08/partner-logo_4@2x.png",
    },
    {
      logo: "https://cms.dev.codeforafrica.org/pesayetu/wp-content/uploads/sites/2/2021/08/partner-logo_4@2x.png",
    },
    {
      logo: "https://cms.dev.codeforafrica.org/pesayetu/wp-content/uploads/sites/2/2021/08/partner-logo_4@2x.png",
    },
  ],
};
