import React from "react";

import StayInTouch from "./index";
import github from "../../public/github.png";
import instagram from "../../public/instagram.png";
import facebook from "../../public/facebook.png";
import twitter from "../../public/twitter.png";
import slack from "../../public/slack.png";
import linkedin from "../../public/linkedin.png";

const socialMedia = [
  {
    url: "https://twitter.com/Code4Africa",
    image: { alt: "Twitter", url: twitter },
  },
  {
    url: "https://ke.linkedin.com/company/code-for-africa",
    image: { alt: "Slack", url: slack },
  },
  {
    url: "https://ke.linkedin.com/company/code-for-africa",
    image: { alt: "LinkedIn", url: linkedin },
  },
  {
    url: "https://www.facebook.com/CodeForAfrica/",
    image: { alt: "Facebook", url: facebook },
  },
  {
    url: "https://www.instagram.com/code4africa__/",
    image: { alt: "Instagram", url: instagram },
  },
  {
    url: "https://github.com/CodeForAfrica",
    image: { alt: "Github", url: github },
  },
];

export default {
  title: "Component/StayInTouch",
  argTypes: {
    socialMedia: { control: "object" },
    title: {
      control: {
        type: "text",
      },
    },
  },
};

function Template({ ...args }) {
  return (
    <StayInTouch
      sx={{
        backgroundColor: "black",
        "& .MuiTypography-root": {
          color: "white",
        },
      }}
      {...args}
    />
  );
}

export const Default = Template.bind({});

Default.args = {
  title: "Stay in touch",
  socialMedia,
};
