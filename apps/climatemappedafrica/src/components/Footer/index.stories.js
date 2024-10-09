/* eslint-disable import/no-anonymous-default-export */
import React from "react";

import Footer from ".";

export default {
  title: "ClimateMappedAfrica/Sections/Footer",
  argTypes: {
    title: {
      control: {
        type: "text",
      },
    },
    socialMedia: {
      control: {
        type: "object",
      },
    },
    quickLinks: {
      control: {
        type: "array",
      },
    },
    description: {
      control: {
        type: "text",
      },
    },
    aboutVariant: {
      control: {
        type: "select",
      },
      options: ["subtitle1", "body1"],
    },
    copyrightProps: {
      control: {
        type: "object",
      },
    },
    logoProps: {
      control: {
        type: "object",
      },
    },
  },
};

function Template({ ...args }) {
  return <Footer {...args} />;
}

export const Default = Template.bind({});

Default.parameters = {
  nextjs: {
    router: {
      pathname: "/?path=/story/sections-footer--default",
    },
  },
};

Default.args = {
  connect: {
    title: "Stay in Touch",
    links: [
      {
        platform: "Facebook",
        url: "https://www.google.com",
        id: "67050ad20d400b5e511b2871",
      },
      {
        platform: "Twitter",
        url: "https://Twitter.com",
        id: "6706844a6339b76017e6c782",
      },
    ],
  },
  description: [
    {
      children: [
        {
          text: "This site is an ",
          children: null,
        },
        {
          newTab: false,
          type: "link",
          url: "https://github.com/CodeForAfrica/ui/tree/main/apps/roboshield",
          children: [
            {
              text: "open source code",
              children: null,
            },
          ],
          href: "https://github.com/CodeForAfrica/ui/tree/main/apps/roboshield",
        },
        {
          text: " built by ",
          children: null,
        },
        {
          newTab: false,
          type: "link",
          url: "https://codeforafrica.org/",
          children: [
            {
              text: "Code for Africa",
              children: null,
            },
          ],
          href: "https://codeforafrica.org/",
        },
        {
          text: ", the continent's largest network of civic technology and data journalism labs. All content is released under a ",
          children: null,
        },
        {
          newTab: false,
          type: "link",
          url: "https://creativecommons.org/licenses/by/4.0/",
          children: [
            {
              text: "Creative Commons 4 Attribution",
              children: null,
            },
          ],
          href: "https://creativecommons.org/licenses/by/4.0/",
        },
        {
          text: " License. Reuse it to help empower your own community.",
          children: null,
        },
      ],
    },
  ],
  links: {
    title: "Resources",
    links: [
      {
        label: "About",
        linkType: "custom",
        url: "/",
        href: "/",
        id: "67063751048cfcc79c43a6f9",
      },
      {
        label: "Privacy Policy",
        linkType: "custom",
        url: "/",
        href: "/",
        id: "6706375d048cfcc79c43a6fa",
      },
    ],
  },
  logo: {
    alt: "ClimateMappedAfrica",
    src: "http://localhost:3000/media/Group-4426.svg",
  },
  title: "Climate Mapped Africa",
};
